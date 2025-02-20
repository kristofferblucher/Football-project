using Newtonsoft.Json;

public class Team
{
    public int Id { get; set; }
    [JsonProperty("name")]
    public string Name { get; set; }
}
