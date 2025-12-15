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
public ActionResult<Dog> CreateDog([FromBody] Dog newDog)
{
    _context.Dogs.Add(newDog);
    _context.SaveChanges();
    return CreatedAtAction(nameof(GetDog), new { id = newDog.Id }, newDog);
}

[HttpPut("{id}")]
public IActionResult UpdateDog(int id, [FromBody] Dog updatedDog)
{
    var existingDog = _context.Dogs.FirstOrDefault(d => d.Id == id);
    if (existingDog == null) return NotFound();

    existingDog.Name = updatedDog.Name;
    existingDog.PhotoUrl = updatedDog.PhotoUrl;
    existingDog.Description = updatedDog.Description;
    existingDog.Gender = updatedDog.Gender;

    _context.SaveChanges();
    return NoContent();
}



[HttpDelete("{id}")]
public IActionResult DeleteDog(int id)
{
    var dog = _context.Dogs.FirstOrDefault(d => d.Id == id);
    if (dog == null) return NotFound();

    var photos = _context.DogPhotos.Where(p => p.DogId == id);
    _context.DogPhotos.RemoveRange(photos);

    _context.Dogs.Remove(dog);
    _context.SaveChanges();

    return Ok(dog);
}


}
