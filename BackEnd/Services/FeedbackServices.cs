using HotelManagementSysMongoDB.Models;
using MongoDB.Driver;

namespace HotelManagementSysMongoDB.Services
{
    public class FeedbackServices
    {
        private readonly IMongoCollection<Feedback> _feedbackCollection;
        public FeedbackServices(IConfiguration config)
        {
            var client = new MongoClient(config["ConnectionStrings:MongoDb"]);
            var database = client.GetDatabase(config["ConnectionStrings:DatabaseName"]);
            _feedbackCollection = database.GetCollection<Feedback>("Feedbacks");
        }
        public async Task<Feedback> CreateFeedbackAsync(Feedback feedback)
        {
            await _feedbackCollection.InsertOneAsync(feedback);
            return feedback;
        }

        // Method to get all feedbacks
        public async Task<List<Feedback>> GetFeedbacksAsync()
        {
            return await _feedbackCollection.Find(_ => true).ToListAsync();
        }
    }
}
