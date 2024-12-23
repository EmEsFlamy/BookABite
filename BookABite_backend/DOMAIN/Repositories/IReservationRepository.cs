using DOMAIN.DTOs;
using DOMAIN.Models;

namespace DOMAIN.Repositories
{
    public interface IReservationRepository
    {
        Task<Reservation> GetByIdAsync(int reservationId);
        Task<Reservation> CreateAsync(Reservation reservation);
        Task<Reservation> UpdateAsync(Reservation reservation);
        Task<bool> DeleteAsync(int reservationId);
        Task<List<Reservation>> GetAsync();
        Task<List<ReservationDto>> GetDataAsync();
    }
}
