using HotelManagementSysMongoDB.Models;
using HotelManagementSysMongoDB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementSysMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackServices _feedbackService;

        public FeedbackController(FeedbackServices feedbackService)
        {
            _feedbackService = feedbackService;
        }

        // POST: api/feedback
        [HttpPost]
        public async Task<IActionResult> PostFeedback([FromBody] Feedback feedback)
        {
            if (feedback == null)
            {
                return BadRequest("Invalid feedback data.");
            }

            var createdFeedback = await _feedbackService.CreateFeedbackAsync(feedback);
            return CreatedAtAction(nameof(PostFeedback), new { id = createdFeedback.Id }, createdFeedback);
        }

        // GET: api/feedback
        [HttpGet]
        public async Task<IActionResult> GetFeedbacks()
        {
            var feedbacks = await _feedbackService.GetFeedbacksAsync();
            return Ok(feedbacks);
        }
    }
}
