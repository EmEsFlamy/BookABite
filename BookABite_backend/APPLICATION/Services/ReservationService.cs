using DOMAIN.DTOs;
using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using Microsoft.Extensions.Logging;


namespace APPLICATION.Services
{
    public class ReservationService(IReservationRepository reservationRepository, ILogger<ReservationService> logger) : IReservationService
    {
        private readonly IReservationRepository _reservationRepository = reservationRepository;
        private readonly ILogger<ReservationService> _logger = logger;
        
        public async Task<Reservation> CreateAsync(Reservation reservation)
        {
            _logger.LogInformation("Reservation creating");
            var result = await _reservationRepository.CreateAsync(reservation);
            if (result is null)
            {
                _logger.LogError("Reservation failed");
            }
            else
            {
                _logger.LogInformation("Reservation succed");
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int reservationId)
        {
            _logger.LogInformation("Reservation deleting");
            var result = await _reservationRepository.DeleteAsync(reservationId);
            if (!result)
            {
                _logger.LogError("Reservation deleting failed");
            }
            else
            {
                _logger.LogInformation("Reservation deleting succed");
            }

            return result;
        }

        public async Task<List<Reservation>> GetAsync()
        {
            _logger.LogInformation("Getting all reservations");
            var result = await _reservationRepository.GetAsync();
            if (result == null || !result.Any())
            {
                _logger.LogWarning("No reservations found");
            }
            else
            {
                _logger.LogInformation($"Found {result.Count} reservations");
            }
            return result;
        }


        public async Task<Reservation> GetByIdAsync(int reservationId)
        {
            _logger.LogInformation("Getting reservation");
            var result = await _reservationRepository.GetByIdAsync(reservationId);
            if (result is null)
            {
                _logger.LogError("Getting reservation failed");
            }
            else
            {
                _logger.LogInformation("Getting reservation succed");
            }
            return result;
        }

        public Task<Reservation> UpdateAsync(Reservation reservation)
        {
            _logger.LogInformation("Updating reservation");
            var result = _reservationRepository.UpdateAsync(reservation);
            if (result is null)
            {
                _logger.LogError("Updating reservation failed");
            }
            else
            {
                _logger.LogInformation("Updating reservation succed");
            }
            return result;
        }

        public async Task<List<ReservationDto>> GetDataAsync()
        {
            _logger.LogInformation("Getting all reservations");
            var result = await _reservationRepository.GetDataAsync();
            if (result == null || !result.Any())
            {
                _logger.LogWarning("No reservations found");
            }
            else
            {
                _logger.LogInformation($"Found {result.Count} reservations");
            }
            return result;
        }
    }
}
