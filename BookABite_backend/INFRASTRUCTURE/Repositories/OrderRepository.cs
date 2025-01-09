using DOMAIN.Models;
using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using INFRASTRUCTURE.Enums;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace INFRASTRUCTURE.Repositories
{
    public class OrderRepository(BookABiteDbContext dbContext) : IOrderRepository
    {
        private readonly BookABiteDbContext _dbContext = dbContext;
        public async Task<Order> CreateAsync(Order order)
        {
            var fPrice = _dbContext.Menus.AsNoTracking().Where(x => order.MenuIds.Contains(x.Id)).Select(y => y.Price).Sum();
            var r = new Entities.Order()
            {
                FullPrice = fPrice,
                OrderStatus = OrderStatusEnum.Ongoing,
                TableId = order.TableId,
                UserId = order.UserId
            };
            await _dbContext.Orders.AddAsync(r);
            await _dbContext.SaveChangesAsync();
            order.Id = r.Id;
            order.FullPrice = fPrice;
            foreach (var menuId in order.MenuIds)
            {
                await _dbContext.MenuOrders.AddAsync(new Entities.MenuOrder
                {
                    MenuId = menuId,
                    OrderId = r.Id
                });
            }
            await _dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<bool> DeleteAsync(int orderId)
        {
            var er = await _dbContext.Orders.SingleOrDefaultAsync(r => r.Id == orderId);

            if (er is null)
            {
                return false;
            }
            _dbContext.Orders.Remove(er);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<Order> GetByIdAsync(int orderId)
        {
            var o = await _dbContext.Orders.AsNoTracking().SingleOrDefaultAsync(order => order.Id == orderId);
            return o is null ? null! : new Order
            {
                Id = o.Id,
                FullPrice = o.FullPrice,
                OrderStatus = (DOMAIN.Enums.OrderStatusEnum)o.OrderStatus
            };
        }

        public async Task<List<Order>> GetAsync()
        {
            var orders = await _dbContext.Orders.AsNoTracking().ToListAsync();

            return orders.Select(o => new Order
            {
                Id = o.Id,
                FullPrice = o.FullPrice,
                OrderStatus = (DOMAIN.Enums.OrderStatusEnum)o.OrderStatus
            }).ToList();
        }

        public async Task<Order> UpdateAsync(Order order)
        {
            var er = await _dbContext.Orders.FirstOrDefaultAsync(r => r.Id == order.Id);

            if (er is null)
            {
                return null;
            }

           er.FullPrice = order.FullPrice;
           er.OrderStatus = (OrderStatusEnum)order.OrderStatus;

            await _dbContext.SaveChangesAsync();
            return order;
        }
    }
}
