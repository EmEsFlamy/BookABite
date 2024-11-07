using APPLICATION.Services;
using DOMAIN.Models;
using DOMAIN.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TableController(ITableService tableService) : ControllerBase
{
    private readonly ITableService _tableService = tableService;

    [HttpPost]
    public async Task<IActionResult> CreateAsync(Table table)
    {
        var result = await _tableService.CreateAsync(table);
        if (result is null)
        {
            return BadRequest("Something went wrong during table creation!");
        }
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetByIdAsync(int tableId)
    {
        var result = await _tableService.GetByIdAsync(tableId);
        if (result is null)
        {
            return NotFound("Table not found!");
        }
        return Ok(result);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAsync()
    {
        var result = await _tableService.GetAsync();
        if (result is null)
        {
            return NotFound("No tables found!");
        }
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(Table table)
    {
        var result = await _tableService.UpdateAsync(table);
        if (result is null)
        {
            return BadRequest("Cannot update this resource!");
        }
        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(int tableId)
    {
        var result = await _tableService.DeleteAsync(tableId);
        if (result is false)
        {
            return NotFound("Table not found!");
        }
        return Ok(result);
    }
}
