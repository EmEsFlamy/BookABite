using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController(IReservationService reservationService) : ControllerBase
    {
        private readonly IReservationService _reservationService = reservationService;

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Reservation reservation)
        {
            var result = await _reservationService.CreateAsync(reservation);
            if (result is null)
            {
                return BadRequest("Something went wrong!");
            }
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetByIdAsync(int reservationId)
        {
            var result = await _reservationService.GetByIdAsync(reservationId);
            if (result is null)
            {
                return NotFound("Reservation not found");
            }
            return Ok(result);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAsync()
        {
            var result = await _reservationService.GetAsync();
            if (result is null || !result.Any())
            {
                return NotFound("No reservations found");
            }
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync(Reservation reservation)
        {
            var result = await _reservationService.UpdateAsync(reservation);
            if(result is null)
            {
                return BadRequest("Cannot update this resource");
            }
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int reservationId)
        {
            var result = await _reservationService.DeleteAsync(reservationId);
            if (result is false)
            {
                return NotFound("Reservation not found");
            }
            return Ok(result);
        }
    }
}
