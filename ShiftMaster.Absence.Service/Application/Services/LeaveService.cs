using Microsoft.EntityFrameworkCore;
using ShiftMaster.Absence.Service.Application.DTOs;
using ShiftMaster.Absence.Service.Application.Interfaces;
using ShiftMaster.Absence.Service.Domain.Entities;
using ShiftMaster.Absence.Service.Domain.Enums;
using ShiftMaster.Absence.Service.Infrastructure.Persistence;
using ShiftMaster.Absence.Service.Infrastructure.Messaging;

namespace ShiftMaster.Absence.Service.Application.Services;

public class LeaveService : ILeaveService
{
    private readonly AbsenceDbContext _context;
    private readonly IEventPublisher _eventPublisher;

    public LeaveService(AbsenceDbContext context, IEventPublisher eventPublisher)
    {
        _context = context;
        _eventPublisher = eventPublisher;
    }

    public async Task<LeaveMeDto> GetMeAsync(Guid employeeId, CancellationToken ct = default)
    {
        var leaves = await _context.LeaveRequests.Where(l => l.EmployeeId == employeeId).OrderByDescending(l => l.CreatedAt).ToListAsync(ct);
        var balance = await GetBalanceAsync(employeeId, ct);
        return new LeaveMeDto(balance, leaves.Select(Map).ToList());
    }

    public async Task<LeaveResponse?> CreateAsync(Guid employeeId, CreateLeaveRequest request, CancellationToken ct = default)
    {
        var leave = new LeaveRequest
        {
            Id = Guid.NewGuid(),
            EmployeeId = employeeId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            LeaveType = request.LeaveType,
            Reason = request.Reason,
            Status = LeaveStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };
        _context.LeaveRequests.Add(leave);
        await _context.SaveChangesAsync(ct);
        return MapResponse(leave);
    }

    public async Task<LeaveResponse?> CancelAsync(Guid leaveId, Guid employeeId, CancellationToken ct = default)
    {
        var leave = await _context.LeaveRequests.FirstOrDefaultAsync(l => l.Id == leaveId && l.EmployeeId == employeeId, ct);
        if (leave == null || leave.Status != LeaveStatus.Pending) return null;
        leave.Status = LeaveStatus.Rejected;
        await _context.SaveChangesAsync(ct);
        return MapResponse(leave);
    }

    private async Task<decimal> GetBalanceAsync(Guid employeeId, CancellationToken ct)
    {
        var emp = await _context.EmployeeBalances.FirstOrDefaultAsync(e => e.EmployeeId == employeeId, ct);
        return emp?.Balance ?? 15m;
    }

    private static LeaveItemDto Map(LeaveRequest l) => new(l.Id.ToString(), l.StartDate, l.EndDate, l.LeaveType, l.Status.ToString(), l.Reason);
    private static LeaveResponse MapResponse(LeaveRequest l) => new(l.Id.ToString(), l.StartDate, l.EndDate, l.Status.ToString());
}
