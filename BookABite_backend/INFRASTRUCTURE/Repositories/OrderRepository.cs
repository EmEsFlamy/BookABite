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
            var menuIds = order.MenuIds.Keys.ToList();

            var menus = await _dbContext.Menus
        .Where(m => menuIds.Contains(m.Id))
        .ToListAsync();

            var fPrice = menus
        .Sum(m => m.Price * order.MenuIds[m.Id]);

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

            foreach (var menuItem in order.MenuIds)
            {
                var menuId = menuItem.Key;
                var quantity = menuItem.Value;

                    await _dbContext.MenuOrders.AddAsync(new Entities.MenuOrder
                    {
                        MenuId = menuId,
                        OrderId = r.Id,
                        Quantity = quantity                 
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
            var o = await _dbContext.Orders
                .AsNoTracking()
                .Include(order => order.OrdersMenu)
                .ThenInclude(menuOrder => menuOrder.Menu)
                .SingleOrDefaultAsync(order => order.Id == orderId);

            if (o is null)
            {
                return null!;
            }

            return new Order
            {
                Id = o.Id,
                FullPrice = o.FullPrice,
                TableId = o.TableId,
                UserId = o.UserId,
                OrderStatus = (DOMAIN.Enums.OrderStatusEnum)o.OrderStatus,
                MenuIds = o.OrdersMenu.ToDictionary(mo => mo.MenuId, mo => mo.Quantity)
            };
        }



        public async Task<List<Order>> GetAsync()
        {
            var orders = await _dbContext.Orders
                .AsNoTracking()
                .Include(order => order.OrdersMenu)
                .ThenInclude(menuOrder => menuOrder.Menu)
                .ToListAsync();

            return orders.Select(o => new Order
            {
                Id = o.Id,
                FullPrice = o.FullPrice,
                OrderStatus = (DOMAIN.Enums.OrderStatusEnum)o.OrderStatus,
                TableId = o.TableId,
                UserId = o.UserId,
                MenuIds = o.OrdersMenu.ToDictionary(mo => mo.MenuId, mo => mo.Quantity)
            }).ToList();
        }


        public async Task<Order> UpdateAsync(Order order)
        {
            var er = await _dbContext.Orders
                .Include(o => o.OrdersMenu)
                .FirstOrDefaultAsync(r => r.Id == order.Id);

            if (er is null)
            {
                return null!;
            }

            er.FullPrice = order.FullPrice;
            er.OrderStatus = (OrderStatusEnum)order.OrderStatus;

            var existingMenuOrders = er.OrdersMenu.ToList();
            var newMenuIds = order.MenuIds.Keys.Except(existingMenuOrders.Select(mo => mo.MenuId)).ToList();
            var removedMenuOrders = existingMenuOrders.Where(mo => !order.MenuIds.ContainsKey(mo.MenuId)).ToList();

            foreach (var removedMenuOrder in removedMenuOrders)
            {
                _dbContext.MenuOrders.Remove(removedMenuOrder);
            }

            foreach (var existingMenuOrder in existingMenuOrders)
            {
                if (order.MenuIds.TryGetValue(existingMenuOrder.MenuId, out var newQuantity))
                {
                    existingMenuOrder.Quantity = newQuantity;
                }
            }

            foreach (var newMenuId in newMenuIds)
            {
                er.OrdersMenu.Add(new Entities.MenuOrder
                {
                    MenuId = newMenuId,
                    OrderId = er.Id,
                    Quantity = order.MenuIds[newMenuId]
                });
            }

            await _dbContext.SaveChangesAsync();
            return order;
        }


    }
}
