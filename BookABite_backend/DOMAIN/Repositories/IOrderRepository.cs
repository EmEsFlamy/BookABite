using DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Repositories
{
    public interface IOrderRepository
    {
        Task<Order> GetByIdAsync(int orderId);
        Task<Order> CreateAsync(Order order);
        Task<Order> UpdateAsync(Order order);
        Task<bool> DeleteAsync(int orderId);
        Task<List<Order>> GetAsync();
    }
}
