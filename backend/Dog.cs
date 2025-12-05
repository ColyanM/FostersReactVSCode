using System.Collections.Generic;

public class Dog
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string PhotoUrl { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Gender { get; set; } = null!;

    public List<DogPhoto> Photos { get; set; } = new();
}
