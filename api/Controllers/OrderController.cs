using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController:ControllerBase{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public OrderController(IUnitOfWork unitOfWork,IMapper mapper,IWebHostEnvironment environment,IHttpContextAccessor httpContextAccessor){
            _unitOfWork=unitOfWork;
            _mapper=mapper;
            _environment=environment;
            _httpContextAccessor=httpContextAccessor;
        }
        [HttpGet("order/1/{customerId}")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetAllCustomerOrders([FromRoute] string customerId){
            IEnumerable<Order> originlist = await _unitOfWork.OrderRepository.GetEntityByExpression(q=>q.CustomerId==customerId,null,"Customer,Service,OrderPayment,OrderStatus");
            var result = _mapper.Map<IEnumerable<Order>,IEnumerable<OrderDTO>>(originlist);
            return Ok(result);
        }
        [HttpPost("order")]
        public async Task<ActionResult> AddNewOrder(SubmitOrder order){
            Order o = new Order{
                ContactAddress="Not update",
                ServiceId=order.ServiceId,
                CustomerId=order.CustomerId,
                PrePaid=order.PrePaid,
                OrderDate=order.OrderDate,
                OrderStatusId=1
            };
            try
            {
                _unitOfWork.OrderRepository.Add(o);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        //crud order status 
        [HttpGet("order-status")]
        public async Task<ActionResult<IEnumerable<OrderStatus>>> GetAllOrderStatus(){
            IEnumerable<OrderStatus> list = await _unitOfWork.OrderStatusRepository.GetEntityByExpression(null,null,null);
            return Ok(list);
        }
        [HttpPost("order-status")]
        public async Task<ActionResult> AddNewOrderStatus(OrderStatusDTO status){
            var existList = await _unitOfWork.OrderStatusRepository.GetEntityByExpression(d=>d.StatusName==status.StatusName,null,null);
            if(existList.Any()){
                return BadRequest(new ErrorResponse(400));
            }
            OrderStatus o = new OrderStatus{
                StatusName=status.StatusName
            };
            try
            {
                _unitOfWork.OrderStatusRepository.Add(o);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        [HttpPut("order-status")]
        public async Task<ActionResult> EditOrderStatus(OrderStatusDTO status){
            //check id
            var existList = await _unitOfWork.OrderStatusRepository.GetEntityByExpression(r=>r.Id==status.Id,null,null);
            if(!existList.Any()){
                return BadRequest(new ErrorResponse(400));
            }
            var edit = existList.FirstOrDefault();
            var duplicatedName = await _unitOfWork.OrderStatusRepository.GetEntityByExpression(r=>r.Id!=status.Id&&r.StatusName==status.StatusName,null,null);
            if(duplicatedName.Any()){
                return BadRequest(new ErrorResponse(400));
            }
            
            try
            {
                edit.StatusName=status.StatusName;
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        [HttpDelete("order-status/{id}")]
        public async Task<ActionResult> DeleteOrderStatus([FromRoute] string id){
            int Id=0;
            try
            {
                Id=int.Parse(id);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400));
            }
            var existList = await _unitOfWork.OrderStatusRepository.GetEntityByExpression(x=>x.Id==Id,null,null);
            if(!existList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            try
            {
               _unitOfWork.OrderStatusRepository.DeleteById(Id);
               _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        //parcel controller
        [HttpPost("parcel")]
        //add list of parcels
        public async Task<ActionResult> AddNewParcelPackage([FromForm]SubmitListParcel parcelList){
            var customerId = parcelList.CustomerId;
            var folderName= "images/customer/"+customerId;
            var uploadsFolder = Path.Combine(_environment.WebRootPath,folderName);
            if(!Directory.Exists(uploadsFolder)){
                Directory.CreateDirectory(uploadsFolder);
            }
            foreach(var parcel in parcelList.List){
                Parcel p = new Parcel{
                ParcelName = parcel.ParcelName,
                Weight = parcel.Weight ,
                CustomerId=customerId
                };
                if(parcel.Image.Length>0){
                     var filePath = Path.Combine(uploadsFolder, parcel.Image.FileName);
                
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    parcel.Image.CopyTo(fileStream);
                }
                p.ImageUrl=folderName+"/"+parcel.Image.FileName;
                }else{
                    p.ImageUrl="empty";
                }
            try
            {
                _unitOfWork.ParcelRepository.Add(p);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500,"Error in parcel table"));
            }
                _ = Task.Delay(1000);
            var latestList = await _unitOfWork.ParcelRepository.GetEntityByExpression(d=>d.CustomerId==customerId,r=>r.OrderByDescending(e=>e.Id),"Customer");
            var parcelId= latestList.FirstOrDefault().Id;
            OrderDetail detail = new OrderDetail{
                ParcelId=parcelId,
                OrderId=int.Parse(parcelList.OrderId) 
            };
            try
            {
                _unitOfWork.OrderDetailRepository.Add(detail);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500,"Error in order detail table"));
            }
            }
            
            return Ok();
        }
        //Case get all parcel infos of an order
        [HttpGet("parcel/{orderId}")]
        public async Task<ActionResult<List<ReturnParcel>>> GetAllParcelsOfOrder([FromRoute] string orderId){
            int OrderId = 0;
            try
            {
                OrderId = int.Parse(orderId);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400));
            }
            IEnumerable<OrderDetail> list = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(r=>r.OrderId==OrderId,null,"Order,Parcel");
            IEnumerable<int> parcelList = list.Where(x=>x.ParcelId.HasValue).Select(x=>x.ParcelId.Value).ToList();
            List<ReturnParcel> returnParcel = new List<ReturnParcel>();
             string baseUrl = _httpContextAccessor.HttpContext.Request.Scheme+"://"+_httpContextAccessor.HttpContext.Request.Host;
            //list of Ids
            foreach(var id in parcelList){
                var parcel1 = await _unitOfWork.ParcelRepository.GetEntityByExpression(w=>w.Id==id,null,null);
                var parcel = parcel1.FirstOrDefault();
                ReturnParcel rp = new ReturnParcel{
                    Id=parcel.Id,
                    ParcelName=parcel.ParcelName,
                    Weight=parcel.Weight,
                    ImageUrl=baseUrl+'/'+parcel.ImageUrl
                };
                returnParcel.Add(rp);
            }
            return Ok(returnParcel);
        }
        //Case update the list of parcels of an order
        public async Task<ActionResult> UpdateListOfParcels([FromForm] SubmitListParcel listParcel){
            var customerId = listParcel.CustomerId;
            var folderName = "images/customer/"+customerId;
            var uploadsFolder = Path.Combine(_environment.WebRootPath,folderName);
            if(!Directory.Exists(uploadsFolder)){
                Directory.CreateDirectory(uploadsFolder);
            }
            foreach(var parcel in listParcel.List){
                var id =parcel.Id ;
                var existedParcel = await _unitOfWork.ParcelRepository.GetEntityByExpression(d=>d.Id==id,null,"Customer");
                if(!existedParcel.Any()){
                    return BadRequest(new ErrorResponse(400));
                }
                Parcel p = existedParcel.FirstOrDefault();
                p.ParcelName=parcel.ParcelName;
                p.Weight=parcel.Weight ;
                if(parcel.Image.Length>0){
                     var filePath = Path.Combine(uploadsFolder, parcel.Image.FileName);
                
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    parcel.Image.CopyTo(fileStream);
                }
                p.ImageUrl=folderName+"/"+parcel.Image.FileName;
                }else{
                    p.ImageUrl="empty";
                }
                try
                {
                    _unitOfWork.Save();
                }
                catch (System.Exception)
                {
                    
                    return BadRequest(new ErrorResponse(500));
                }
            }
            return Ok();
        }
        //Case cancel the order
        [HttpPost("order/cancel")]
        public async Task<ActionResult> OrderCancel([FromBody] string orderId){
            int OrderId=0;
            try
            {
                OrderId=int.Parse(orderId);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400));
            }
            var expectedList = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.Id==OrderId,null,"Service,Customer,OrderStatus,OrderPayment");
            if(!expectedList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            Order o = expectedList.FirstOrDefault();
            
            try
            {
                o.OrderStatus.Id=4;
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        //Case change details of order
        [HttpGet("order/edit/{orderId}")]
        public async Task<ActionResult<SubmitEditOrder>> ReturnOrderForm([FromRoute] string orderId){
            int OrderId = 0;
            try
            {
                OrderId=int.Parse(orderId);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400));
            }
            var expectedList = await _unitOfWork.OrderRepository.GetEntityByExpression(w=>w.Id==OrderId,null,"Service,OrderStatus");
            if(!expectedList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            var expected = expectedList.FirstOrDefault();
            if(expected.OrderStatus.Id==1){
                 SubmitEditOrder o = new SubmitEditOrder{
                Id= expected.Id,
                ContactAddress=expected.ContactAddress,
                ServiceId=expected.ServiceId,
                ServiceName=expected.Service.ServiceName,
                PrePaid=expected.PrePaid
            };
            return Ok(o);
            }else{
                return BadRequest(new ErrorResponse(401));
            }
           
        }
        [HttpPost("order/edit")]
        public async Task<ActionResult> UpdateOrderInfo(SubmitEditOrder submit){
            var expectedList = await _unitOfWork.OrderRepository.GetEntityByExpression(t=>t.Id==submit.Id,null,"Service,Customer,OrderStatus,OrderPayment");
            if(!expectedList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            var expected=expectedList.FirstOrDefault();
            if(expected.OrderStatus.Id!=1){
                return BadRequest(new ErrorResponse(401));
            }
            try
            {
                expected.ContactAddress=submit.ContactAddress;
                expected.ServiceId=submit.ServiceId;
                expected.PrePaid=submit.PrePaid;
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        [HttpGet("order/{customerId}/{orderId}")]
        public async Task<ActionResult<OrderDTO>> ReturnOrderInfo([FromRoute] string customerId,[FromRoute] string orderId){
            int Id = 0;
            try
            {
                Id=int.Parse(orderId);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400,"Error orderId"));
            }
            var orderList = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.Id==Id&&d.CustomerId==customerId,null,"Service,Customer,OrderStatus,OrderPayment");
            if(!orderList.Any()){
                return BadRequest(new ErrorResponse(404,"Khong tim thay order yeu cau"));
            }
            var order = orderList.FirstOrDefault();
            OrderDTO o = new OrderDTO{
                Id=order.Id,
                ContactAddress=order.ContactAddress,
                Service=order.Service.ServiceName,
                CustomerId=order.CustomerId,
                PrePaid=order.PrePaid,
                OrderDate=order.OrderDate,
                OrderPaymentId=order.OrderPaymentId,
                OrderStatus=order.OrderStatus.StatusName,
                SenderAddress=order.SenderInfo,
            };
            return Ok(o);
        }



    }
}