using System.Text.Json.Serialization;

namespace TestProject75.Models
{
    public class Hero
    {

        [JsonPropertyName("name")]
        public string Name { get; set; }

    }
}
