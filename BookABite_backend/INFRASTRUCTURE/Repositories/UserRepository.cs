using DOMAIN.Models;
using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;


namespace INFRASTRUCTURE.Repositories
{
    public class UserRepository(BookABiteDbContext dbContext) : IUserRepository
    {
        private readonly BookABiteDbContext _dbContext = dbContext;

        public async Task<User> CreateAsync(User user)
        {
            var r = new Entities.User()
            {
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Password = user.Password
            };
            await _dbContext.Users.AddAsync(r);
            await _dbContext.SaveChangesAsync();
            user.Id = r.Id;
            return user;
        }

        public async Task<bool> DeleteAsync(int userId)
        {
            var er = await _dbContext.Users.SingleOrDefaultAsync(r => r.Id == userId);

            if (er is null)
            {
                return false;
            }
            _dbContext.Users.Remove(er);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<User>> GetAsync()
        {
            var users = await _dbContext.Users.AsNoTracking().ToListAsync();

            return users.Select(r => new User
            {
                Id = r.Id,
                Name = r.Name,
                Surname = r.Surname,
                Email = r.Email,
                Password = r.Password
            }).ToList();
        }

        public async Task<User> GetByIdAsync(int userId)
        {
            var r = await _dbContext.Users.AsNoTracking().SingleOrDefaultAsync(user => user.Id == userId);
            return r is null ? null! : new User
            {
                Id = r.Id,
                Name = r.Name,
                Surname = r.Surname,
                Email = r.Email,
                Password = r.Password
            };
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            var r = await _dbContext.Users.AsNoTracking().SingleOrDefaultAsync(user => user.Email == email);
            return r is null ? null! : new User
            {
                Id = r.Id,
                Name = r.Name,
                Surname = r.Surname,
                Email = r.Email,
                Password = r.Password
            };
        }

        public async Task<User> UpdateAsync(User user)
        {
            var er = await _dbContext.Users.FirstOrDefaultAsync(r => r.Id == user.Id);

            if (er is null)
            {
                return null;
            }

            er.Name = user.Name;
            er.Surname = user.Surname;
            er.Email = user.Email;
            er.Password = user.Password;

            await _dbContext.SaveChangesAsync();
            return user;    
        }

        
    }
}
