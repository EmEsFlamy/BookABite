﻿using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using APPLICATION.Security;

namespace APPLICATION.Services;

public class UserService(IUserRepository userRepository) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<User> CreateAsync(User user)
    {
        if (user.Password != null && user.Password.Length > 0)
        {
            (byte[] hash, byte[] salt) = PasswordHasher.HashPassword(user.Password);

            user.Password = hash;
            user.PasswordSalt = salt;
        }
        else
        {
            throw new ArgumentException("Password cannot be null or empty.");
        }

        var result = await _userRepository.CreateAsync(user);
        return result;
    }

    public async Task<bool> DeleteAsync(int userId)
    {
        var result = await _userRepository.DeleteAsync(userId);
        return result;
    }

    public async Task<List<User>> GetAsync()
    {
        var result = await _userRepository.GetAsync();
        return result;
    }

    public async Task<User> GetByIdAsync(int userId)
    {
        var result = await _userRepository.GetByIdAsync(userId);
        return result;
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        var result = await _userRepository.GetByEmailAsync(email);
        return result;
    }

    public async Task<User> UpdateAsync(User user)
    {
        var result = await _userRepository.UpdateAsync(user);
        return result;
    }
}
