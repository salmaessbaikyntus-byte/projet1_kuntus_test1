using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ShiftMaster.Planning.Service.API.Filters;

public class CorrelationIdFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        var cid = context.HttpContext.Request.Headers["X-Correlation-Id"].FirstOrDefault() ?? Guid.NewGuid().ToString();
        context.HttpContext.Response.Headers["X-Correlation-Id"] = cid;
    }
    public void OnActionExecuted(ActionExecutedContext context) { }
}
