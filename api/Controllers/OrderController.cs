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
        private readonly IMapper _mapper;
        public OrderController(IUnitOfWork unitOfWork,IMapper mapper,IWebHostEnvironment environment){
            _unitOfWork=unitOfWork;
            _mapper=mapper;
            _environment=environment;
        }
        [HttpGet("order")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllCustomerOrders([FromRoute] string customerId){
            IEnumerable<Order> originlist = await _unitOfWork.OrderRepository.GetEntityByExpression(null,null,"Customer,Service,OrderPayment,OrderStatus");
            IEnumerable<Order> filter = (IEnumerable<Order>)originlist.Select(x=>x.CustomerId==customerId);
            return Ok(_mapper.Map<IEnumerable<Order>,IEnumerable<OrderDTO>>(filter));
        }
        [HttpPost("order")]
        public async Task<ActionResult> AddNewOrder(SubmitOrder order){
            Order o = new Order{
                ContactAddress=order.ContactAddress,
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
        [HttpDelete("order-status")]
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
        public async Task<ActionResult> AddNewParcelPackage([FromForm]SubmitListParcel parcelList){
            var customerId = parcelList.CustomerId;
            var folderName= "images/customer/"+customerId;
            var uploadsFolder = Path.Combine(_environment.WebRootPath,folderName);
            if(!Directory.Exists(uploadsFolder)){
                Directory.CreateDirectory(uploadsFolder);
            }
            foreach(var parcel in parcelList.list){
                if(parcel.image.Length>0){
                     var filePath = Path.Combine(uploadsFolder, parcel.image.FileName);
                
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    parcel.image.CopyTo(fileStream);
                }
                }
                Parcel p = new Parcel{
                ParcelName = parcel.ParcelName,
                Weight = parcel.Weight,
                ImageUrl = folderName+"/"+parcel.image.FileName,
                CustomerId=customerId
            };
            try
            {
                _unitOfWork.ParcelRepository.Add(p);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            }
            
            return Ok();
        }
    }
}