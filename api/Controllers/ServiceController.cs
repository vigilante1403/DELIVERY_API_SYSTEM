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


namespace api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController:ControllerBase{
        private readonly IUnitOfWork _unitOfWork;
        public ServiceController(IUnitOfWork unitOfWork){
            _unitOfWork=unitOfWork;
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Service>>> GetServicesList(){
            IEnumerable<Service> list = await _unitOfWork.ServiceRepository.GetEntityByExpression(null,q=>q.OrderBy(e=>e.ServiceName),null);
            return Ok(list);
        }
        [HttpPost("new")]
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
        [HttpPut("edit")]
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

    [HttpGet("pricePerDistance/all")]
    public async Task<ActionResult<IEnumerable<PricePerDistance>>> GetPricePerDistanceList(){
            IEnumerable<PricePerDistance> list = await _unitOfWork.PricePerDistanceRepository.GetEntityByExpression(null,q=>q.OrderBy(e=>e.Id),null);
            return Ok(list);
    }

    }
    
}