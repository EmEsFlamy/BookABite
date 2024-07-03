using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.GlobalExceptionHandlers
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var path = $"{httpContext.Request.Method}{httpContext.Request.Path}";
            await httpContext.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Type = exception.GetType().Name,
                Title = "An unexpected error occured",
                Detail = exception.Message,
                Instance = $"{httpContext.Request.Method}{httpContext.Request.Path}"
            }, cancellationToken: cancellationToken);

            return true;
        }
    }
}
