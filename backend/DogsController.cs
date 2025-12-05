using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DogsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DogsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/dogs
    [HttpGet]
    public ActionResult<List<Dog>> GetAllDogs()
    {
        return _context.Dogs.ToList();
    }

    // GET: api/dogs/5
    [HttpGet("{id}")]
    public ActionResult<Dog> GetDog(int id)
    {
        var dog = _context.Dogs.Find(id);

        if (dog == null)
            return NotFound();

        return dog;
    }

    // POST: api/dogs
    [HttpPost]
    public ActionResult<Dog> CreateDog(CreateDogModel model)
    {
        // Convert incoming model into a dog object
        var newDog = new Dog
        {
            Name = model.Name,
            PhotoUrl = model.PhotoUrl,
            Description = model.Description
        };

        _context.Dogs.Add(newDog);
        _context.SaveChanges();

        // Return the created dog with its new ID as a primary key
        return CreatedAtAction(nameof(GetDog), new { id = newDog.Id }, newDog);
    }

}
