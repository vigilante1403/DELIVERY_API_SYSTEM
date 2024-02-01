using System.Net;
using System.Net.Mail;
using api.DAl;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Nexmo.Api.Voice.EventWebhooks;

namespace api.Data{
    public class SendEmailToCustomerSystem{
        private readonly IUnitOfWork _unitOfWork;
        public SendEmailToCustomerSystem(IUnitOfWork unitOfWork){
            _unitOfWork=unitOfWork;
        }
        public async Task Seed(){
            var processingList = await _unitOfWork.OrderRepository.GetEntityByExpression(
                e=>(e.OrderStatusId==1||e.OrderStatusId==2)&&e.OrderPayment.OrderPaymentStatusId==1,null,"OrderPayment,Service,Customer,PricePerDistance,DeliveryAgent"
            );
            var deliveryList = await _unitOfWork.DeliveryRepository.GetEntityByExpression(null,null,null);
           var orderIdList = processingList.Select(r=>r.Id);
           var processDeliveryList = new List<Delivery>();
           foreach(var id in orderIdList){
            var delivery = deliveryList.Where(e=>e.OrderId==id).FirstOrDefault();
            processDeliveryList.Add(delivery);
           }
           var now = DateTime.Now;
           Console.WriteLine(now);
           foreach(var process in processDeliveryList){
            var order = processingList.Where(x=>x.Id==process.OrderId).FirstOrDefault();
                if(now>=process.PickUpDateTime&&now<process.DeliveryDate){
                    Console.WriteLine("true");
                    try
                    {
                        var temp = deliveryList.Where(e=>e.Id==process.Id).FirstOrDefault();
                        if(!temp.CodeLocation.HasValue&&temp.ZipCodeEnd.HasValue&&temp.ZipCodeStart.HasValue){
                            temp.CodeLocation=temp.ZipCodeStart;
                        }
                         temp.DeliveryStatusId=2;
                    order.OrderStatusId=2;
                    _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                       Console.WriteLine("Error");
                    }
                   
                }else if(now>process.DeliveryDate){
                    try
                    {
                        var temp = deliveryList.Where(e=>e.Id==process.Id).FirstOrDefault();
                        if(temp.ZipCodeEnd.HasValue&&temp.ZipCodeStart.HasValue){
                            temp.CodeLocation=temp.ZipCodeEnd.Value;
                        }
                        
                         temp.DeliveryStatusId=3;
                    order.OrderStatusId=3;
                    _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                        Console.WriteLine("Error!!!!");
                    }
                   
                }
           }
          
        }
        public async Task SendOrderEmail(){
       
        var deliveries = await _unitOfWork.DeliveryRepository.GetEntityByExpression(x=>(x.EmailDeliveryReached==null||x.EmailDeliveryStart==null),null,"Order,DeliveryAgent,OrderPayment,DeliveryStatus");
        if(!deliveries.Any()){
           Console.WriteLine("No delivery to send email");
           return;
        }
        var body="";
        var title="";
        var now=DateTime.Now;
        var caseChoose =0;
        foreach(var delivery in deliveries){
            
            TimeSpan diff = now-delivery.PickUpDateTime;
            TimeSpan diff2 = now-delivery.DeliveryDate;
            if(now.Date==delivery.PickUpDateTime.Date&&diff.TotalMinutes<=20&&diff.TotalMinutes>0){
                title="Delivery Start Announce";
                body = $" Dear customer,\n Your order No.{delivery.OrderId} has been collected and start to deliver\n Have a good day\n Tars Team";
                caseChoose=1;
            }
            else if(now.Date==delivery.DeliveryDate.Date&&diff2.TotalMinutes<=20&&diff2.TotalMinutes>0){
                title="Delivery Complete Announce";
                body = $" Dear customer,\n Your order No.{delivery.OrderId} has reached your recipient\n Thank you for using our service\n Have a good day\n Tars Team";
                caseChoose=2;
            }
            if(title!=""&&body!=""){
                var sendResult = await SendEmailAsync("new.vytruong.1812@gmail.com",title,body);
            if(sendResult==true){
                Console.WriteLine("Send Email successfully!");
                if(caseChoose==1){
                    delivery.EmailDeliveryStart=true;
                    _unitOfWork.Save();
                }
                if(caseChoose==2){
                    delivery.EmailDeliveryReached=true;
                    _unitOfWork.Save();
                }
            }else{
                Console.WriteLine("Send Email failed");
            }
            }
            
        }
        return;
         
        
        

    }
    public static async Task<bool> SendEmailAsync(string userEmail,string title,string body)
    {
        
        try
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("new.vytruong.1812@gmail.com", "erya gvus chag rvok"),
                EnableSsl = true,
            };
            
            var mailMessage = new MailMessage
            {
                From = new MailAddress("new.vytruong.1812@gmail.com"),
                Subject = title,
                Body = body,
                IsBodyHtml = false,
            };

            mailMessage.To.Add(userEmail);

            await smtpClient.SendMailAsync(mailMessage);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            return false;
        }
    }
    public static async Task TotalSteps(IUnitOfWork unitOfWork){
        SendEmailToCustomerSystem system = new SendEmailToCustomerSystem(unitOfWork);
       await system.Seed();
       await system.SendOrderEmail();
    }
    }
}