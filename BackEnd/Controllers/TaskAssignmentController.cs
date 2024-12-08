using HotelManagementSysMongoDB.Models;
using HotelManagementSysMongoDB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementSysMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskAssignmentController : ControllerBase
    {
        private readonly TaskAssignmentService _taskAssignmentService;
        private readonly StaffScheduleService _staffScheduleService;
        public TaskAssignmentController(TaskAssignmentService taskAssignmentService,StaffScheduleService staffScheduleService)
        {
            _taskAssignmentService = taskAssignmentService;
            _staffScheduleService = staffScheduleService;
        }

        // POST: api/TaskAssignment/Create
        [HttpPost("Create")]
        public async Task<IActionResult> CreateTaskAssignment([FromBody] TaskAssignment taskAssignment)
        {
            if (taskAssignment == null)
            {
                return BadRequest("Task assignment details are required.");
            }

            try
            {
                await _taskAssignmentService.CreateTaskAssignmentAsync(taskAssignment);
                return CreatedAtAction(nameof(CreateTaskAssignment), new { id = taskAssignment.TaskId }, taskAssignment);
            }
            catch (Exception ex)
            {
                // Log the error
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetAvailableStaff")]
        public async Task<IActionResult> GetAvailableStaff(DateTime shiftStartTime, DateTime? shiftEndTime = null)
        {
            try
            {
                // Defaulting shiftEndTime if not provided
                shiftEndTime ??= DateTime.UtcNow;

                // Fetch all staff schedules from the database
                var staffSchedules = await _staffScheduleService.GetAllStaffSchedulesAsync();

                // Filter schedules to find available staff based on the requested time range
                var availableStaffSchedules = staffSchedules
                    .Where(schedule =>
                        schedule.ShiftStartTime <= shiftStartTime &&
                       schedule.ShiftEndTime >  shiftStartTime)
                    .ToList();

                return Ok(availableStaffSchedules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

