using APPLICATION.Services;
using DOMAIN.Models;
using DOMAIN.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserController(IUserService userService, IJwtTokenGenerator jwtTokenGenerator) : ControllerBase
{
    private readonly IUserService _userService = userService;
    private readonly IJwtTokenGenerator _jwtTokenGenerator = jwtTokenGenerator;


    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(UserRegistration userRegistration)
    {
        var user = new User
        {
            Name = userRegistration.Name,
            Surname = userRegistration.Surname,
            Username = userRegistration.Username,
            Password = Encoding.UTF8.GetBytes(userRegistration.Password),
            UserType = userRegistration.UserType
        };

        var existingUser = await _userService.GetByEmailAsync(userRegistration.Username);

        if (existingUser is not null) 
        {
            BadRequest("User with your e-mail already exist!");
        }
        var result = await _userService.CreateAsync(user);
        if (result is null)
        {
            return BadRequest("Something went wrong during user creation!");
        }
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(UserLogin userLogin)
    {

        var result = await _userService.GetByEmailAsync(userLogin.Username);
        if (result is null)
        {
            return NotFound("User not found!");
        }
        if (!result.Password.SequenceEqual(Encoding.UTF8.GetBytes(userLogin.Password)))
        {
            return BadRequest("Password do not match!");
        }
        var token = _jwtTokenGenerator.GenerateToken(result.Id, result.Name + " " + result.Surname);

        var response = new LoginResponse
        {
            Token = token,
            UserType = result.UserType.ToString()
        };
        return Ok(response);
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
