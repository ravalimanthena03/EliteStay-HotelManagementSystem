using HotelManagementSysMongoDB.Models;
using HotelManagementSysMongoDB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementSysMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationService _reservationService;

        public ReservationController(ReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _reservationService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var reservation = await _reservationService.GetByIdAsync(id);

            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }
        [HttpGet("/by/{email}")]
        public async Task<IActionResult> GetByMail(string email)
        {
            var reservation = await _reservationService.GetByMailAsync(email);

            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }
        [HttpPost("createReservation")]
        public async Task<IActionResult> Create(Reservation reservation)
        {
            if (reservation == null)
                return BadRequest("Invalid reservation data.");

            try
            {
                await _reservationService.CreateAsync(reservation);
                return CreatedAtAction(nameof(GetById), new { id = reservation.Id }, reservation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateReservationStatus(string id, [FromBody] Boolean  request)
        {
            _reservationService.UpdateStatus(id, request);
            return NoContent();
        }
    }
}
