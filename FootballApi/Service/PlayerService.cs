using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

public class PlayerService
{
    private readonly HttpClient _httpClient;

    public PlayerService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

   public async Task<List<Player>> GetPlayersAsync(string url)
{
    try
    {
        var response = await _httpClient.GetAsync(url);
        if (response.IsSuccessStatusCode)
        {
            var jsonString = await response.Content.ReadAsStringAsync();

            // Deserialize the full response object first
            var fantasyData = JsonConvert.DeserializeObject<FantasyResponse>(jsonString);

            // Return only the player list (elements)
            return fantasyData.Elements ?? new List<Player>();
        }
        else
        {
            Console.WriteLine($"Error fetching data: {response.StatusCode}");
            return new List<Player>();
        }
    }
    catch (HttpRequestException e)
    {
        Console.WriteLine($"Error: {e.Message}");
        return new List<Player>();
    }
}

}
