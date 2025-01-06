using DOMAIN.Models;
using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using infa = INFRASTRUCTURE.Entities;
using Microsoft.EntityFrameworkCore;
using DOMAIN.DTOs;


namespace INFRASTRUCTURE.Repositories;

public class ReservationRespository(BookABiteDbContext dbContext) : IReservationRepository
{
    private readonly BookABiteDbContext _dbContext = dbContext;

    private async Task<infa.Table> GetFirstAvaiableTable(DateTime startDate)
    {
        var availableTable = await _dbContext.Tables
        .Where(t => !_dbContext.Reservations
    .Any(r => r.TableId == t.Id
              && r.IsActive
              && (startDate < r.ReservationEnd && startDate >= r.ReservationStart)))
        .FirstOrDefaultAsync();

        return availableTable;
    }

    public async Task<Reservation> CreateAsync(Reservation reservation)
    {
        reservation.ReservationStart = reservation.ReservationStart.AddSeconds(-reservation.ReservationStart.Second);
        reservation.ReservationEnd = reservation.ReservationEnd.AddSeconds(-reservation.ReservationEnd.Second);

        var r = new Entities.Reservation()
        {
            ReservationStart = reservation.ReservationStart,
            ReservationEnd = reservation.ReservationEnd, 
            IsActive = reservation.IsActive,
            IsCompleted = reservation.IsCompleted,
            ClientName = reservation.ClientName,
            ClientSurname = reservation.ClientSurname,
            ClientPhoneNumber = reservation.ClientPhoneNumber,
            TableId = reservation.TableId != -1 ? reservation.TableId : (await GetFirstAvaiableTable(reservation.ReservationStart)).Id
        };

        try
        {
            await _dbContext.Reservations.AddAsync(r);
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}, StackTrace: {ex.StackTrace}");
            throw;
        }
        reservation.Id = r.Id;
        reservation.TableId = r.TableId;
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
            ReservationEnd = r.ReservationEnd,
            ReservationStart = r.ReservationStart,
            IsActive = r.IsActive,
            IsCompleted = r.IsCompleted,
            ClientName = r.ClientName,
            ClientSurname = r.ClientSurname,
            ClientPhoneNumber = r.ClientPhoneNumber,
            TableId = r.TableId
        }).ToList();
    }

    public async Task<Reservation> GetByIdAsync(int reservationId)
    {
        var r = await _dbContext.Reservations.AsNoTracking().SingleOrDefaultAsync(reservation => reservation.Id == reservationId);
        return r is null ? null! : new Reservation
        {
            Id = r.Id,
            ReservationStart = r.ReservationStart,
            ReservationEnd  = r.ReservationEnd,
            IsActive = r.IsActive,
            IsCompleted = r.IsCompleted,
            ClientName = r.ClientName,
            ClientSurname = r.ClientSurname,
            ClientPhoneNumber = r.ClientPhoneNumber,
            TableId = r.TableId
        };
    }

    public async Task<Reservation> UpdateAsync(Reservation reservation)
    {
        var er = await _dbContext.Reservations.FirstOrDefaultAsync(r => r.Id == reservation.Id);

        if (er is null)
        {
            return null; 
        }

        er.ReservationStart = reservation.ReservationStart;
        er.ReservationEnd = reservation.ReservationEnd;
        er.IsActive = reservation.IsActive;
        er.IsCompleted = reservation.IsCompleted;
        er.ClientName = reservation.ClientName;
        er.ClientSurname = reservation.ClientSurname;
        er.ClientPhoneNumber = reservation.ClientPhoneNumber;
        er.TableId = reservation.TableId;

        await _dbContext.SaveChangesAsync();
        return reservation;
    }

    public async Task<List<ReservationDto>> GetDataAsync()
    {
        var reservations = await _dbContext.Reservations
            .AsNoTracking()
            .Select(r => new ReservationDto
            {
                ReservationStart = r.ReservationStart,
                ReservationEnd = r.ReservationEnd,
                IsCompleted = r.IsCompleted,
                TableId = r.TableId
            })
            .ToListAsync();

        return reservations;
    }

}

