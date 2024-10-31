using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;


namespace APPLICATION.Services
{
    public class MenuService(IMenuRepository menuRepository) : IMenuService
    {
        private readonly IMenuRepository _menuRepository = menuRepository;
        public async Task<Menu> CreateAsync(Menu menu)
        {
            var result = await _menuRepository.CreateAsync(menu);
            return result;
        }

        public async Task<bool> DeleteAsync(int menuId)
        {
            var result = await _menuRepository.DeleteAsync(menuId);
            return result;
        }

        public async Task<Menu> GetByIdAsync(int menuId)
        {
            var result = await _menuRepository.GetByIdAsync(menuId);
            return result;
        }

        public async Task<List<Menu>> GetAsync()
        {
            var result = await _menuRepository.GetAsync();
            return result;
        }

        public Task<Menu> UpdateAsync(Menu menu)
        {
            var result = _menuRepository.UpdateAsync(menu);
            return result;
        }
    }
}
