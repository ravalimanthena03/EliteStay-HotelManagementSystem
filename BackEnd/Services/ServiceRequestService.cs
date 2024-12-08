using HotelManagementSysMongoDB.Models;
using MongoDB.Driver;

namespace HotelManagementSysMongoDB.Services
{
    public class ServiceRequestService
    {
        private readonly IMongoCollection<ServiceRequest> _serviceRequestsCollection;
        public ServiceRequestService(IConfiguration config)
        {
            var client = new MongoClient(config["ConnectionStrings:MongoDb"]);
            var database = client.GetDatabase(config["ConnectionStrings:DatabaseName"]);
            _serviceRequestsCollection = database.GetCollection<ServiceRequest>("ServiceRequest");
        }

        public async Task CreateServiceRequestAsync(ServiceRequest request)
        {
            await _serviceRequestsCollection.InsertOneAsync(request);
        }

        public async Task<List<ServiceRequest>> GetAllServiceRequests()
        {
            return await _serviceRequestsCollection.Find(_=>true).ToListAsync();
        }
        public async Task<ServiceRequest> GetServiceRequestByIdAsync(string id)
        {
            return await _serviceRequestsCollection
                .Find(r => r.ServiceRequestId == id)
                .FirstOrDefaultAsync();
        }

        public async Task UpdateServiceRequestAsync(ServiceRequest request)
        {
            await _serviceRequestsCollection
                .ReplaceOneAsync(r => r.ServiceRequestId == request.ServiceRequestId, request);
        }

        public async Task<List<ServiceRequest>> GetTasksByUserIdAsync(string userId)
        {
            return await _serviceRequestsCollection
                .Find(r => r.AssignedTo == userId)
                .ToListAsync();
        }
    }
}
