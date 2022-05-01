using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vonage.Request;
using Vonage;
using Vonage.Voice;
using Vonage.Voice.Nccos;
using Vonage.Voice.Nccos.Endpoints;
using Vonage;
using Vonage.Request;
using Endpoint = Vonage.Voice.Nccos.Endpoints.Endpoint;

namespace TestProject75.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VonageController : ControllerBase
    {
        private string[] EVENT_URL;

        [HttpGet("text")]
        public async Task<String> TextPhone()
        {
            var credentials = Credentials.FromApiKeyAndSecret(
                 "6fb5840a",
               "VFkVZFodUHL2w1dg"
             );

            var VonageClient = new VonageClient(credentials);
            var response = VonageClient.SmsClient.SendAnSms(new Vonage.Messaging.SendSmsRequest()
            {
                To = "",
                From = "",
                Text = "nice watch, run it, text in group chat if you got this"
            });
               
                 Console.WriteLine(response);
               string responseBody = response.ToString();
               Console.WriteLine( responseBody);  

            return responseBody;
        }

        [HttpGet("call")]
        public async Task<String> CallPhone()
        {
            var creds = Credentials.FromAppIdAndPrivateKeyPath("APPLICATION_ID", "VONAGE_PRIVATE_KEY_PATH");
            var client = new VonageClient(creds);
            var toEndpoint = new PhoneEndpoint() { Number = "" };
            var fromEndpoint = new PhoneEndpoint() { Number = "" };
            var extraText = "";
            for (var i = 0; i < 50; i++)
                extraText += $"{i} ";
            var talkAction = new TalkAction() { Text = "This is a text to speech call from Vonage " + extraText };
            var ncco = new Ncco(talkAction);

            var command = new CallCommand() { To = new Endpoint[] { toEndpoint }, From = fromEndpoint, Ncco = ncco };
            var response = client.VoiceClient.CreateCall(command);
            string responseBody = response.ToString();
            return responseBody;
        }
    }
}