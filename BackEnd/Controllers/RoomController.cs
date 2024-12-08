using HotelManagementSysMongoDB.Models;
using HotelManagementSysMongoDB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace HotelManagementSysMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomService _roomService;

        public RoomController(RoomService roomService)
        {
            _roomService = roomService;
        }

        // GET: api/Room
        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _roomService.GetAllRoomsAsync();
            return Ok(rooms);
        }

        // GET: api/Room/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomById(string id)
        {
            var room = await _roomService.GetRoomByIdAsync(id);
            if (room == null)
                return NotFound($"Room with ID {id} not found.");

            return Ok(room);
        }

        // POST: api/Room
        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] Room room)
        {
            if (room == null)
                return BadRequest("Invalid room data.");

            await _roomService.AddRoomAsync(room);
            return CreatedAtAction(nameof(GetRoomById), new { id = room.Id }, room);
        }

        // PUT: api/Room/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(string id, [FromBody] Room updatedRoom)
        {
            if (updatedRoom == null || id != updatedRoom.Id)
                return BadRequest("Room data is invalid.");

            var isUpdated = await _roomService.UpdateRoomAsync(id, updatedRoom);

            if (!isUpdated)
                return NotFound($"Room with ID {id} not found.");

            return Ok("Room updated successfully.");
        }

        // DELETE: api/Room/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(string id)
        {
            var isDeleted = await _roomService.DeleteRoomAsync(id);

            if (!isDeleted)
                return NotFound($"Room with ID {id} not found.");

            return Ok("Room deleted successfully.");
        }

        //get all unique rooms by type
        [HttpGet("uniqueByType")]
        public async Task<IActionResult> GetUniqueRoomsByType()
        {
            try
            {
                var uniqueRooms = await _roomService.GetUniqueRoomsByTypeAsync();
                return Ok(uniqueRooms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while fetching unique rooms.", Error = ex.Message });
            }
        }

        [HttpGet("{id}/services")]
        public async Task<IActionResult> GetServicesByRoomId(string id)
        {
            try
            {
                // Get the list of services for the room
                var services = await _roomService.GetServicesByRoomIdAsync(id);

                if (services == null || services.Count == 0)
                {
                    return NotFound(new { Message = $"No services found for Room ID {id}" });
                }

                return Ok(services);
            }
            catch (Exception ex)
            {
                // Log the exception (if logging is set up)
                return StatusCode(500, new { Message = "An error occurred while retrieving services.", Error = ex.Message });
            }
        }

    }
}


