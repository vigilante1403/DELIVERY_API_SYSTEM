using System.Net;
using System.Text.Json;
using api.Exceptions;

namespace api.Middleware{
    public class ServerErrorExceptionMiddleware{
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _environment;
        public ServerErrorExceptionMiddleware(RequestDelegate next,IHostEnvironment environment){
            _next=next;
            _environment=environment;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (System.Exception ex) // handle server error
            {
                
                context.Response.ContentType="application/json";
                context.Response.StatusCode=(int) HttpStatusCode.InternalServerError;
                ErrorResponse response =
                _environment.IsDevelopment()?new ErrorResponse((int) HttpStatusCode.InternalServerError,ex.Message+". StackTrace:"+ex.StackTrace.ToString()):
                 new ErrorResponse((int) HttpStatusCode.InternalServerError);
                    var option = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase}; //using camel case
                    string json = JsonSerializer.Serialize(response,option);
                    await context.Response.WriteAsync(json);
            }
        }
    }
}