using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HotelManagementSysMongoDB.Models
{
    public class Room
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [BsonElement("roomType")]
        public string RoomType { get; set; }

        [BsonElement("maxPersons")]
        public int maxPersons {  get; set; }

        [BsonElement("price")]
        public decimal Price { get; set; }

        [BsonElement("bedType")]
        public string BedType { get; set; }

        [BsonElement("view")]
        public string View { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("availability")]
        public bool Availability { get; set; }

        [BsonElement("amenities")]
        public List<string> Amenities { get; set; }

        [BsonElement("services")]
        public List<string> Services { get; set; }

        [BsonElement("image")]
        public string ImagePath { get; set; }
    }
}
