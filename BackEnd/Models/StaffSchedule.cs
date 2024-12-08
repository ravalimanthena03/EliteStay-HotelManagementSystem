using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HotelManagementSysMongoDB.Models
{
    public class StaffSchedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string ScheduleId { get; set; } = Guid.NewGuid().ToString();

        [BsonElement("StaffId")]
        public string StaffId { get; set; } // Link to User.StaffId

        [BsonElement("ShiftType")]
        public string ShiftType { get; set; } // Morning, Evening, Night

        [BsonElement("ShiftStartTime")]
        public DateTime ShiftStartTime { get; set; }

        [BsonElement("ShiftEndTime")]
        public DateTime ShiftEndTime { get; set; }

        [BsonElement("TaskIds")]
        public List<string> TaskIds { get; set; } = new List<string>(); // List of Task IDs

        [BsonElement("Status")]
        public string Status { get; set; } // Scheduled, Completed
    }
}
