using Microsoft.Extensions.Logging;
using ShiftMaster.Employee.Service.Application.DTOs;
using ShiftMaster.Employee.Service.Application.Interfaces;
using ShiftMaster.Employee.Service.Domain.Entities;
using ShiftMaster.Employee.Service.Domain.Enums;
using ShiftMaster.Employee.Service.Domain.Interfaces;
using ShiftMaster.Employee.Service.Infrastructure.Messaging;

namespace ShiftMaster.Employee.Service.Application.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;
    private readonly IOrganisationFilterRepository _orgRepository;
    private readonly IEventPublisher _eventPublisher;
    private readonly ILogger<EmployeeService> _logger;

    public EmployeeService(
        IEmployeeRepository repository,
        IOrganisationFilterRepository orgRepository,
        IEventPublisher eventPublisher,
        ILogger<EmployeeService> logger)
    {
        _repository = repository;
        _orgRepository = orgRepository;
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

    public async Task<EmployeeListResponse> GetListAsync(EmployeeListRequest request, CancellationToken ct = default)
    {
        var (items, total) = await _repository.GetListAsync(
            request.Search, request.Pole, request.Cellule, request.Department, request.Role,
            request.Page, request.PageSize, ct);
        var dtos = items.Select(e => new EmployeeListItemDto(
            e.Id.ToString(),
            $"{e.FirstName} {e.LastName}".Trim(),
            e.Email,
            e.JobTitle,
            e.Department,
            e.CellId,
            e.Role,
            e.Status.ToString(),
            e.ContractType.ToString(),
            e.Seniority.ToString(),
            e.EquityScore,
            e.LeaveBalance,
            e.Skills.Select(s => s.Name).ToList()
        )).ToList();
        return new EmployeeListResponse(dtos, total, request.Page, request.PageSize);
    }

    public async Task<OrganisationFilterDto> GetOrganisationFiltersAsync(CancellationToken ct = default)
    {
        var f = await _orgRepository.GetDistinctFiltersAsync(ct);
        return new OrganisationFilterDto(f.Poles, f.Cellules, f.Departments);
    }

    public async Task<EmployeeProfileDto?> CreateAsync(CreateEmployeeRequest request, CancellationToken ct = default)
    {
        if (await _repository.GetByEmailAsync(request.Email, ct) != null)
            return null;

        var id = Guid.NewGuid();
        var employee = new Employee
        {
            Id = id,
            UserId = request.UserId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            JobTitle = request.JobTitle,
            Department = request.Department,
            CellId = request.CellId,
            Role = request.Role,
            Status = EmployeeStatus.Active,
            ContractType = Enum.TryParse<ContractType>(request.ContractType, out var ctEnum) ? ctEnum : ContractType.CDI,
            Seniority = Enum.TryParse<Seniority>(request.Seniority, out var seEnum) ? seEnum : Seniority.Mid,
            EquityScore = 80,
            LeaveBalance = request.LeaveBalance,
            CreatedAt = DateTime.UtcNow,
            Skills = (request.Skills ?? []).Select(s => new EmployeeSkill { Id = Guid.NewGuid(), EmployeeId = id, Name = s, Level = 2 }).ToList(),
            AvailabilitySlots = CreateDefaultAvailability(id)
        };
        await _repository.AddAsync(employee, ct);
        return MapToProfile(await _repository.GetByIdAsync(id, ct));
    }

    public async Task<EmployeeProfileDto?> UpdateAsync(Guid id, UpdateEmployeeRequest request, CancellationToken ct = default)
    {
        var employee = await _repository.GetByIdAsync(id, ct);
        if (employee == null) return null;

        if (request.FirstName != null) employee.FirstName = request.FirstName;
        if (request.LastName != null) employee.LastName = request.LastName;
        if (request.Email != null) employee.Email = request.Email;
        if (request.JobTitle != null) employee.JobTitle = request.JobTitle;
        if (request.Department != null) employee.Department = request.Department;
        if (request.CellId != null) employee.CellId = request.CellId;
        if (request.Role != null) employee.Role = request.Role;
        if (request.Status != null && Enum.TryParse<EmployeeStatus>(request.Status, out var st)) employee.Status = st;
        if (request.ContractType != null && Enum.TryParse<ContractType>(request.ContractType, out var c)) employee.ContractType = c;
        if (request.Seniority != null && Enum.TryParse<Seniority>(request.Seniority, out var s)) employee.Seniority = s;
        if (request.LeaveBalance.HasValue) employee.LeaveBalance = request.LeaveBalance.Value;
        if (request.Skills != null)
        {
            employee.Skills.Clear();
            foreach (var name in request.Skills)
                employee.Skills.Add(new EmployeeSkill { Id = Guid.NewGuid(), EmployeeId = id, Name = name, Level = 2 });
        }
        employee.UpdatedAt = DateTime.UtcNow;
        await _repository.SaveChangesAsync(ct);
        return MapToProfile(await _repository.GetByIdAsync(id, ct));
    }

    public Task<bool> DeleteAsync(Guid id, CancellationToken ct = default) => _repository.DeleteAsync(id, ct);

    private static List<AvailabilitySlot> CreateDefaultAvailability(Guid employeeId)
    {
        var slots = new List<AvailabilitySlot>();
        for (var d = DayOfWeek.Monday; d <= DayOfWeek.Friday; d++)
            slots.Add(new AvailabilitySlot { Id = Guid.NewGuid(), EmployeeId = employeeId, DayOfWeek = d, StartTime = new TimeOnly(8, 0), EndTime = new TimeOnly(18, 0), IsAvailable = true });
        return slots;
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
