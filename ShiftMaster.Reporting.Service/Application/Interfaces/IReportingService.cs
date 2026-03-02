using ShiftMaster.Reporting.Service.Application.DTOs;

namespace ShiftMaster.Reporting.Service.Application.Interfaces;

public interface IReportingService
{
    Task<GenerateReportResponse> GenerateAsync(GenerateReportRequest request, string author, CancellationToken ct = default);
    Task<ReportStatusDto?> GetStatusAsync(Guid reportId, CancellationToken ct = default);
    Task<IReadOnlyList<ReportListItemDto>> GetHistoryAsync(string? category, string? status, CancellationToken ct = default);
    Task<byte[]?> GetPdfAsync(Guid reportId, CancellationToken ct = default);
    Task<byte[]?> GetExcelAsync(Guid reportId, CancellationToken ct = default);
    Task ArchiveAsync(Guid reportId, CancellationToken ct = default);
}
