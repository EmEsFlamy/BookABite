using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MenuController(IMenuService menuService) : ControllerBase
{
    private readonly IMenuService _menuService = menuService;

    [HttpPost]
    public async Task<IActionResult> CreateAsync(Menu menu)
    {
        var result = await _menuService.CreateAsync(menu);
        if (result is null)
        {
            return BadRequest("Something went wrong during dish creation!");
        }
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetByIdAsync(int menuId)
    {
        var result = await _menuService.GetByIdAsync(menuId);
        if (result is null)
        {
            return NotFound("Dish not found!");
        }
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpGet("all")]
    public async Task<IActionResult> GetAsync()
    {
        var result = await _menuService.GetAsync();
        if (result is null)
        {
            return NotFound("No dishes found!");
        }
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(Menu menu)
    {
        var result = await _menuService.UpdateAsync(menu);
        if (result is null)
        {
            return BadRequest("Cannot update this resource!");
        }
        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(int menuId)
    {
        var result = await _menuService.DeleteAsync(menuId);
        if (result is false)
        {
            return NotFound("Dish not found!");
        }
        return Ok(result);
    }
}
