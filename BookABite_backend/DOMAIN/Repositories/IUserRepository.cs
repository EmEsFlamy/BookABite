﻿using DOMAIN.Models;


namespace DOMAIN.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(int userId);
        Task<User> CreateAsync(User user);
        Task<User> UpdateAsync(User user);
        Task<bool> DeleteAsync(int userId);
        Task<List<User>> GetAsync();
        Task<User> GetByEmailAsync(string email);
        Task<bool> ChangePasswordAsync(UserPasswordUpdate userPasswordUpdate);
        Task<string> GenerateRandomPasswordAsync();
    }
}
