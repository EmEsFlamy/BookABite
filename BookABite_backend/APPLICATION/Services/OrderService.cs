using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using Microsoft.Extensions.Logging;

namespace APPLICATION.Services;

public class OrderService(IOrderRepository orderRepository, ILogger<OrderService> logger) : IOrderService
{
    private readonly ILogger<OrderService> _logger = logger;
    private readonly IOrderRepository _orderRepository = orderRepository;
    public async Task<Order> CreateAsync(Order order)
    {
        _logger.LogInformation("Order creating");
        var result = await _orderRepository.CreateAsync(order);
        if (result is null)
        {
            _logger.LogError("Order creating failed");
        }
        else
        {
            _logger.LogInformation("Order creating succed");
        }
        return result;
    }
    public async Task<bool> DeleteAsync(int orderId)
    {
        var result = await _orderRepository.DeleteAsync(orderId);
        _logger.LogInformation("Order deleting");
        if (!result)
        {
            _logger.LogError("Order deleting failed");
        }
        else
        {
            _logger.LogInformation("Order deleting succed");
        }
        return result;
    }
    public async Task<List<Order>> GetAsync()
    {
        _logger.LogInformation("Getting all dishes");
        var result = await _orderRepository.GetAsync();
        if (result == null || !result.Any())
        {
            _logger.LogWarning("No dishes found");
        }
        else
        {
            _logger.LogInformation($"Found {result.Count} dishes");
        }
        return result;
    }
    public async Task<Order> GetByIdAsync(int orderId)
    {
        _logger.LogInformation("Getting order");
        var result = await _orderRepository.GetByIdAsync(orderId);
        if (result is null)
        {
            _logger.LogError("Getting order failed");
        }
        else
        {
            _logger.LogInformation("Getting order succed");
        }
        return result;
    }
    public Task<Order> UpdateAsync(Order order)
    {
        _logger.LogInformation("Updating order");
        var result = _orderRepository.UpdateAsync(order);
        if (result is null)
        {
            _logger.LogError("Updating order failed");
        }
        else
        {
            _logger.LogInformation("Updating order succed");
        }
        return result;
    }
}

