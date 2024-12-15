using DOMAIN.DTOs;
using DOMAIN.Models;
using DOMAIN.Repositories;
using DOMAIN.Services;
using Microsoft.Extensions.Logging;


namespace APPLICATION.Services
{
    public class TableService(ITableRepository tableRepository, ILogger<TableService> logger) : ITableService
    {

        private readonly ITableRepository _tableRepository = tableRepository;
        private readonly ILogger<TableService> _logger = logger;

        public async Task<Table> CreateAsync(Table table)
        {
            _logger.LogInformation("Table creating");
            var result = await _tableRepository.CreateAsync(table);
            if (result is null)
            {
                _logger.LogError("Table creating failed");
            }
            else
            {
                _logger.LogInformation("Table creating succed");
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int tableId)
        {
            var result = await _tableRepository.DeleteAsync(tableId);
            _logger.LogInformation("Table deleting");
            if (!result)
            {
                _logger.LogError("Table deleting failed");
            }
            else
            {
                _logger.LogInformation("Table deleting succed");
            }

            return result;
        }

        public async Task<List<TableDto>> GetAsync()
        {
            _logger.LogInformation("Getting all tables");
            var result = await _tableRepository.GetAsync();
            if (result == null || !result.Any())
            {
                _logger.LogWarning("No tables found");
            }
            else
            {
                _logger.LogInformation($"Found {result.Count} tables");
            }
            return result;
        }

        public async Task<TableDto> GetByIdAsync(int tableId)
        {
            _logger.LogInformation("Getting table");
            var result = await _tableRepository.GetByIdAsync(tableId);
            if (result is null)
            {
                _logger.LogError("Getting table failed");
            }
            else
            {
                _logger.LogInformation("Getting table succed");
            }
            return result;
        }

        public Task<Table> UpdateAsync(Table table)
        {
            _logger.LogInformation("Updating table");
            var result = _tableRepository.UpdateAsync(table);
            if (result is null)
            {
                _logger.LogError("Updating table failed");
            }
            else
            {
                _logger.LogInformation("Updating table succed");
            }
            return result;
        }
    }
}
