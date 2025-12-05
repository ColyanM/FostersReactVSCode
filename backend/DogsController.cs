using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class DogsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DogsController(ApplicationDbContext context)
    {
        _context = context;
    }


    
    [HttpGet("{id}")]
    public ActionResult<Dog> GetDog(int id)
    {
        var dog = _context.Dogs
            .Include(d => d.Photos)
            .FirstOrDefault(d => d.Id == id);

        if (dog == null)
            return NotFound();

        return dog;
    }


    [HttpGet]
    public ActionResult<IEnumerable<Dog>> GetDogs()
    {
        return _context.Dogs.ToList();
    }



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
