using DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Services;

public interface IMenuService
{
    Task<Menu> GetByIdAsync(int menuId);
    Task<Menu> CreateAsync(Menu menu);
    Task<Menu> UpdateAsync(Menu menu);
    Task<bool> DeleteAsync(int menuId);
    Task<List<Menu>> GetAsync();
}
