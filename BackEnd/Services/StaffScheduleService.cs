using HotelManagementSysMongoDB.Models;
using MongoDB.Driver;

namespace HotelManagementSysMongoDB.Services
{
    public class StaffScheduleService
    {
        private readonly IMongoCollection<StaffSchedule> _StaffScheduleService;
        public StaffScheduleService(IConfiguration config)
        {
            var client = new MongoClient(config["ConnectionStrings:MongoDb"]);
            var database = client.GetDatabase(config["ConnectionStrings:DatabaseName"]);
            _StaffScheduleService = database.GetCollection<StaffSchedule>("StaffSchedule");
        }

        public async Task CreateStaffScheduleAsync(StaffSchedule schedule)
        {
            await _StaffScheduleService.InsertOneAsync(schedule);
        }

        public async Task<StaffSchedule> GetStaffScheduleByStaffIdAsync(string staffId)
        {
            return await _StaffScheduleService
                .Find(s => s.StaffId == staffId)
                .FirstOrDefaultAsync();
        }
        public async Task<List<StaffSchedule>> GetAllStaffSchedulesAsync()
        {
            return await _StaffScheduleService.Find(_=>true).ToListAsync();
        }


        public async Task<StaffSchedule> GetStaffScheduleByIdAsync(string scheduleId)
        {
            return await _StaffScheduleService
                .Find(s => s.ScheduleId == scheduleId)
                .FirstOrDefaultAsync();
        }

        public async Task UpdateStaffScheduleAsync(StaffSchedule schedule)
        {
            var existingSchedule = await _StaffScheduleService.Find(x => x.StaffId == schedule.StaffId).FirstOrDefaultAsync();
            if (existingSchedule != null)
            {
                schedule.ScheduleId = existingSchedule.ScheduleId; // Preserve the original _id
            }
            await _StaffScheduleService.ReplaceOneAsync(x => x.StaffId == existingSchedule.StaffId, schedule);

        }

    }
}
