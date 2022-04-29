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

        [HttpGet("route")]
        public async Task<String> Get()
        {

       
           HttpClient client = new HttpClient();
           
               
            var response = await client.GetAsync("http://swapi.dev/api/people/1/");
            Console.WriteLine(response.Content);
            response.EnsureSuccessStatusCode();
            
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine( responseBody);    
            return responseBody;
        }
    }
}
/*
 * 
 *    [HttpGet]
        public IEnumerable<Hero> Get()
        {

            Hero hero = new Hero();
            hero.Name = "fsadfdsa";
            Console.WriteLine(hero.Name);
            return (IEnumerable<Hero>)hero;
        }
 * 
 * */

/*
 * 
 * 
 *   public async Task<Hero[]> Get()
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("https://swapi.dev/api/people/");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);    
            Hero[] heros = new Hero[100];
            heros[0].Name = "fsadfdsa";
            Console.WriteLine(heros[0].Name);
            Console.WriteLine(heros);
            return heros;
        }
 * 
 * */