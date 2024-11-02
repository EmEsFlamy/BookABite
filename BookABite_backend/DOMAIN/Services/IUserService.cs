

using DOMAIN.Models;

namespace DOMAIN.Services;

public interface IUserService
{
    Task<User> GetByIdAsync(int userId);
    Task<User> CreateAsync(User user);
    Task<User> UpdateAsync(User user);
    Task<bool> DeleteAsync(int userId);
    Task<List<User>> GetAsync();
}
