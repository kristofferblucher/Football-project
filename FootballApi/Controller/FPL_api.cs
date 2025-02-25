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
        var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);
        request.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

        var response = await _httpClient.SendAsync(request);
        
        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            return StatusCode((int)response.StatusCode, $"Error fetching data: {response.StatusCode} - {errorContent}");
        }

        var responseString = await response.Content.ReadAsStringAsync();
        var fantasyData = JsonConvert.DeserializeObject<FantasyResponse>(responseString);

        return Ok(fantasyData.Elements);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Error fetching data from Fantasy Premier League API. {ex.Message}");
    }
}

}
