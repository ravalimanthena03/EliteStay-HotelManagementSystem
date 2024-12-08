using HotelManagementSysMongoDB.Models;
using MongoDB.Driver;

namespace HotelManagementSysMongoDB.Services
{
    public class TaskAssignmentService
    {
        private readonly IMongoCollection<TaskAssignment> _taskAssignmentsCollection;
        private readonly IMongoCollection<StaffSchedule> _staffSchedules;
        private readonly IMongoCollection<User> _users;
        public TaskAssignmentService(IConfiguration config)
        {
            var client = new MongoClient(config["ConnectionStrings:MongoDb"]);
            var database = client.GetDatabase(config["ConnectionStrings:DatabaseName"]);
            _staffSchedules = database.GetCollection<StaffSchedule>("StaffSchedules");
            _users = database.GetCollection<User>("Users");
            _taskAssignmentsCollection = database.GetCollection<TaskAssignment>("TaskAssignment");
        }

        public async Task CreateTaskAssignmentAsync(TaskAssignment assignment)
        {
            await _taskAssignmentsCollection.InsertOneAsync(assignment);
        }


        // Fetch a user by their ID
        public async Task<User> GetUserByIdAsync(string staffId)
        {
            return await _users.Find(user => user.Id == staffId).FirstOrDefaultAsync();
        }
    }
}
