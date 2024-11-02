﻿using APPLICATION.Services;
using DOMAIN.Models;
using DOMAIN.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpPost]
    public async Task<IActionResult> CreateAsync(User user)
    {
        var result = await _userService.CreateAsync(user);
        if (result is null)
        {
            return BadRequest("Something went wrong during user creation!");
        }
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetByIdAsync(int userId)
    {
        var result = await _userService.GetByIdAsync(userId);
        if (result is null)
        {
            return NotFound("User not found!");
        }
        return Ok(result);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAsync()
    {
        var result = await _userService.GetAsync();
        if (result is null)
        {
            return NotFound("No users found!");
        }
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(User user)
    {
        var result = await _userService.UpdateAsync(user);
        if (result is null)
        {
            return BadRequest("Cannot update this resource!");
        }
        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(int userId)
    {
        var result = await _userService.DeleteAsync(userId);
        if (result is false)
        {
            return NotFound("Cannot delete this User!");
        }
        return Ok(result);
    }
}