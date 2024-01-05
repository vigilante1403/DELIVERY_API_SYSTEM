using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController:ControllerBase{
        private readonly IUnitOfWork _unitOfWork;
        public PaymentController(IUnitOfWork unitOfWork){
            _unitOfWork=unitOfWork;
        }
        [HttpGet("order-payment-status")]
        public async Task<ActionResult<IEnumerable<OrderPaymentStatus>>> GetAllOrderPaymentStatus(){
            IEnumerable<OrderPaymentStatus> list = await _unitOfWork.OrderPaymentStatusRepository.GetEntityByExpression(null,null,null);
            return Ok(list);
        }
        [HttpPost("order-payment-status")]
        public async Task<ActionResult> AddNewOrderPaymentStatus(OrderPaymentStatusDTO status){
            var existList = await _unitOfWork.OrderPaymentStatusRepository.GetEntityByExpression(d=>d.StatusName==status.StatusName,null,null);
            if(existList.Any()){
                return BadRequest(new ErrorResponse(400));
            }
            OrderPaymentStatus o = new OrderPaymentStatus{
                StatusName=status.StatusName
            };
            try
            {
                _unitOfWork.OrderPaymentStatusRepository.Add(o);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        [HttpPut("order-payment-status")]
        public async Task<ActionResult> EditOrderPaymentStatus(OrderPaymentStatusDTO status){
            //check id
            var existList = await _unitOfWork.OrderPaymentStatusRepository.GetEntityByExpression(r=>r.Id==status.Id,null,null);
            if(!existList.Any()){
                return BadRequest(new ErrorResponse(400));
            }
            var edit = existList.FirstOrDefault();
            var duplicatedName = await _unitOfWork.OrderPaymentStatusRepository.GetEntityByExpression(r=>r.Id!=status.Id&&r.StatusName==status.StatusName,null,null);
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
        [HttpDelete("order-payment-status/{id}")]
        public async Task<ActionResult> DeleteOrderPaymentStatus([FromRoute] string id){
            int Id=0;
            try
            {
                Id=int.Parse(id);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400));
            }
            var existList = await _unitOfWork.OrderPaymentStatusRepository.GetEntityByExpression(x=>x.Id==Id,null,null);
            if(!existList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            try
            {
               _unitOfWork.OrderPaymentStatusRepository.DeleteById(Id);
               _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        [HttpGet("weight-charges")]
        public async Task<ActionResult<IEnumerable<CalculateCharges>>> GetAllWeightCharges(){
            IEnumerable<CalculateCharges> list = await _unitOfWork.CalculateChargesRepository.GetEntityByExpression(null,null,null);
            return Ok(list);
        }
        [HttpPost("weight-charges")]
        public async Task<ActionResult> AddNewWeightCharge(CalculateCharges charges){
            var existList = await _unitOfWork.CalculateChargesRepository.GetEntityByExpression(d=>d.Year==charges.Year,null,null);
            if(existList.Any()){
                return BadRequest(new ErrorResponse(400));
            }
            CalculateCharges o = new CalculateCharges{
                BasicPricePerKg=charges.BasicPricePerKg,
                Year=charges.Year
            };
            try
            {
                _unitOfWork.CalculateChargesRepository.Add(o);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        [HttpPut("weight-charges")]
        public async Task<ActionResult> EditWeightCharge(CalculateCharges charges){
            //check id
            var existList = await _unitOfWork.CalculateChargesRepository.GetEntityByExpression(r=>r.Id==charges.Id,null,null);
            if(!existList.Any()){
                return BadRequest(new ErrorResponse(400));
            }
            var edit = existList.FirstOrDefault();
            var duplicatedYear = await _unitOfWork.CalculateChargesRepository.GetEntityByExpression(r=>r.Id!=charges.Id&&r.Year==charges.Year,null,null);
            if(duplicatedYear.Any()){
                return BadRequest(new ErrorResponse(400));
            }
            
            try
            {
                edit.BasicPricePerKg=charges.BasicPricePerKg;
                edit.Year=charges.Year;
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
        [HttpDelete("weight-charges/{id}")]
        public async Task<ActionResult> DeleteWeightCharge([FromRoute] string id){
            int Id=0;
            try
            {
                Id=int.Parse(id);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400));
            }
            var existList = await _unitOfWork.CalculateChargesRepository.GetEntityByExpression(x=>x.Id==Id,null,null);
            if(!existList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            try
            {
               _unitOfWork.CalculateChargesRepository.DeleteById(Id);
               _unitOfWork.Save();
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
            return Ok();
        }
    }
}