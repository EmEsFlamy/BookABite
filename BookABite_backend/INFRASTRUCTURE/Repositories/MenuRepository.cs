using DOMAIN.Models;
using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;


namespace INFRASTRUCTURE.Repositories;

public class MenuRepository(BookABiteDbContext dbContext) : IMenuRepository
{
    private readonly BookABiteDbContext _dbContext = dbContext;

    public async Task<Menu> CreateAsync(Menu menu)
    {
        var r = new Entities.Menu()
        {
            FoodName = menu.FoodName,
            Price = menu.Price
        };
        await _dbContext.Menus.AddAsync(r);
        await _dbContext.SaveChangesAsync();
        menu.Id=r.Id;
        return menu;

    }

    public async Task<bool> DeleteAsync(int menuId)
    {
        var er = await _dbContext.Menus.SingleOrDefaultAsync(r => r.Id == menuId);

        if (er is null)
        {
            return false;
        }
        _dbContext.Menus.Remove(er);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<List<Menu>> GetAsync()
    {
        var menus = await _dbContext.Menus.AsNoTracking().ToListAsync();

        return menus.Select(m => new Menu
        {
            Id = m.Id,
            FoodName = m.FoodName,
            Price = m.Price
        }).ToList();
    }


    public async Task<Menu> GetByIdAsync(int menuId)
    {
        var r = await _dbContext.Menus.AsNoTracking().SingleOrDefaultAsync(menu => menu.Id == menuId);
        return r is null ? null! : new Menu
        {
            Id = r.Id,
            FoodName =r.FoodName,
            Price =r.Price
        };
    }

    public async Task<Menu> UpdateAsync(Menu menu)
    {
        var er = await _dbContext.Menus.FirstOrDefaultAsync(r => r.Id == menu.Id);

        if (er is null)
        {
            return null;
        }

        er.FoodName = menu.FoodName;
        er.Price = menu.Price;

        await _dbContext.SaveChangesAsync();
        return menu;

    }
}
