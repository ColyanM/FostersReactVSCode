using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add the in-memory database and your DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("DogsDb"));

// Add controllers
builder.Services.AddControllers();

// ADD CORS HERE
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // React dev server
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowFrontend");

// Map controllers (activates /api/dogs)
app.MapControllers();

app.Run();
