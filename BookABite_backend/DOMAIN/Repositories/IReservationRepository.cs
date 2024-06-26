using DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Repositories
{
    public interface IReservationRepository
    {
        Task<Reservation> GetByIdAsync(int reservationId);
        Task<Reservation> CreateAsync(Reservation reservation);
        Task UpdateAsync();
        Task DeleteAsync();
        Task GetAsync();
    }
}
