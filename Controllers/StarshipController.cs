using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TestProject75.Models;

namespace TestProject75.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class StarshipController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        public StarshipController(IHttpClientFactory httpClientFactory) =>
       _httpClientFactory = httpClientFactory;

       readonly string BASE_URL = "https://swapi.dev/api";

        //grab all starships
        [HttpGet("get-all-starships")]
        public async Task<String> Get()
        {


            var client = _httpClientFactory.CreateClient();


            var response = await client.GetAsync(BASE_URL + "/starships");
            Console.WriteLine(response.Content);
            response.EnsureSuccessStatusCode();
            
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine( responseBody);    
            return responseBody;
        }

        //pass in page ID that we spliced off the end of the string
        //grab contents from that page data
        [HttpGet("get-next-page/{id:int}")]
        public async Task<String> Get(string id)
        {
            Console.WriteLine(id);

            var client = _httpClientFactory.CreateClient();


            var response = await client.GetAsync(BASE_URL+ "/starships/?page=" +id);
            Console.WriteLine(response.Content);
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            client.Dispose();
            Console.WriteLine(responseBody);
            return responseBody;
        }
    }
}