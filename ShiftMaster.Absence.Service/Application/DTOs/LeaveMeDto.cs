namespace ShiftMaster.Absence.Service.Application.DTOs;

public record LeaveMeDto(decimal LeaveBalance, IReadOnlyList<LeaveItemDto> History);
public record LeaveItemDto(string Id, DateTime StartDate, DateTime EndDate, string LeaveType, string Status, string? Reason);
public record CreateLeaveRequest(DateTime StartDate, DateTime EndDate, string LeaveType, string? Reason);
public record LeaveResponse(string Id, DateTime StartDate, DateTime EndDate, string Status);
