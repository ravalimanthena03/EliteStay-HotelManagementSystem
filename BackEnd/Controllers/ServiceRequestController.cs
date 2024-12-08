using HotelManagementSysMongoDB.Models;
using HotelManagementSysMongoDB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementSysMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceRequestController : ControllerBase
    {
        private readonly ServiceRequestService _ServiceRequestService;
        private readonly MongoDBService _mongoDBService;
        private readonly TaskAssignmentService _taskAssignmentService;
        public ServiceRequestController(ServiceRequestService ServiceRequestService,MongoDBService mongoDBService, TaskAssignmentService taskAssignmentService)
        {
            _ServiceRequestService = ServiceRequestService;
            _mongoDBService = mongoDBService;
            _taskAssignmentService = taskAssignmentService;
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateServiceRequest([FromBody] ServiceRequest request)
        {
            if (string.IsNullOrEmpty(request.GuestId) || string.IsNullOrEmpty(request.ServiceType))
            {
                return BadRequest("GuestId and ServiceType are required.");
            }

            request.Status = "Requested";
            request.RequestTime = DateTime.UtcNow;

            await _ServiceRequestService.CreateServiceRequestAsync(request);
            return Content("Service request created successfully.", "text/plain");
        }

        [HttpGet]
        [Route("GetAllServiceRequests")]
        public async Task<IActionResult> GetAllStaffSchedules()
        {
            try
            {
                var serviceRequests = await _ServiceRequestService.GetAllServiceRequests();

                if (serviceRequests == null || !serviceRequests.Any())
                {
                    return NotFound("No staff schedules found.");
                }

                return Ok(serviceRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("assign")]
        public async Task<IActionResult> AssignServiceRequest([FromBody] TaskAssignment assignment)
        {
            var serviceRequest = await _ServiceRequestService.GetServiceRequestByIdAsync(assignment.ServiceRequestId);
            if (serviceRequest == null)
            {
                return BadRequest("Service request not found.");
            }
            if (serviceRequest.Status != "Requested")
            {
                return BadRequest("Service request is either already assigned or not in a 'Requested' state.");
            }

            // Check if the task is already assigned
            if (serviceRequest.Status == "Assigned")
            {
                return BadRequest("This service request is already assigned to a staff member.");
            }

            var staff = await _mongoDBService.GetUserByIdAsync(assignment.AssignedTo);
            if (staff == null || staff.Role != "Housekeeping")
            {
                return BadRequest("Invalid staff member.");
            }

            assignment.AssignedTime = DateTime.UtcNow;
            serviceRequest.AssignedTo = staff.Id;
            serviceRequest.Status = "Assigned";
            // Add the assignment to the TaskAssignment collection
            await _taskAssignmentService.CreateTaskAssignmentAsync(assignment);
            await _ServiceRequestService.UpdateServiceRequestAsync(serviceRequest);
            return Ok("Service request assigned successfully.");
        }

        [HttpPut("complete/{id}")]
        public async Task<IActionResult> CompleteServiceRequest(string id)
        {
            var serviceRequest = await _ServiceRequestService.GetServiceRequestByIdAsync(id);
            if (serviceRequest == null || serviceRequest.Status != "Assigned")
            {
                return BadRequest("Invalid service request or not assigned.");
            }

            serviceRequest.Status = "Completed";
            serviceRequest.DeliveryTime = DateTime.UtcNow;

            await _ServiceRequestService.UpdateServiceRequestAsync(serviceRequest);
            return Ok("Service request marked as completed.");
        }

        [HttpGet("getTasksForLoggedInUser")]
        public async Task<IActionResult> GetTasksForLoggedInUser([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { message = "Email is required." });
            }

            try
            {
                // Get the user by email
                var user = await _mongoDBService.GetUserByEmailAsync(email);
                if (user == null)
                {
                    return NotFound(new { message = "User not found." });
                }

                // Get the tasks assigned to the user
                var tasks = await _ServiceRequestService.GetTasksByUserIdAsync(user.Id);
                if (tasks == null)
                {
                    return NotFound(new { message = "No tasks assigned to this user." });
                }

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching tasks.", details = ex.Message });
            }
        }

    }
}
