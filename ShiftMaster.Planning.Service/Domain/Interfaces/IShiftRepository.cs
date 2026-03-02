using ShiftMaster.Planning.Service.Application.DTOs;
using ShiftMaster.Planning.Service.Domain.Entities;

namespace ShiftMaster.Planning.Service.Domain.Interfaces;

public interface IShiftRepository
{
    Task<IEnumerable<Shift>> GetShiftsAsync(DateTime start, DateTime end, string? cellId, Guid? userId, CancellationToken ct);
    Task<PlanningKpisDto?> GetKpisAsync(DateTime start, DateTime end, string? cellId, CancellationToken ct);
    Task AddShiftsAsync(IEnumerable<Shift> shifts, CancellationToken ct);
}
