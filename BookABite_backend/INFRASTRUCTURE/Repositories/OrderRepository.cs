﻿using DOMAIN.Models;
using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using INFRASTRUCTURE.Enums;
using Microsoft.EntityFrameworkCore;

namespace INFRASTRUCTURE.Repositories
{
    public class OrderRepository(BookABiteDbContext dbContext) : IOrderRepository
    {
        private readonly BookABiteDbContext _dbContext = dbContext;
        public async Task<Order> CreateAsync(Order order)
        {
            var r = new Entities.Order()
            {
                FullPrice = order.FullPrice,
                TimeStart = order.TimeStart,
                TimeEnd = order.TimeEnd,
                OrderStatus = OrderStatusEnum.Ordered
            };
            await _dbContext.Orders.AddAsync(r);
            await _dbContext.SaveChangesAsync();
            order.Id = r.Id;
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
            var r = await _dbContext.Orders.AsNoTracking().SingleOrDefaultAsync(order => order.Id == orderId);
            return r is null ? null! : new Order
            {
                Id = r.Id,
                FullPrice = r.FullPrice,
                TimeStart = r.TimeStart,
                TimeEnd = r.TimeEnd
            };
        }

        public async Task<List<Order>> GetAsync()
        {
            var orders = await _dbContext.Orders.AsNoTracking().ToListAsync();

            return orders.Select(o => new Order
            {
                Id = o.Id,
                FullPrice = o.FullPrice,
                TimeStart = o.TimeStart,
                TimeEnd = o.TimeEnd
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
