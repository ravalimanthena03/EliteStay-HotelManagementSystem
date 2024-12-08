using HotelManagementSysMongoDB.Models;
using HotelManagementSysMongoDB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementSysMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffScheduleController : ControllerBase
    {
        private readonly StaffScheduleService _staffScheduleService;

        public StaffScheduleController(StaffScheduleService staffScheduleService)
        {
            _staffScheduleService = staffScheduleService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateStaffSchedule([FromBody] StaffSchedule schedule)
        {
            if (schedule == null) return BadRequest("Invalid staff schedule data.");

            await _staffScheduleService.CreateStaffScheduleAsync(schedule);
            return Ok("Staff schedule created successfully.");
        }

        [HttpGet]
        [Route("GetAllStaffSchedules")]
        public async Task<IActionResult> GetAllStaffSchedules()
        {
            try
            {
                var staffSchedules = await _staffScheduleService.GetAllStaffSchedulesAsync();

                if (staffSchedules == null || !staffSchedules.Any())
                {
                    return NotFound("No staff schedules found.");
                }

                return Ok(staffSchedules);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using Serilog or ILogger)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("by-staff/{staffId}")]
        public async Task<IActionResult> GetStaffScheduleByStaffId(string staffId)
        {
            var schedule = await _staffScheduleService.GetStaffScheduleByStaffIdAsync(staffId);
            if (schedule == null) return NotFound("Staff schedule not found.");

            return Ok(schedule);
        }

        [HttpGet("{scheduleId}")]
        public async Task<IActionResult> GetStaffScheduleById(string scheduleId)
        {
            var schedule = await _staffScheduleService.GetStaffScheduleByIdAsync(scheduleId);
            if (schedule == null) return NotFound("Staff schedule not found.");

            return Ok(schedule);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateStaffSchedule([FromBody] StaffSchedule schedule)
        {
            if (schedule == null || string.IsNullOrEmpty(schedule.StaffId))
                return BadRequest("Invalid staff schedule data.");

            await _staffScheduleService.UpdateStaffScheduleAsync(schedule);
            return Ok("Staff schedule updated successfully.");
        }
    }
}
