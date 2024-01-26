using System.Text.Json;
using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class DeliveryController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
      
        public DeliveryController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper=mapper;
        
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
            var orderDetails = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(w=>w.OrderId==delivery.OrderId,null,"Parcel,Order");
            var parcelsids = orderDetails.Where(x=>x.ParcelId.HasValue).Select(w=>w.ParcelId);
            var parcelList = await _unitOfWork.ParcelRepository.GetEntityByExpression(p=>parcelsids.Contains(p.Id),null,"Customer");
            var totalAmount = parcelList.Where(w=>w.TotalPriceAmountAssume.HasValue).Sum(w=>w.TotalPriceAmountAssume);
            var orderPayments = await _unitOfWork.OrderPaymentRepository.GetEntityByExpression(w=>w.Id==paymentId,null,"OrderPaymentStatus");
            var orderPayment = orderPayments.FirstOrDefault();
            //double check
            var deliveryExisted = await _unitOfWork.DeliveryRepository.GetEntityByExpression(t=>t.OrderId==delivery.OrderId,null,null);
            if(deliveryExisted.Any()){
                return BadRequest(new ErrorResponse(400,"Existed this delivery"));
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
                PickUpDateTime=pickUp,
                ZipCodeStart=delivery.ZipCodeStart,
                ZipCodeEnd=delivery.ZipCodeEnd,
                VPPMoney=totalAmount
                
            };
            try
            {
                _unitOfWork.DeliveryRepository.Add(d);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            try
            {
                orderPayment.OrderPaymentStatusId=1;
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500,"Can't save status of orderpayment"));
            }
            return Ok();
        }
        [HttpPost("delivery-alter")]
        public async Task<ActionResult> AlterSpecificDelivery([FromForm] string delivery1 ){
            SubmitDelivery delivery = JsonSerializer.Deserialize<SubmitDelivery>(delivery1);
            var payment = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.Id==delivery.OrderId,null,"OrderPayment,Service,Customer,PricePerDistance,DeliveryAgent");
            var paymentId = payment.FirstOrDefault().OrderPaymentId;
            
            if(paymentId==null){
                return BadRequest(new ErrorResponse(500));
            }
           var deliveries = await _unitOfWork.DeliveryRepository.GetEntityByExpression(x=>x.OrderId==delivery.OrderId,null,"Order,DeliveryAgent,OrderPayment,DeliveryStatus");
            var expect = deliveries.FirstOrDefault();
            var orderPayments = await _unitOfWork.OrderPaymentRepository.GetEntityByExpression(w=>w.Id==paymentId,null,"OrderPaymentStatus");
            var orderPayment = orderPayments.FirstOrDefault();
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
            Console.WriteLine("Thoi gian tao"+timeCreated);
            TimeSpan timeOfDay = timeCreated.TimeOfDay;
            TimeOnly time1 = TimeOnly.FromTimeSpan(timeOfDay);
            var timeRequired = responseAgent.RequiredTimeForOrderToPickUp;
            DateTime pickUp = timeCreated;
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


            try
            {
                expect.PickUpDateTime=pickUp;
                expect.DeliveryDate=deliveryDate;
                if(delivery.ZipCodeStart!=-1){
                     expect.ZipCodeStart=delivery.ZipCodeStart;
                }
                if(delivery.ZipCodeEnd!=-1){
                    expect.ZipCodeEnd=delivery.ZipCodeEnd;
                }
                _unitOfWork.Save();
                Console.WriteLine("Update thowi gian moi");
            }
            catch (System.Exception)
            {
                
                throw;
            }
           
            
            return Ok();
        }
        [HttpGet("update-delivery-status/{customerId}")]
        public async Task<ActionResult> UpdateStatusOfDelivery([FromRoute] string customerId)
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
           Console.WriteLine(now);
           foreach(var process in processDeliveryList){
            var order = processingList.Where(x=>x.Id==process.OrderId).FirstOrDefault();
                if(now>=process.PickUpDateTime&&now<process.DeliveryDate){
                    Console.WriteLine("true");
                    try
                    {
                        var temp = deliveryList.Where(e=>e.Id==process.Id).FirstOrDefault();
                        if(!temp.CodeLocation.HasValue){
                            temp.CodeLocation=temp.ZipCodeStart;
                        }
                         temp.DeliveryStatusId=2;
                    order.OrderStatusId=2;
                    _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                       return BadRequest(new ErrorResponse(500));
                    }
                   
                }else if(now>process.DeliveryDate){
                    try
                    {
                        var temp = deliveryList.Where(e=>e.Id==process.Id).FirstOrDefault();
                        temp.CodeLocation=temp.ZipCodeEnd.Value;
                         temp.DeliveryStatusId=3;
                    order.OrderStatusId=3;
                    _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500));
                    }
                   
                }
           }
          return Ok();

        }
        [HttpGet("delivery-created/{customerId}")]
        public async Task<ActionResult<IEnumerable<ReturnDelivery>>> RetrieveAllCreatedDeliveryOfCustomer([FromRoute] string customerId){
            IEnumerable<Order> ordersList = await _unitOfWork.OrderRepository.GetEntityByExpression(p=>p.CustomerId==customerId,q=>q.OrderByDescending(w=>w.OrderDate),"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
            var orderIdList = ordersList.Select(w=>w.Id);
            IEnumerable<Delivery> deliveryList = await _unitOfWork.DeliveryRepository.GetEntityByExpression(q=>orderIdList.Contains(q.OrderId),null,"Order,DeliveryAgent,OrderPayment,DeliveryStatus");
            return Ok(_mapper.Map<IEnumerable<Delivery>,IEnumerable<ReturnDelivery>>(deliveryList));
        }
        [HttpGet("temp/{customerId}")]
        public async Task<ActionResult<List<OrderDTO>>> RetrieveAllUnFinishedOrders([FromRoute] string customerId){
             IEnumerable<Order> ordersList = await _unitOfWork.OrderRepository.GetEntityByExpression(p=>p.CustomerId==customerId,q=>q.OrderByDescending(w=>w.OrderDate),"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
             var unfinished = ordersList.Where(r=>r.OrderPaymentId==null||r.SenderInfo==null||r.PricePerDistanceId==null||r.OrderPayment.OrderPaymentStatusId==2).ToList();

             return Ok(_mapper.Map<List<Order>,List<OrderDTO>>(unfinished));
        }
        [HttpPut("update-location")]
        public async Task<ActionResult> UpdateDeliveryLocation([FromBody] SubmitChangeLocation submit){
                var deliveries = await _unitOfWork.DeliveryRepository.GetEntityByExpression(t=>t.OrderId==submit.OrderId,null,"Order,DeliveryAgent,OrderPayment,DeliveryStatus");
                var delivery = deliveries.FirstOrDefault();
                try
                {
                    delivery.CodeLocation = submit.NewZipCodeLocation;
                    _unitOfWork.Save();
                }
                catch (System.Exception)
                {
                    
                    return BadRequest(new ErrorResponse(500,"Error at delivery table!"));
                }
                return Ok();
        }
        [HttpGet("out-going-delivery")]
        public async Task<ActionResult<IEnumerable<ReturnDelivery>>> GetAllOutGoingDeliveries(){
            var deliveries = await _unitOfWork.DeliveryRepository.GetEntityByExpression(t=>t.DeliveryStatusId==2,null,"Order,DeliveryAgent,OrderPayment,DeliveryStatus");
            return Ok(_mapper.Map<IEnumerable<Delivery>,IEnumerable<ReturnDelivery>>(deliveries));
        }
        [HttpGet("update-status-all")]
        public async Task<ActionResult> UpdateAllDeliveriesStatus(){
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
                        
                       return BadRequest(new ErrorResponse(500));
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
                        
                        return BadRequest(new ErrorResponse(500));
                    }
                   
                }
           }
          return Ok();
        }
    }
    
}