
using APPLICATION.Services;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;

namespace API.BackgroundServices;

public class SetTableStatusJob(ILogger<SetTableStatusJob> logger, IServiceScopeFactory serviceScopeFactory) : BackgroundService
{
    private readonly ILogger<SetTableStatusJob> _logger = logger;

    protected async override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested) 
        {
            try
            {
                using IServiceScope scope = serviceScopeFactory.CreateScope();

                var _dbContext = scope.ServiceProvider.GetRequiredService<BookABiteDbContext>();

                _logger.LogInformation("Status check...");

                var tablesId = _dbContext.Reservations
                    .Where(r => DateTime.SpecifyKind(r.ReservationStart, DateTimeKind.Local) < DateTime.Now
                                && DateTime.SpecifyKind(r.ReservationEnd, DateTimeKind.Local) > DateTime.Now
                                && !r.IsCompleted
                                && r.Table.TableStatus == INFRASTRUCTURE.Enums.TableStatusEnum.Available)
                    .Select(r => r.TableId)
                    .ToList();

                if (tablesId.Any()) 
                {
                    _logger.LogInformation("Status changing...");

                    _dbContext.Tables
                        .Where(t => tablesId.Contains(t.Id))
                        .ExecuteUpdate(t => t.SetProperty(x => x.TableStatus, INFRASTRUCTURE.Enums.TableStatusEnum.Reserved));

                    await _dbContext.SaveChangesAsync();

                    _logger.LogInformation("Status changed!");
                }
                else
                {
                    _logger.LogInformation("No tables require status change.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Status changing failed. Exception message: {@error}", ex.Message);
            }

            await Task.Delay(1000 * 60);
        }
    }
}
