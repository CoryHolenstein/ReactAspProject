using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TestProject75.Models;

namespace TestProject75.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class HeroController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        public HeroController(IHttpClientFactory httpClientFactory) =>
       _httpClientFactory = httpClientFactory;

        [HttpGet("route")]
        public async Task<String> Get()
        {


            var client = _httpClientFactory.CreateClient();


            var response = await client.GetAsync("http://swapi.dev/api/people/1/");
            Console.WriteLine(response.Content);
            response.EnsureSuccessStatusCode();
            
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine( responseBody);    
            return responseBody;
        }
    }
}