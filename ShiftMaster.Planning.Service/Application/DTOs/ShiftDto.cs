namespace ShiftMaster.Planning.Service.Application.DTOs;

public record ShiftDto(string Id, string EmployeeId, string EmployeeName, string StartTime, string EndTime, string Type, string Status);
