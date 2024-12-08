using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HotelManagementSysMongoDB.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [BsonElement("GuestId")]
        public string GuestId { get; set; }

        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("RoomId")]
        public string RoomId { get; set; }

        [BsonElement("CheckInDate")]
        public DateTime CheckInDate { get; set; }

        [BsonElement("CheckOutDate")]
        public DateTime CheckOutDate { get; set; }

        [BsonElement("TotalPrice")]
        public decimal TotalPrice { get; set; }

        [BsonElement("SpecialRequests")]
        public string SpecialRequests { get; set; }

        [BsonElement("Status")]
        public Boolean Status { get; set; }

        [BsonElement("CreatedAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("PaymentStatus")]
        public Boolean PaymentStatus { get; set; }

        [BsonElement("PaymentId")]
        public String PaymentId { get; set; } =new Guid().ToString();
    }
}
