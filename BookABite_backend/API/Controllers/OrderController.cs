using DOMAIN.Models;
using DOMAIN.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class OrderController(IOrderService orderService) : ControllerBase
{
    private readonly IOrderService _orderService = orderService;

    [HttpPost]
    public async Task<IActionResult> CreateAsync(Order order)
    {
        var result = await _orderService.CreateAsync(order);
        if (result is null)
        {
            return BadRequest("Something went wrong during order creation!");
        }
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetByIdAsync(int orderId)
    {
        var result = await _orderService.GetByIdAsync(orderId);
        if (result is null)
        {
            return NotFound("Order not found!");
        }
        return Ok(result);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAsync()
    {
        var result = await _orderService.GetAsync();
        if (result is null)
        {
            return NotFound("Orders not found!");
        }
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(Order order)
    {
        var result = await _orderService.UpdateAsync(order);
        if (result is null)
        {
            return BadRequest("Cannot update this resource!");
        }
        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(int orderId)
    {
        var result = await _orderService.DeleteAsync(orderId);
        if (result is false)
        {
            return NotFound("Order not found!");
        }
        return Ok(result);
    }
}
