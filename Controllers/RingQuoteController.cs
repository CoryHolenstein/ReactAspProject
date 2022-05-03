using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TestProject75.Models;
using System.Net.Http.Headers;

namespace TestProject75.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RingQuoteController : ControllerBase
    {
        readonly  String BASE_URL = "https://the-one-api.dev/v2";
        readonly String API_KEY = "LQpnnPSpRCVghgnitA2j";
  

   
        [HttpGet("route")]
        public async Task<String> Get()
        {

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + API_KEY);

            var response = await client.GetAsync(BASE_URL + "/quote/");
            Console.WriteLine(response.Content);
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine(responseBody);
            return responseBody;
        }
    }
}
