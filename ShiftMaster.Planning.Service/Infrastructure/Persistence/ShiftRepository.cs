using Microsoft.EntityFrameworkCore;
using ShiftMaster.Planning.Service.Application.DTOs;
using ShiftMaster.Planning.Service.Domain.Entities;
using ShiftMaster.Planning.Service.Domain.Interfaces;

namespace ShiftMaster.Planning.Service.Infrastructure.Persistence;

public class ShiftRepository : IShiftRepository
{
    private readonly PlanningDbContext _context;

    public ShiftRepository(PlanningDbContext context) => _context = context;

    public async Task<IEnumerable<Shift>> GetShiftsAsync(DateTime start, DateTime end, string? cellId, Guid? userId, CancellationToken ct)
    {
        var query = _context.Shifts.Where(s => s.StartTime >= start && s.EndTime <= end);
        if (!string.IsNullOrEmpty(cellId)) query = query.Where(s => s.CellId == cellId);
        if (userId.HasValue) query = query.Where(s => s.EmployeeId == userId.Value);
        return await query.ToListAsync(ct);
    }

    public async Task<PlanningKpisDto?> GetKpisAsync(DateTime start, DateTime end, string? cellId, CancellationToken ct)
    {
        var shifts = await GetShiftsAsync(start, end, cellId, null, ct);
        var count = shifts.Select(s => s.EmployeeId).Distinct().Count();
        var totalSlots = 48;
        var coverage = totalSlots > 0 ? Math.Round(count * 100m / totalSlots, 1) : 0;
        return new PlanningKpisDto(coverage, 88, count, Math.Max(0, totalSlots - count), coverage >= 90);
    }
}
