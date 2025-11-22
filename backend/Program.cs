using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Use SQLite instead of InMemory
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

// Seed database on startup if empty
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    if (!db.Dogs.Any())
    {
        db.Dogs.AddRange(
            new Dog { Name = "Bella", PhotoUrl = "https://picsum.photos/id/237/500/400", Description = "Sweet and gentle girl who loves cuddles." },
            new Dog { Name = "Max", PhotoUrl = "https://picsum.photos/id/238/500/400", Description = "Energetic and playful." },
            new Dog { Name = "Luna", PhotoUrl = "https://picsum.photos/id/239/500/400", Description = "Calm and affectionate." }
        );
        db.SaveChanges();
    }
}


app.Run();
