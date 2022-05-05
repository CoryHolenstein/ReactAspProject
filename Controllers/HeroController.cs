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

       readonly string BASE_URL = "https://swapi.dev/api";

        //get all heros
        [HttpGet("get-all-heros")]
        public async Task<String> Get()
        {


            var client = _httpClientFactory.CreateClient();


            var response = await client.GetAsync(BASE_URL + "/people");
            Console.WriteLine(response.Content);
            response.EnsureSuccessStatusCode();
            
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine( responseBody);    
            return responseBody;
        }
        //call hero page with id we spliced off

        [HttpGet("get-next-page/{id:int}")]
        public async Task<String> Get(string id)
        {
            Console.WriteLine(id);

            var client = _httpClientFactory.CreateClient();


            var response = await client.GetAsync(BASE_URL+ "/people/?page=" +id);
            Console.WriteLine(response.Content);
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            client.Dispose();
            Console.WriteLine(responseBody);
            return responseBody;
        }
    }
}