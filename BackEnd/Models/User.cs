using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HotelManagementSysMongoDB.Models
{
    public class User
    {
        [BsonId] // Marks this property as the primary key
        [BsonRepresentation(BsonType.String)] // Ensures the Id is stored as a string in MongoDB
        public string Id { get; set; } = Guid.NewGuid().ToString(); // Generates a new unique ID

        [BsonElement("Username")] // Maps to the "Username" field in MongoDB
        public string Username { get; set; }

        [BsonElement("Email")] // Maps to the "Email" field in MongoDB
        public string Email { get; set; }

        [BsonElement("PasswordHash")] // Maps to the "PasswordHash" field in MongoDB
        public string PasswordHash { get; set; }

        [BsonElement("Role")] // Maps to the "Role" field in MongoDB
        public string Role { get; set; }

        [BsonElement("IsActive")] // Maps to the "IsActive" field in MongoDB
        public bool IsActive { get; set; } = true; // Default value for new users
    }
}
