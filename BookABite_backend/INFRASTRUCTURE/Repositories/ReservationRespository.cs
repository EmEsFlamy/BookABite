using DOMAIN.Models;
using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INFRASTRUCTURE.Repositories;

public class ReservationRespository(BookABiteDbContext dbContext) : IReservationRepository
{
    private readonly BookABiteDbContext _dbContext = dbContext;
    public async Task<Reservation> CreateAsync(Reservation reservation)
    {
        var r = new Entities.Reservation()
        {
            ReservationTime = reservation.ReservationTime,
            IsActive = reservation.IsActive,
            IsCompleted = reservation.IsCompleted,
            ClientName = reservation.ClientName,
            ClientSurname = reservation.ClientSurname,
            ClientPhoneNumber = reservation.ClientPhoneNumber
        };
        await _dbContext.Reservations.AddAsync(r);
        await _dbContext.SaveChangesAsync();
        reservation.Id = r.Id;
        return reservation;
    }

    public async Task<bool> DeleteAsync(Reservation reservation)
    {
        var er = await _dbContext.Reservations.SingleOrDefaultAsync(r => r.Id == reservation.Id);

        if (er is null)
        {
            return false;
        }
        _dbContext.Reservations.Remove(er);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public Task GetAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Reservation> GetByIdAsync(int reservationId)
    {
        var r = await _dbContext.Reservations.AsNoTracking().SingleOrDefaultAsync(reservation => reservation.Id == reservationId);
        return r is null ? null! : new Reservation
        {
            Id = r.Id,
            ReservationTime = r.ReservationTime,
            IsActive = r.IsActive,
            IsCompleted = r.IsCompleted,
            ClientName = r.ClientName,
            ClientSurname = r.ClientSurname,
            ClientPhoneNumber = r.ClientPhoneNumber
        };
    }

    public async Task<Reservation> UpdateAsync(Reservation reservation)
    {
        var er = await _dbContext.Reservations.FirstOrDefaultAsync(r => r.Id == reservation.Id);

        if (er is null)
        {
            return null; 
        }

        er.ReservationTime = reservation.ReservationTime;
        er.IsActive = reservation.IsActive;
        er.IsCompleted = reservation.IsCompleted;
        er.ClientName = reservation.ClientName;
        er.ClientSurname = reservation.ClientSurname;
        er.ClientPhoneNumber = reservation.ClientPhoneNumber;

        await _dbContext.SaveChangesAsync();
        return reservation;
    }
}

