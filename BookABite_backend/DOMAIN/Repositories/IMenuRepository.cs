using DOMAIN.Models;


namespace DOMAIN.Repositories;

public interface IMenuRepository
{
    Task<Menu> GetByIdAsync(int menuId);
    Task<Menu> CreateAsync(Menu menu);
    Task<Menu> UpdateAsync(Menu menu);
    Task<bool> DeleteAsync(int menuId);
    Task<List<Menu>> GetAsync();
}
