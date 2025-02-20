using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

[Route("[controller]")]
[ApiController]
public class PlayersController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public PlayersController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet]
    public async Task<IActionResult> GetPlayers()
    {
        string apiUrl = "https://fantasy.premierleague.com/api/bootstrap-static/";
        
        try
        {
            var response = await _httpClient.GetStringAsync(apiUrl);
            var fantasyData = JsonConvert.DeserializeObject<FantasyResponse>(response);

            // Deserialize the teams list separately
            var teamsData = JsonConvert.DeserializeObject<dynamic>(response);
            var teamsList = JsonConvert.DeserializeObject<List<Team>>(teamsData.teams.ToString());

            // Create a dictionary for quick team lookup (teamId → teamName)
            var teamLookup = new Dictionary<int, string>();
            foreach (var team in teamsList)
            {
                teamLookup[team.Id] = team.Name;
            }

            // Assign team names to each player
            foreach (var player in fantasyData.Elements)
            {
                if (teamLookup.ContainsKey(player.TeamId))
                {
                    player.Team = teamLookup[player.TeamId];
                }
            }

            return Ok(fantasyData.Elements); // Return players with team names
        }
        catch (HttpRequestException )
        {
            return StatusCode(500, "Error fetching data from Fantasy Premier League API.");
        }
    }
}
