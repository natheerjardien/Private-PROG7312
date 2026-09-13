using BackendAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BackendAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Initializes the web application builder for Minimal APIs (Microsoft, 2026a)
            var builder = WebApplication.CreateBuilder(args);

            // Configures CORS to allow frontend communication (Microsoft, 2026b)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy =>
                    {
                        // Specifically targets the React frontends default port (Microsoft, 2026b)
                        policy.WithOrigins("http://localhost:3000", "http://localhost")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            builder.Services.AddAuthorization();

            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            //app.UseHttpsRedirection();

            // Applies the CORS policy to the HTTP request pipeline (Microsoft, 2026b)
            app.UseCors("AllowReactApp");

            app.UseAuthorization();

            // Defines a simple test Minimal API endpoint to verify connectivity (Microsoft, 2026a)
            app.MapGet("/", () => "Smart-X API Telemetry Gateway is running.");

            // Endpoint to test operator overloading on TelemetryPacket<T> using a request DTO
            app.MapPost("/api/telemetry/aggregate", (BackendAPI.Models.AggregateRequestDto<float> request) =>
            {
                try
                {
                    // Utilizes our overloaded '+' operator
                    var result = request.Meter1 + request.Meter2;
                    return Results.Ok(result);
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            });

            // Endpoint to test recursive deployment tree validation
            app.MapPost("/api/topology/validate", (DeploymentNode rootNode) =>
            {
                var errorLogs = new List<string>();
                bool isValid = DeploymentNode.ValidateNodeTree(rootNode, ref errorLogs);

                return Results.Ok(new { IsValid = isValid, Errors = errorLogs });
            });

            // Endpoint to send seeded jagged array telemetry data to the frontend (Microsoft, 2026a)
            app.MapGet("/api/telemetry/seed", () =>
            {
                var seededData = BackendAPI.Models.TelemetrySimulationService.GetSeededPackets();
                return Results.Ok(seededData);
            });

            app.Run();
        }
    }
}

/* Reference list:

   Microsoft, 2026a. Minimal APIs overview. [online] Available at: <https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-10.0> [Accessed 9 September 2026].
   
   Microsoft, 2026b. Enable Cross-Origin Requests (CORS) in ASP.NET Core. [online] Available at: <https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-10.0> [Accessed 9 September 2026].
*/