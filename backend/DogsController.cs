using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DogsController : ControllerBase
{
    // Temporary in-memory list so you can test immediately
    private static readonly List<Dog> Dogs = new()
    {
        new Dog { Id = 1, Name = "Bella", PhotoUrl = "https://placekitten.com/300/300" },
        new Dog { Id = 2, Name = "Max", PhotoUrl = "https://placekitten.com/301/300" },
        new Dog { Id = 3, Name = "Luna", PhotoUrl = "https://placekitten.com/300/301" }
    };

    // GET /api/dogs
    [HttpGet]
    public ActionResult<List<Dog>> GetAllDogs()
    {
        return Dogs;
    }

    // GET /api/dogs/1
    [HttpGet("{id}")]
    public ActionResult<Dog> GetDog(int id)
    {
        var dog = Dogs.FirstOrDefault(d => d.Id == id);

        if (dog == null)
            return NotFound();

        return dog;
    }
}
