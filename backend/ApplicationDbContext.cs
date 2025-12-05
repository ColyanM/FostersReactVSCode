using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Dog> Dogs { get; set; }

    public DbSet<DogPhoto> DogPhotos { get; set; } = null!;

}
