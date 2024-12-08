using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HotelManagementSysMongoDB.Models
{
    public class ServiceRequest
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string ServiceRequestId { get; set; }= Guid.NewGuid().ToString();

        [BsonElement("ServiceType")]
        public string ServiceType { get; set; }

        [BsonElement("GuestId")]
        public string GuestId { get; set; }

        [BsonElement("RequestTime")]
        public DateTime RequestTime { get; set; }

        [BsonElement("AssignedTo")]
        public string AssignedTo { get; set; } // StaffId of the assigned staff member

        [BsonElement("Status")]
        public string Status { get; set; } // Requested, Assigned, Completed

        [BsonElement("DeliveryTime")]
        public DateTime? DeliveryTime { get; set; }
    }
}
