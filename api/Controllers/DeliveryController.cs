using System.Text.Json;
using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class DeliveryController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
      
        public DeliveryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        
        }

    

[HttpGet("delivery-agent")]

        public async Task<ActionResult<IEnumerable<DeliveryAgent>>> GetAllDeliveryAgents()
        {
            IEnumerable<DeliveryAgent> agents = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(null, null, null);

            return Ok(agents);
        }
        [HttpGet("delivery-agent/find/{id}")]
        public async Task<ActionResult<DeliveryAgent>> GetDeliveryAgent([FromRoute] string id)
        {
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(400, "Invalid id"));
            }
            var deliveryAgent = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(e => e.Id == Id, null, null);
            if (!deliveryAgent.Any())
            {
                return BadRequest(new ErrorResponse(404, "Doesn't exist delivery agent id: "+ id));
            }
            return Ok(deliveryAgent.FirstOrDefault());
        }

        [HttpPost("delivery-agent")]

        public async Task<ActionResult> AddDeliveryAgent(DeliveryAgentDTO delivery)
        {
            //validate
            var name = delivery.AgentName;
            var existList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(d => d.AgentName == name, null, null);
            var exist = existList.Any();
            if (exist)
            {
                return BadRequest(new ErrorResponse(400, "Existed"));
            }
            DeliveryAgent d = new DeliveryAgent
            {
                AgentName = delivery.AgentName,
                VehicleNumber = delivery.VehicleNumber,
                AgentContactNumber = delivery.AgentContactNumber,
                StartWorkingTime =delivery.StartWorkingTime,    
                EndWorkingTime=delivery.EndWorkingTime,
                PickUpTimeInCity=delivery.PickUpTimeInCity,
                PickUpTimeInOtherPlace=delivery.PickUpTimeInOtherPlace,
                PickUpTimeForSpecialOrder=delivery.PickUpTimeForSpecialOrder,
                DayMayDelay=delivery.DayMayDelay,
                RequiredTimeForOrderToPickUp=delivery.RequiredTimeForOrderToPickUp,
                Charges=delivery.Charges,
                MaxFreeWeight=delivery.MaxFreeWeight
            };

            try
            {
                _unitOfWork.DeliveryAgentRepository.Add(d);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }
            return Ok("Add delivery agent success");

        }
        [HttpPut("delivery-agent")]
        public async Task<ActionResult> EditDeliveryAgent(DeliveryAgentDTO delivery)
        {
            var id = delivery.Id;
            var existList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(r => r.Id == id, null, null);
            var exist = existList.Any();
            if (!exist)
            {
                return BadRequest(new ErrorResponse(404, "delivery agent invalid||not exist"));
            }
            DeliveryAgent d = existList.FirstOrDefault();
            var validateList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(d => d.Id != id && d.AgentName == delivery.AgentName, null, null);
            if (validateList.Any())
            {
                return BadRequest(new ErrorResponse(400, "delivery agent name existed!"));
            }

            d.AgentName = delivery.AgentName;
            d.VehicleNumber = delivery.VehicleNumber;
            d.AgentContactNumber = delivery.AgentContactNumber;
            try
            {
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }

            return Ok("Edit delivery agent success");

        }

        [HttpDelete("delivery-agent")]
        public async Task<ActionResult> DeleteDeliveryAgent(string id)
        {
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(400));
            }
            var deliveryAgent = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(e => e.Id == Id, null, null);
            if (!deliveryAgent.Any())
            {
                return BadRequest(new ErrorResponse(404, "Doesn't exist delivery agent id: " + id));
            }
            try
            {
                _unitOfWork.DeliveryStatusRepository.DeleteById(Id);
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }
            return Ok("Delete delivery agent success");

        }



        [HttpGet("delivery-status")]

        public async Task<ActionResult<IEnumerable<DeliveryStatus>>> GetAllDeliveryStatus()
        {
            IEnumerable<DeliveryStatus> deliveryStatus = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(null, null, null);

            return Ok(deliveryStatus);
        }
        [HttpGet("delivery-status/find/{id}")]
        public async Task<ActionResult<DeliveryStatus>> GetDeliveryStatus([FromRoute] string id)
        {
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(400, "Invalid id"));
            }
            var deliveryStatus = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(e => e.Id == Id, null, null);
            if (!deliveryStatus.Any())
            {
                return BadRequest(new ErrorResponse(404, "Doesn't exist delivery status id: " + id));
            }
            return Ok(deliveryStatus.FirstOrDefault());
        }

        [HttpPost("delivery-status")]

        public async Task<ActionResult> AddDeliveryStatus(DeliveryStatusDTO delivery)
        {
            //validate
            var name = delivery.StatusName;
            var existList = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(d => d.StatusName == name, null, null);
            var exist = existList.Any();
            if (exist)
            {
                return BadRequest(new ErrorResponse(400, "Existed"));
            }
            DeliveryStatus d = new DeliveryStatus
            {
                StatusName = delivery.StatusName,
               

            };

            try
            {
                _unitOfWork.DeliveryStatusRepository.Add(d);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }
            return Ok("Add delivery status success");

        }
        [HttpPut("delivery-status")]
        public async Task<ActionResult> EditDeliveryStatus(DeliveryStatusDTO delivery)
        {
            var id = delivery.Id;
            var existList = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(r => r.Id == id, null, null);
            var exist = existList.Any();
            if (!exist)
            {
                return BadRequest(new ErrorResponse(404, "delivery status invalid||not exist"));
            }
            DeliveryStatus d = existList.FirstOrDefault();
            var validateList = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(d => d.Id != id && d.StatusName == delivery.StatusName, null, null);
            if (validateList.Any())
            {
                return BadRequest(new ErrorResponse(400, "delivery status name existed!"));
            }

            d.StatusName = delivery.StatusName;
           
            try
            {
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }

            return Ok("Edit delivery status success");

        }

        [HttpDelete("delivery-status")]
        public async Task<ActionResult> DeleteDeliveryStatus(string id)
        {
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(400));
            }
            var deliveryStatus = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(e => e.Id == Id, null, null);
            if (!deliveryStatus.Any())
            {
                return BadRequest(new ErrorResponse(404, "Doesn't exist delivery status id: " + id));
            }
            try
            {
                _unitOfWork.DeliveryStatusRepository.DeleteById(Id);
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }
            return Ok("Delete delivery status success");

        }
        [HttpPost("delivery")]
        public async Task<ActionResult> AddNewDelivery([FromBody] SubmitDelivery delivery){
            var payment = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.Id==delivery.OrderId,null,"OrderPayment,Service,Customer,PricePerDistance,DeliveryAgent");
            var paymentId = payment.FirstOrDefault().OrderPaymentId;
            if(paymentId==null){
                return BadRequest(new ErrorResponse(500));
            }
            
            var combo = await _unitOfWork.PricePerDistanceRepository.GetEntityByExpression(e=>e.Id==payment.FirstOrDefault().PricePerDistanceId,null,null);
            var expectedDays = combo.FirstOrDefault().DeliveryTime;
            string[] days = expectedDays.Split("-");
            var sameState = combo.FirstOrDefault().Route.Contains("Same");
            var responseAgentList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(w=>w.Id==payment.FirstOrDefault().DeliveryAgentId,null,null);
            var responseAgent = responseAgentList.FirstOrDefault();
            var senderAddress=payment.FirstOrDefault().SenderInfo;
            var contactAddress=payment.FirstOrDefault().ContactAddress;
            var info = JsonSerializer.Deserialize<InfoCombine>(senderAddress);
            var info2=JsonSerializer.Deserialize<InfoCombine>(contactAddress);
            var format = "HH:mm:ss";
            var timeCreated = payment.FirstOrDefault().OrderDate;
            TimeSpan timeOfDay = timeCreated.TimeOfDay;
            TimeOnly time1 = TimeOnly.FromTimeSpan(timeOfDay);
            var timeRequired = responseAgent.RequiredTimeForOrderToPickUp;
            DateTime pickUp =  DateTime.Now;
            var deliveryDate = DateTime.Now;
            if(timeRequired==null||responseAgent.PickUpTimeForSpecialOrder!=0){
                //case special delivery
                pickUp=pickUp.AddHours((double)responseAgent.PickUpTimeForSpecialOrder);
                if(info.Address.Contains("City")&&info2.Address.Contains("City")){
                    deliveryDate=pickUp.AddHours(3);
                }else{
                    if(sameState){
                        deliveryDate=pickUp.AddHours(12);
                    }else{
                        deliveryDate=pickUp.AddDays(2);
                    }
                }
            }else{
                 TimeOnly time2 = TimeOnly.ParseExact(timeRequired, format);
                    if(info.Address.Contains("City")){
                        if(time1<=time2){//th tao don truoc thoi gian yeu cau
                        pickUp = pickUp.Date.Add(new TimeSpan(18,0,0));
                       
                        
                        }else{
                            pickUp=pickUp.AddDays(1);
                            pickUp=pickUp.Date.Add(new TimeSpan(7,0,0));
                        }
                      
                //xet th thowi gian tao don    //nguoi gui o tp, xet TH pick up o tp->anh huong toi pick up date time
                     }else{
                        pickUp=pickUp.Date.Add(new TimeSpan(8,0,0));
                     }
                        int dayAdd = int.Parse(days[0]);
                        deliveryDate=pickUp.AddDays(dayAdd);

            }
           
            
    
            var deliveryDays = payment.FirstOrDefault().Service.DaysAdd; //day


            Delivery d = new Delivery{
                OrderId=delivery.OrderId,
                DeliveryAgentId=responseAgent.Id,
                OrderPaymentId= (int)paymentId,
                DeliveryStatusId=1,
                DeliveryDate=deliveryDate,
                PickUpDateTime=pickUp
            };
            try
            {
                _unitOfWork.DeliveryRepository.Add(d);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok("New delivery ready!");
        }
        [HttpGet("update-delivery-status/{customerId}")]
        public async Task UpdateStatusOfDelivery([FromRoute] string customerId)
        {
            var processingList = await _unitOfWork.OrderRepository.GetEntityByExpression(
                e=>e.CustomerId==customerId&&(e.OrderStatusId==1||e.OrderStatusId==2)&&e.OrderPayment.OrderPaymentStatusId==1,null,"OrderPayment,Service,Customer,PricePerDistance,DeliveryAgent"
            );
            var deliveryList = await _unitOfWork.DeliveryRepository.GetEntityByExpression(null,null,null);
           var orderIdList = processingList.Select(r=>r.Id);
           var processDeliveryList = new List<Delivery>();
           foreach(var id in orderIdList){
            var delivery = deliveryList.Where(e=>e.OrderId==id).FirstOrDefault();
            processDeliveryList.Add(delivery);
           }
           var now = DateTime.Now;
           foreach(var process in processDeliveryList){
            var order = processingList.Where(x=>x.Id==process.OrderId).FirstOrDefault();
                if(now>=process.PickUpDateTime&&now<process.DeliveryDate){
                    process.DeliveryStatusId=2;
                    order.OrderStatusId=2;
                }else if(now>process.DeliveryDate){
                    process.DeliveryStatusId=3;
                    order.OrderStatusId=3;
                }
           }
           _unitOfWork.Save();

        }
    }
    
}