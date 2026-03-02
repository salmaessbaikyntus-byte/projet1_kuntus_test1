using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using ShiftMaster.Reporting.Service.Application.DTOs;
using ShiftMaster.Reporting.Service.Application.Interfaces;
using ShiftMaster.Reporting.Service.Domain.Entities;
using ShiftMaster.Reporting.Service.Infrastructure.Persistence;

namespace ShiftMaster.Reporting.Service.Application.Services;

public class ReportingService : IReportingService
{
    private readonly ReportingDbContext _context;

    public ReportingService(ReportingDbContext context) => _context = context;

    public async Task<GenerateReportResponse> GenerateAsync(GenerateReportRequest request, string author, CancellationToken ct = default)
    {
        var report = new Report
        {
            Id = Guid.NewGuid(),
            Name = $"{request.ReportType} {request.PeriodStart:yyyy-MM-dd}",
            Category = request.Category,
            ReportType = request.ReportType,
            PeriodStart = request.PeriodStart,
            PeriodEnd = request.PeriodEnd,
            Author = author,
            Status = ReportStatus.GENERATED,
            CreatedAt = DateTime.UtcNow
        };

        report.PdfContent = GenerateMockPdf(report);
        report.GeneratedAt = DateTime.UtcNow;

        _context.Reports.Add(report);
        await _context.SaveChangesAsync(ct);

        return new GenerateReportResponse(report.Id, "GENERATED");
    }

    public async Task<ReportStatusDto?> GetStatusAsync(Guid reportId, CancellationToken ct = default)
    {
        var r = await _context.Reports.FindAsync([reportId], ct);
        return r == null ? null : new ReportStatusDto(r.Id.ToString(), "Finalisation", 100, r.Status.ToString());
    }

    public async Task<IReadOnlyList<ReportListItemDto>> GetHistoryAsync(string? category, string? status, CancellationToken ct = default)
    {
        var query = _context.Reports.AsQueryable();
        if (!string.IsNullOrEmpty(category)) query = query.Where(x => x.Category == category);
        if (!string.IsNullOrEmpty(status)) query = query.Where(x => x.Status.ToString() == status);

        var list = await query.OrderByDescending(x => x.CreatedAt).Take(100).ToListAsync(ct);
        return list.Select(r => new ReportListItemDto(
            r.Id, r.Name, r.Category, r.ReportType,
            r.PeriodStart.ToString("yyyy-MM-dd"), r.PeriodEnd.ToString("yyyy-MM-dd"),
            r.Author, r.Status.ToString(), r.CreatedAt)).ToList();
    }

    public async Task<byte[]?> GetPdfAsync(Guid reportId, CancellationToken ct = default)
    {
        var r = await _context.Reports.FindAsync([reportId], ct);
        return r?.PdfContent;
    }

    public async Task<byte[]?> GetExcelAsync(Guid reportId, CancellationToken ct = default)
    {
        var r = await _context.Reports.FindAsync([reportId], ct);
        if (r == null) return null;

        using var wb = new XLWorkbook();
        var ws = wb.AddWorksheet("Rapport");
        ws.Cell(1, 1).Value = "ShiftMaster - Rapport";
        ws.Cell(2, 1).Value = r.Name;
        ws.Cell(3, 1).Value = "Periode: " + r.PeriodStart.ToString("yyyy-MM-dd") + " - " + r.PeriodEnd.ToString("yyyy-MM-dd");
        ws.Cell(4, 1).Value = "Auteur: " + r.Author;

        using var ms = new MemoryStream();
        wb.SaveAs(ms, false);
        return ms.ToArray();
    }

    public async Task ArchiveAsync(Guid reportId, CancellationToken ct = default)
    {
        var r = await _context.Reports.FindAsync([reportId], ct);
        if (r != null)
        {
            r.Status = ReportStatus.ARCHIVED;
            await _context.SaveChangesAsync(ct);
        }
    }

    private static byte[] GenerateMockPdf(Report report)
    {
        var content = "ShiftMaster - Rapport\n" + report.Name + "\nCategorie: " + report.Category + "\nPeriode: " + report.PeriodStart.ToString("yyyy-MM-dd") + " - " + report.PeriodEnd.ToString("yyyy-MM-dd") + "\nAuteur: " + report.Author;
        return System.Text.Encoding.UTF8.GetBytes("%PDF-1.4\n" + content + "\n%%EOF");
    }
}
