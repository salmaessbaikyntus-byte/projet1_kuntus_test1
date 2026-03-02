using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ShiftMaster.Employee.Service.API.Filters;

public class CorrelationIdFilter : IActionFilter
{
    public const string HeaderName = "X-Correlation-Id";

    public void OnActionExecuting(ActionExecutingContext context)
    {
        var correlationId = context.HttpContext.Request.Headers[HeaderName].FirstOrDefault()
            ?? context.HttpContext.TraceIdentifier ?? Guid.NewGuid().ToString();
        context.HttpContext.Response.Headers[HeaderName] = correlationId;
    }

    public void OnActionExecuted(ActionExecutedContext context) { }
}
