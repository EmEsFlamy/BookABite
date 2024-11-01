using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using Microsoft.Extensions.Logging;


namespace APPLICATION.Services
{
    public class MenuService(IMenuRepository menuRepository, ILogger<MenuService> logger) : IMenuService
    {
        private readonly IMenuRepository _menuRepository = menuRepository;
        private readonly ILogger<MenuService> _logger = logger;

        public async Task<Menu> CreateAsync(Menu menu)
        {
            _logger.LogInformation("Dish creating");
            var result = await _menuRepository.CreateAsync(menu);
            if (result is null)
            {
                _logger.LogError("Dish creating failed");
            }
            else
            {
                _logger.LogError("Dish creating succed");
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int menuId)
        {
<<<<<<< Updated upstream
            var result = await _menuRepository.DeleteAsync(menuId);
=======
            _logger.LogInformation("Dish deleting");
            var result = await _menuRepository.DeleteAsync(menuId);
            if (!result)
            {
                _logger.LogError("Dish deleting failed");
            }
            else
            {
                _logger.LogInformation("Dish deleting succed");
            }
            
>>>>>>> Stashed changes
            return result;
        }

        public async Task<Menu> GetByIdAsync(int menuId)
        {
            _logger.LogInformation("Getting dish");
            var result = await _menuRepository.GetByIdAsync(menuId);
            if (result is null)
            {
                _logger.LogError("Getting dish failed");
            }
            else
            {
                _logger.LogInformation("Getting dish succed");
            }
            return result;
        }

        public async Task<List<Menu>> GetAsync()
        {
            _logger.LogInformation("Getting all dishes");
            var result = await _menuRepository.GetAsync();
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

        public Task<Menu> UpdateAsync(Menu menu)
        {
            _logger.LogInformation("Updating dish");
            var result = _menuRepository.UpdateAsync(menu);
            if (result is null)
            {
                _logger.LogError("Updating dish failed");
            }
            else
            {
                _logger.LogInformation("Updating dish succed");
            }
            return result;
        }
    }
}
