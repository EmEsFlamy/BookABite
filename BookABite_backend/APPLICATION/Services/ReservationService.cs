using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APPLICATION.Services
{
    public class ReservationService(IReservationRepository reservationRepository) : IReservationService
    {
        private readonly IReservationRepository _reservationRepository = reservationRepository;
        
        public async Task<Reservation> CreateAsync(Reservation reservation)
        {
            var result = await _reservationRepository.CreateAsync(reservation);
            return result;
        }

        public async Task<bool> DeleteAsync(Reservation reservation)
        {
            var result = await _reservationRepository.DeleteAsync(reservation);
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
