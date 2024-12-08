using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HotelManagementSysMongoDB.Models
{
    public class TaskAssignment
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string TaskId { get; set; } = Guid.NewGuid().ToString();

        [BsonElement("ServiceRequestId")]
        public string ServiceRequestId { get; set; } // Linked to ServiceRequest.ServiceRequestId

        [BsonElement("AssignedTo")]
        public string AssignedTo { get; set; } // Linked to Staff.StaffId

        [BsonElement("AssignedTime")]
        public DateTime AssignedTime { get; set; }
    }
}
