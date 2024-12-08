using HotelManagementSysMongoDB.Models;
using MongoDB.Driver;

namespace HotelManagementSysMongoDB.Services
{
    public class ReservationService
    {
        private readonly IMongoCollection<Reservation> _reservations;
        private readonly MongoDBService _userService;

        public ReservationService(IConfiguration config, MongoDBService userService)
        {
            var client = new MongoClient(config["ConnectionStrings:MongoDb"]);
            var database = client.GetDatabase(config["ConnectionStrings:DatabaseName"]);
            _reservations = database.GetCollection<Reservation>("Reservations");
            _userService = userService;
        }
        public async Task<List<Reservation>> GetAllAsync() =>
            await _reservations.Find(reservation => true).ToListAsync();
        public async Task<List<Reservation>> GetByIdAsync(string id) =>
            await _reservations.Find(reservation => reservation.Id == id).ToListAsync();

        public async Task<List<Reservation>> GetByMailAsync(string email) =>
            await _reservations.Find(reservation => reservation.Email == email).ToListAsync();

        public void UpdateStatus(string reservationId, bool newStatus)
        {
            // Fetch the reservation document from the database
            var reservation = _reservations.Find(r => r.Id == reservationId).FirstOrDefault();

            if (reservation == null)
            {
                throw new KeyNotFoundException("Reservation not found.");
            }

            // Update the status only if it's different from the current value
            if (reservation.Status != newStatus)
            {
                var updateDefinition = Builders<Reservation>.Update.Set(r => r.Status, newStatus);

                _reservations.UpdateOne(r => r.Id == reservationId, updateDefinition);
            }
        }
        public async Task CreateAsync(Reservation reservation)
        {
            var user = await _userService.GetUserByEmailAsync(reservation.Email);

            if (user != null)
            {
                reservation.GuestId = user.Id; // Set GuestId from user service
                await _reservations.InsertOneAsync(reservation);
            }
            else
            {
                throw new Exception("User not found with the provided email.");
            }
        }
    }
}
