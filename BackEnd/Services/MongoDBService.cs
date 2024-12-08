using MongoDB.Driver;
using HotelManagementSysMongoDB.Models;
namespace HotelManagementSysMongoDB.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<User> _users;

        public MongoDBService(IConfiguration config)
        {
            var client = new MongoClient(config["ConnectionStrings:MongoDb"]);
            var database = client.GetDatabase(config["ConnectionStrings:DatabaseName"]);
            _users = database.GetCollection<User>("Users");
        }

        public async Task<User> GetUserByEmailAsync(string email) =>
            await _users.Find(user => user.Email == email).FirstOrDefaultAsync();
        public async Task<User> GetUserByIdAsync(string Id) =>
            await _users.Find(user => user.Id == Id).FirstOrDefaultAsync();
        public async Task CreateUserAsync(User user) =>
            await _users.InsertOneAsync(user);

        // Get all users
        public async Task<List<User>> GetAllUsersAsync() =>
            await _users.Find(user => true).ToListAsync();

        // Get users by role
        public async Task<List<User>> GetUsersByRoleAsync(string role) =>
            await _users.Find(user => user.Role == role).ToListAsync();
    }
}
