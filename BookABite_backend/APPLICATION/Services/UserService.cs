using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using Microsoft.Extensions.Logging;

namespace APPLICATION.Services;

public class UserService(IUserRepository userRepository) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;

    public async Task<User> CreateAsync(User user)
    {
        var result = await _userRepository.CreateAsync(user);
        return result;
    }

    public async Task<bool> DeleteAsync(int userId)
    {
        var result = await _userRepository.DeleteAsync(userId);
        return result;
    }

    public Task<List<User>> GetAsync()
    {
        throw new NotImplementedException();
    }

    public Task<User> GetByIdAsync(int userId)
    {
        throw new NotImplementedException();
    }

    public Task<User> UpdateAsync(User user)
    {
        throw new NotImplementedException();
    }
}
