using DOMAIN.Models;
using DOMAIN.Repositories;
using INFRASTRUCTURE.Database;
using INFRASTRUCTURE.Enums;
using INFRASTRUCTURE.Security;
using Microsoft.EntityFrameworkCore;
using System.Text;


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
                Username = user.Username,
                Password = user.Password,
                PasswordSalt = user.PasswordSalt,
                UserType = (UserTypeEnum)user.UserType
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
                Username = r.Username,
                Password = r.Password,
                UserType = (DOMAIN.Enums.UserTypeEnum)r.UserType
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
                Username = r.Username,
                Password = r.Password,
                UserType = (DOMAIN.Enums.UserTypeEnum)r.UserType
            };
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            var r = await _dbContext.Users.AsNoTracking().SingleOrDefaultAsync(user => user.Username == email);
            return r is null ? null! : new User
            {
                Id = r.Id,
                Name = r.Name,
                Surname = r.Surname,
                Username = r.Username,
                Password = r.Password,
                PasswordSalt = r.PasswordSalt,
                UserType = (DOMAIN.Enums.UserTypeEnum)r.UserType
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
            er.Username = user.Username;
            er.UserType = (UserTypeEnum)user.UserType;
            

            await _dbContext.SaveChangesAsync();
            return user;    
        }

        public async Task<bool> ChangePasswordAsync(UserPasswordUpdate userPasswordUpdate)
        {
            var er = await _dbContext.Users.FirstOrDefaultAsync(r => r.Id == userPasswordUpdate.UserId);

            if (er is null)
            {
                return false;
            }
            var pass = PasswordHasher.HashPassword(Encoding.UTF8.GetBytes(userPasswordUpdate.Password));

            er.Password = pass.Hash;
            er.PasswordSalt = pass.Salt;

            await _dbContext.SaveChangesAsync();
            return true;

        }

        
    }
}
