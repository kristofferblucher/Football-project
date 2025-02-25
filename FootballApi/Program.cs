using Microsoft.AspNetCore.Builder;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddControllers();
builder.Services.AddHttpClient<PlayerService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWebApp",
        policy => policy
            .WithOrigins("https://football-frontend-kblu.onrender.com", "http://localhost:5173") // Frontend URLs
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowWebApp"); // Apply CORS before routing
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
