using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShiftMaster.Reporting.Service.Application.DTOs;
using ShiftMaster.Reporting.Service.Application.Interfaces;

namespace ShiftMaster.Reporting.Service.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReportingController : ControllerBase
{
    private readonly IReportingService _service;

    public ReportingController(IReportingService service) => _service = service;

    private string GetAuthor() => User.FindFirst(ClaimTypes.Name)?.Value ?? "Unknown";

    [HttpPost("generate")]
    [ProducesResponseType(typeof(GenerateReportResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Generate([FromBody] GenerateReportRequest request, CancellationToken ct)
    {
        var result = await _service.GenerateAsync(request, GetAuthor(), ct);
        return Ok(result);
    }

    [HttpGet("status/{id:guid}")]
    [ProducesResponseType(typeof(ReportStatusDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Status(Guid id, CancellationToken ct)
    {
        var s = await _service.GetStatusAsync(id, ct);
        return s == null ? NotFound() : Ok(s);
    }

    [HttpGet("history")]
    [ProducesResponseType(typeof(IReadOnlyList<ReportListItemDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> History([FromQuery] string? category, [FromQuery] string? status, CancellationToken ct)
    {
        return Ok(await _service.GetHistoryAsync(category, status, ct));
    }

    [HttpGet("download/{id:guid}")]
    [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Download(Guid id, [FromQuery] string format = "pdf", CancellationToken ct = default)
    {
        if (format.Equals("excel", StringComparison.OrdinalIgnoreCase))
        {
            var excel = await _service.GetExcelAsync(id, ct);
            if (excel == null) return NotFound();
            return File(excel, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"report-{id}.xlsx");
        }

        var pdf = await _service.GetPdfAsync(id, ct);
        if (pdf == null) return NotFound();
        return File(pdf, "application/pdf", $"report-{id}.pdf");
    }

    [HttpPatch("archive/{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Archive(Guid id, CancellationToken ct)
    {
        await _service.ArchiveAsync(id, ct);
        return NoContent();
    }
}
