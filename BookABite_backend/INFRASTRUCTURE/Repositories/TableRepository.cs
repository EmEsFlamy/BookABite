using DOMAIN.DTOs;
using DOMAIN.Enums;
using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;

namespace INFRASTRUCTURE.Repositories
{
    public class TableRepository(BookABiteDbContext dbContext) : ITableRepository
    {
        private readonly BookABiteDbContext _dbContext = dbContext;
        public async Task<Table> CreateAsync(Table table)
        {
            var t = new Entities.Table()
            {
                Seats = table.Seats,
                TableStatus = (Enums.TableStatusEnum)table.TableStatus
            };
            await _dbContext.Tables.AddAsync(t);
            await _dbContext.SaveChangesAsync();
            table.Id = t.Id;
            return table;

        }

        public async Task<bool> DeleteAsync(int tableId)
        {
            var er = await _dbContext.Tables.SingleOrDefaultAsync(t => t.Id == tableId);
            if (er is null) 
            {
                return false;
            }
            _dbContext.Tables.Remove(er);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<TableDto>> GetAsync()
        {
            var tables = await _dbContext.Tables.AsNoTracking().ToListAsync();
            return tables.Select(t => new TableDto
            {
                Id = t.Id,
                Seats = t.Seats,
                TableStatus = Enum.GetName((TableStatusEnum)t.TableStatus)
            }).ToList();
        }

        public async Task<TableDto> GetByIdAsync(int tableId)
        {
            var t = await _dbContext.Tables.AsNoTracking().SingleOrDefaultAsync(table => table.Id == tableId);
            return t is null ? null! : new TableDto
            {
                Id = t.Id,
                Seats = t.Seats,
                TableStatus = Enum.GetName((TableStatusEnum)t.TableStatus)
            };
        }

        public async Task<Table> UpdateAsync(Table table)
        {
            var t = await _dbContext.Tables.FirstOrDefaultAsync(t => t.Id == table.Id);

            if (t is null)
            {
                return null;
            }

            t.Seats = table.Seats;

            await _dbContext.SaveChangesAsync();
            return table;
        }
    }
}
