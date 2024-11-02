using DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Repositories
{
    public interface ITableRepository
    {
        Task<Table> GetByIdAsync(int tableId);
        Task<Table> CreateAsync(Table table);
        Task<Table> UpdateAsync(Table table);
        Task<bool> DeleteAsync(int tableId);
        Task<List<Table>> GetAsync();
    }
}
