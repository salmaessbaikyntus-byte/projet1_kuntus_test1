using Microsoft.Extensions.Logging;
using ShiftMaster.Employee.Service.Application.DTOs;
using ShiftMaster.Employee.Service.Application.Interfaces;
using ShiftMaster.Employee.Service.Domain.Interfaces;
using ShiftMaster.Employee.Service.Infrastructure.Messaging;

namespace ShiftMaster.Employee.Service.Application.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;
    private readonly IEventPublisher _eventPublisher;
    private readonly ILogger<EmployeeService> _logger;

    public EmployeeService(
        IEmployeeRepository repository,
        IEventPublisher eventPublisher,
        ILogger<EmployeeService> logger)
    {
        _repository = repository;
        _eventPublisher = eventPublisher;
        _logger = logger;
    }

    public async Task<EmployeeProfileDto?> GetMeAsync(Guid userId, CancellationToken ct = default)
    {
        var employee = await _repository.GetByUserIdAsync(userId.ToString(), ct);
        return MapToProfile(employee);
    }

    public async Task<EmployeeProfileDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var employee = await _repository.GetByIdAsync(id, ct);
        return MapToProfile(employee);
    }

    private static EmployeeProfileDto? MapToProfile(Domain.Entities.Employee? employee)
    {
        if (employee == null) return null;

        var name = $"{employee.FirstName} {employee.LastName}".Trim();
        return new EmployeeProfileDto(
            employee.Id.ToString(),
            employee.UserId,
            employee.FirstName,
            employee.LastName,
            name,
            employee.Email,
            employee.JobTitle,
            employee.Department,
            employee.CellId,
            employee.AvatarUrl,
            employee.Role,
            employee.Status.ToString(),
            employee.ContractType.ToString(),
            employee.Seniority.ToString(),
            employee.EquityScore,
            employee.LeaveBalance,
            employee.Skills.Select(s => s.Name).ToList(),
            employee.AvailabilitySlots.Select(a => new AvailabilitySlotDto(
                a.DayOfWeek, a.StartTime, a.EndTime, a.IsAvailable)).ToList()
        );
    }
}
