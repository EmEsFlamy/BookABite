using DOMAIN.Models;


namespace DOMAIN.Repositories
{
    public interface IOrderService
    {
        Task<Order> GetByIdAsync(int orderId);
        Task<Order> CreateAsync(Order order);
        Task<Order> UpdateAsync(Order order);
        Task<bool> DeleteAsync(int orderId);
        Task<List<Order>> GetAsync();
    }
}
