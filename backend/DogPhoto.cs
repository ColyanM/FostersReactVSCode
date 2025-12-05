using System.Text.Json.Serialization;

public class DogPhoto
{
    public int Id { get; set; }

    public int DogId { get; set; }

    public string Url { get; set; } = string.Empty;

    public string? Caption { get; set; }

    [JsonIgnore]          // Was needed so the backend would start
    public Dog? Dog { get; set; }
}
