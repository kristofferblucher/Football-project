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

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWebApp",
        policy => policy
            .WithOrigins("http://localhost:5173", "https://football-project.onrender.com","https://football-frontend-kblu.onrender.com" ) 
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()); // Added to support cookies and credentials if needed
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply CORS policy before routing
app.UseCors("AllowWebApp");


app.UseRouting();

// Ensure authorization is applied if needed (optional)
app.UseAuthorization();

app.MapControllers();

app.Run();
