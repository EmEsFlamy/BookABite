﻿using DOMAIN.Models;
using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;


namespace INFRASTRUCTURE.Repositories;

public class ReservationRespository(BookABiteDbContext dbContext) : IReservationRepository
{
    private readonly BookABiteDbContext _dbContext = dbContext;
    public async Task<Reservation> CreateAsync(Reservation reservation)
    {
        var availableTable = await _dbContext.Tables
        .Where(t => !_dbContext.Reservations
            .Any(r => r.TableId == t.Id
                      && r.ReservationTime == reservation.ReservationTime
                      && r.IsActive))
        .FirstOrDefaultAsync();

        if (availableTable == null)
        {
            throw new InvalidOperationException("No available tables at the requested time.");
        }

        var r = new Entities.Reservation()
        {
            ReservationTime = reservation.ReservationTime,
            IsActive = reservation.IsActive,
            IsCompleted = reservation.IsCompleted,
            ClientName = reservation.ClientName,
            ClientSurname = reservation.ClientSurname,
            ClientPhoneNumber = reservation.ClientPhoneNumber,
            TableId = availableTable.Id 
        };

        await _dbContext.Reservations.AddAsync(r);
        await _dbContext.SaveChangesAsync();
        reservation.Id = r.Id;
        return reservation;
    }

    public async Task<bool> DeleteAsync(int reservationId)
    {
        var er = await _dbContext.Reservations.SingleOrDefaultAsync(r => r.Id == reservationId);

        if (er is null)
        {
            return false;
        }
        _dbContext.Reservations.Remove(er);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<List<Reservation>> GetAsync()
    {
        var reservations = await _dbContext.Reservations.AsNoTracking().ToListAsync();

        return reservations.Select(r => new Reservation
        {
            Id = r.Id,
            ReservationTime = r.ReservationTime,
            IsActive = r.IsActive,
            IsCompleted = r.IsCompleted,
            ClientName = r.ClientName,
            ClientSurname = r.ClientSurname,
            ClientPhoneNumber = r.ClientPhoneNumber
        }).ToList();
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

