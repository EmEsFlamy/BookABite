﻿using DOMAIN.Models;
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
        Task<Reservation> UpdateAsync(Reservation reservation);
        Task<bool> DeleteAsync(int reservationId);
        Task<List<Reservation>> GetAsync();
    }
}
