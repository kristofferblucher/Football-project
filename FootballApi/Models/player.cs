using Newtonsoft.Json;

public class FantasyResponse
{
    public List<Player> Elements { get; set; }
}

public class Player
{
    public int Id { get; set; }
    [JsonProperty("first_name")]
    public string FirstName { get; set; }
    [JsonProperty("second_name")]
    public string SecondName { get; set; }
    [JsonProperty("now_cost")]
    public int Price { get; set; }
    [JsonProperty("total_points")]
    public int TotalPoints { get; set; }
    [JsonProperty("goals_scored")]
    public int Goals { get; set; }
    [JsonProperty("assists")]
    public int Assists { get; set; }

    [JsonProperty("photo")]
    public string Photo { get; set; }


    [JsonProperty("team")]
    public int TeamId { get; set; }  // Maps to team ID, which needs to be converted to a name
    public string Team { get; set; } // The actual team name (to be populated)
}
