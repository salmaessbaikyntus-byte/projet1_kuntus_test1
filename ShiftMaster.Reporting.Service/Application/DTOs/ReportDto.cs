namespace ShiftMaster.Reporting.Service.Application.DTOs;

public record GenerateReportRequest(string Category, string ReportType, DateTime PeriodStart, DateTime PeriodEnd, string? Department, string? Team);
public record GenerateReportResponse(Guid ReportId, string Status);
public record ReportListItemDto(Guid Id, string Name, string Category, string ReportType, string PeriodStart, string PeriodEnd, string Author, string Status, DateTime CreatedAt);
public record ReportStatusDto(string ReportId, string CurrentStep, int Progress, string Status);
