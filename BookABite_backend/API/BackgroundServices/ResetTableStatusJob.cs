using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;

namespace API.BackgroundServices;

public class ResetTableStatusJob(ILogger<ResetTableStatusJob> logger, IServiceScopeFactory serviceScopeFactory) : BackgroundService
{
    private readonly ILogger<ResetTableStatusJob> _logger = logger;

    protected async override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using IServiceScope scope = serviceScopeFactory.CreateScope();

                var _dbContext = scope.ServiceProvider.GetRequiredService<BookABiteDbContext>();

                _logger.LogInformation("Reset status check...");

                var tablesId = _dbContext.Reservations
                    .Where(r => DateTime.SpecifyKind(r.ReservationEnd, DateTimeKind.Local) < DateTime.Now
                                && !r.IsCompleted
                                && (r.Table.TableStatus == INFRASTRUCTURE.Enums.TableStatusEnum.Reserved 
                                || r.Table.TableStatus == INFRASTRUCTURE.Enums.TableStatusEnum.Occupied 
                                || r.Table.TableStatus == INFRASTRUCTURE.Enums.TableStatusEnum.Cleaning))
                    .Select(r => r.TableId)
                    .ToList();

                if (tablesId.Any())
                {
                    _logger.LogInformation("Reseting status...");

                    _dbContext.Tables
                        .Where(t => tablesId.Contains(t.Id))
                        .ExecuteUpdate(t => t.SetProperty(x => x.TableStatus, INFRASTRUCTURE.Enums.TableStatusEnum.Available));

                    _dbContext.Reservations
                        .Where(r => tablesId.Contains(r.TableId) 
                                    && DateTime.SpecifyKind(r.ReservationEnd, DateTimeKind.Local) < DateTime.Now
                                    && !r.IsCompleted
                                    && r.IsActive)
                        .ExecuteUpdate(r => r
                        .SetProperty(x => x.IsCompleted, true)
                        .SetProperty(x => x.IsActive, false));

                    await _dbContext.SaveChangesAsync();

                    _logger.LogInformation("Status reset completed!");
                }
                else
                {
                    _logger.LogInformation("No tables require status reset.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Status reseting failed. Exception message: {@error}", ex.Message);
            }

            await Task.Delay(1000 * 60);
        }
    }
}