using HotelManagementSysMongoDB.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace HotelManagementSysMongoDB.Services
{
    public class RoomService
    {
        private readonly IMongoCollection<Room> _roomsCollection;

        public RoomService(IConfiguration config)
        {
            var client = new MongoClient(config["ConnectionStrings:MongoDb"]);
            var database = client.GetDatabase(config["ConnectionStrings:DatabaseName"]);
            _roomsCollection = database.GetCollection<Room>("Rooms");
        }

        // Get all rooms
        public async Task<List<Room>> GetAllRoomsAsync()
        {
            return await _roomsCollection.Find(_ => true).ToListAsync();
        }

        // Get room by ID
        public async Task<Room> GetRoomByIdAsync(string id)
        {
            return await _roomsCollection.Find(r => r.Id == id).FirstOrDefaultAsync();
        }

        // Add a new room
        public async Task AddRoomAsync(Room room)
        {
            await _roomsCollection.InsertOneAsync(room);
        }

        // Update an existing room
        public async Task<bool> UpdateRoomAsync(string id, Room updatedRoom)
        {
            var filter = Builders<Room>.Filter.Eq(r => r.Id, id);
            var result = await _roomsCollection.ReplaceOneAsync(filter, updatedRoom);

            return result.ModifiedCount > 0;
        }

        // Delete a room
        public async Task<bool> DeleteRoomAsync(string id)
        {
            var filter = Builders<Room>.Filter.Eq(r => r.Id, id);
            var result = await _roomsCollection.DeleteOneAsync(filter);

            return result.DeletedCount > 0;
        }

        // Get all unique rooms from each type
        public async Task<List<Room>> GetUniqueRoomsByTypeAsync()
        {
            var group = new BsonDocument
                 {
                     { "$group", new BsonDocument
                     {
                          { "_id", "$roomType" },
                            { "room", new BsonDocument
                            {
                             { "$first", "$$ROOT" }
                        }
                        }
                    }
                }
            };

            var projection = new BsonDocument
             {
                 { "$replaceRoot", new BsonDocument
                      {
                          { "newRoot", "$room" }
                         }
                     }
                };

            var pipeline = new[] { group, projection };

            return await _roomsCollection.Aggregate<Room>(pipeline).ToListAsync();
        }

        // Get the list of services for a specific room by its ID
        public async Task<List<string>> GetServicesByRoomIdAsync(string id)
        {
            // Find the room by its ID
            var room = await _roomsCollection.Find(r => r.Id == id).FirstOrDefaultAsync();

            // Return the list of services if the room exists, otherwise return an empty list
            return room?.Services ?? new List<string>();
        }


    }
}

