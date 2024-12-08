using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HotelManagementSysMongoDB.Models
{
    public class Feedback
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [BsonElement("roomId")]
        public string RoomId { get; set; }

        [BsonElement("serviceRating")]
        public int ServiceRating { get; set; }

        [BsonElement("diningRating")]
        public int DiningRating { get; set; }

        [BsonElement("staffRating")]
        public int StaffRating { get; set; }

        [BsonElement("overallRating")]
        public int OverallRating { get; set; }

        [BsonElement("comments")]
        public string Comments { get; set; }

        [BsonElement("reviewDate")]
        public DateTime ReviewDate { get; set; }
    }
}
