using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            var result = await _reservationRepository.DeleteAsync(reservationId);
            return result;
        }

        public async Task<Reservation> GetByIdAsync(int reservationId)
        {
            var result = await _reservationRepository.GetByIdAsync(reservationId);
            return result;
        }

        public Task<Reservation> UpdateAsync(Reservation reservation)
        {
            var result = _reservationRepository.UpdateAsync(reservation);
            return result;
        }
    }
}
