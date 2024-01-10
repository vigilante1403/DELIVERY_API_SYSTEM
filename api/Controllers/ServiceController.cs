using System.Net;
using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Nexmo.Api;
using Nexmo.Api.Request;
using Nexmo;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Rest.Chat.V2;
using Twilio.Rest.Verify.V2.Service;
using Twilio.Types;
using Nexmo.Api.Messaging;
using Vonage;
using Vonage.Request;

namespace api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController:ControllerBase{
        private readonly IUnitOfWork _unitOfWork;
        public ServiceController(IUnitOfWork unitOfWork){
            _unitOfWork=unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetServicesList(){
            IEnumerable<Service> list = await _unitOfWork.ServiceRepository.GetEntityByExpression(null,q=>q.OrderBy(e=>e.ServiceName),null);
            return Ok(list);
        }
        [HttpPost]
        public async Task<ActionResult> AddService(ServiceDTO service){
            //validate
            var name = service.ServiceName;
            var existList = await _unitOfWork.ServiceRepository.GetEntityByExpression(d=>d.ServiceName==name,null,null);
            var exist = existList.Any();
            if(exist){
                return BadRequest(new ErrorResponse(400,"Existed"));
            }
            Service s = new Service{
                ServiceName=service.ServiceName,
                PrePaid=service.PrePaid,
                Collect=service.Collect,
                Price=service.Price,
                DaysAdd=service.DaysAdd
            };  
             
             try
             {
                _unitOfWork.ServiceRepository.Add(s);
             }
             catch (System.Exception)
             {
                
               return BadRequest(new ErrorResponse(500));
             }
             return Ok();

        }
        [HttpPut]
        public async Task<ActionResult> EditService(ServiceDTO service){
            var id = service.Id;
            var existList= await _unitOfWork.ServiceRepository.GetEntityByExpression(r=>r.Id==id,null,null);
            var exist = existList.Any();
            if(!exist){
                return BadRequest(new ErrorResponse(400,"service invalid||not exist"));
            }
            Service s = existList.FirstOrDefault();
            var validateList = await _unitOfWork.ServiceRepository.GetEntityByExpression(e=>e.Id!=id&&e.ServiceName==service.ServiceName,null,null);
            if(validateList.Any()){
                return BadRequest(new ErrorResponse(400,"Service name existed!"));
            }
            if(service.Price<=0||service.DaysAdd<=0){
                return BadRequest(new ErrorResponse(400,"Invalid numeric data!"));
            }
            s.ServiceName=service.ServiceName;
            s.Price = service.Price;
            s.PrePaid=service.PrePaid;
            s.Collect=service.Collect;
            s.DaysAdd=service.DaysAdd;
            try
            {
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            
            return Ok();

        }
        [HttpGet("find/{id}")]
        public async Task<ActionResult<Service>> GetService([FromRoute] string id){
            int Id=0;
            try
            {
                  Id = int.Parse(id);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400,"Invalid id"));
            }
           var serviceList = await _unitOfWork.ServiceRepository.GetEntityByExpression(e=>e.Id==Id,null,null);
           if(!serviceList.Any()){
            return BadRequest(new ErrorResponse(400,"Doesn't exist service id: ${id}"));
           }
            return Ok(serviceList.FirstOrDefault());
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteService([FromQuery]string id){
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400));
            }
            var serviceList = await _unitOfWork.ServiceRepository.GetEntityByExpression(e=>e.Id==Id,null,null);
           if(!serviceList.Any()){
            return BadRequest(new ErrorResponse(400,"Doesn't exist service id: ${id}"));
           }
           try
           {
            _unitOfWork.ServiceRepository.DeleteById(Id);
            _unitOfWork.Save();
           }
           catch (System.Exception)
           {
            
            return BadRequest(new ErrorResponse(500));
           }
           return Ok();
           
        }
        //crud service 
        [HttpPost("test-message")]
       public async Task TestMessage()
    {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure

        string accountSid = "ACffe5d11a9c4824ecbc344f7568cf2c7a";
        string authToken = "bf27798ddfd076e9e807726fa16e1cf9";
        string verifyServiceSid = "VAf1dca0ee08da3182678265add41e1fe7";

        TwilioClient.Init(accountSid, authToken);

        try
{
    var message = MessageResource.Create(
        from: new PhoneNumber("+18887660223"),   // Your Twilio phone number
        body: "Hello, this is a test message!",
        to: new PhoneNumber("+84784991812")                // Recipient's phone number in E.164 format
    );

    Console.WriteLine($"Message SID: {message.Sid}");
}
catch (Twilio.Exceptions.ApiException ex)
{
    Console.WriteLine($"Twilio API Exception: {ex.Message}");
    // Handle the exception as needed
}   
    }
    [HttpGet("test-nexmo")]
   public async Task SendNexmoSms()
    {
        // Replace with your Nexmo API key and secret
       var credentials = Vonage.Request.Credentials.FromApiKeyAndSecret(
    "3834b1df",
    "c7pfYAW9H2of1B9v"
    );

var VonageClient = new VonageClient(credentials);
var response = VonageClient.SmsClient.SendAnSms(new Vonage.Messaging.SendSmsRequest()
{
    To = "84784991812",
    From = "Vonage APIs",
    Text = "A text message sent using the Vonage SMS API"
});
    }
   public async Task SendTelegramMessage(string botToken, long chatId, string message="hihi")
    {
        using (HttpClient client = new HttpClient())
        {
            string apiUrl = $"https://api.telegram.org/bot{botToken}/sendMessage";

            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("chat_id", chatId.ToString()),
                new KeyValuePair<string, string>("text", message)
            });

            var response = await client.PostAsync(apiUrl, content);

            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Message sent successfully!");
            }
            else
            {
                Console.WriteLine($"Failed to send message. Status code: {response.StatusCode}");
            }
        }
    }

   public async Task<string> GenerateRandomOtp()
    {
        // Replace this with your OTP generation logic
        // For example, you can use a library like RandomNumberGenerator to generate a random numeric OTP.
        Random random = new Random();
        return random.Next(1000, 9999).ToString();
    }
    [HttpGet("send-telegram-code/{id}")]
    public async Task<ActionResult> SendOTP([FromRoute] string id){
         string botToken = "6364574574:AAEAldnEyYDRHjV1H6VLqsXLiPk-EydmbRU";
         long chatId = 6901718656;
         try
         {
            chatId=long.Parse(id);
         }
         catch (System.Exception)
         {
            
            return BadRequest(new ErrorResponse(400));
         }
         // Replace with the recipient's chat ID

        string otp = await GenerateRandomOtp(); // Replace this with your OTP generation logic

        string message = $"Your OTP is: {otp}";

        await SendTelegramMessage(botToken, chatId, message);
        return Ok("send OTP success");
    }

    }
}