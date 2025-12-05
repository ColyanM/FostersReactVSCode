using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Uses SQLite database 
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=Dogs.db"));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapControllers();

// Removed the seed data since I am beginning to store my own



app.Run();
