using System.Linq.Expressions;
using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Formatting;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Nexmo.Api.Voice.EventWebhooks;

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
                Year=charges.Year,
                BasicPricePerKm=charges.BasicPricePerKm
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
                edit.BasicPricePerKm=charges.BasicPricePerKm;
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
        [HttpGet("order-payment/{orderId}")]
        public async Task<ActionResult<ReturnPayment>> GetOrderPaymentRequired([FromRoute] string orderId){
            int Id = 0;
            try
            {
                Id=int.Parse(orderId);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400,"Invalid order Id"));
            }
            var orderList = await _unitOfWork.OrderRepository.GetEntityByExpression(e=>e.Id==Id,null,"OrderPayment");
            if(!orderList.Any()){
                return BadRequest(new ErrorResponse(404,"Khong tim thay order theo yeu cau!"));
            }
            var paymentId = orderList.FirstOrDefault().OrderPaymentId;
            var paymentList = await _unitOfWork.OrderPaymentRepository.GetEntityByExpression(w=>w.Id==paymentId,null,"OrderPaymentStatus");
            if(!paymentList.Any()){
                return BadRequest(new ErrorResponse(404,"Payment method cua order chua duoc kich hoat!"));
            }
            var payment = paymentList.FirstOrDefault();
            ReturnPayment rp = new ReturnPayment{
                Id=payment.Id,
                SubTotal=payment.SubTotal,
                PrePaid=payment.PrePaid,
                ServicePrice=payment.ServicePrice,
                DistanceCharges=payment.DistanceCharges,
                TotalCharges=payment.TotalCharges,
                OrderPaymentStatus=payment.OrderPaymentStatus.StatusName
            };
            return Ok(rp);
        }
        [HttpPost("order-payment/{orderId}")]
        public async Task<ActionResult> CreateNewOrderPayment([FromRoute] string orderId,[FromBody] SubmitAddress address){
            int Id =0;
            try
            {
                Id=int.Parse(orderId);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400));
            }
            var orderList = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.Id==Id,null,"Service,Customer,OrderStatus,OrderPayment");
            if(!orderList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            var order = orderList.FirstOrDefault();
            var orderPaymentId=order.OrderPaymentId;
            if(orderPaymentId==null||order.OrderPayment.OrderPaymentStatusId==4){
                   string apiKey = "AIzaSyCwrRsY8vEyGBrnJ4jWFWJa_6lAuVVX77o";

                    // Location origin = await GetLocationAsync(address.startAddress);
                    // Location destination = await GetLocationAsync(address.endAddress);

                    // var totalTime = await CalculateTravelTimeAsync(apiKey, origin, destination);
                    var totalDistance = await CalculateTotalDistanceAsync(address.startAddress,address.endAddress);
                    if(totalDistance==-1){
                        var errorMessage =  "Error at calculating distance!" +address.startAddress;
                        return BadRequest(new ErrorResponse(500,errorMessage));
                    }
                    //van toc 70km/h
                    var serviceList = await _unitOfWork.ServiceRepository.GetEntityByExpression(d=>d.Id==order.ServiceId,null,null);
                    var ServicePrice = serviceList.FirstOrDefault().Price;
                    DateTime today = DateTime.Now;
                    var year = today.Year;
                    var distanceList = await _unitOfWork.CalculateChargesRepository.GetEntityByExpression(d=>d.Year==year,null,null);
                    var distancePrice = distanceList.FirstOrDefault().BasicPricePerKm;
                    var weightCharge = distanceList.FirstOrDefault().BasicPricePerKg;
                    //get subtotal 
                    IEnumerable<OrderDetail> parcelList = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(d=>d.OrderId==Id,null,"Parcel");
                    var weight = parcelList.Sum(x=>x.Parcel.Weight)*weightCharge;
                    
                    var paymentList = await _unitOfWork.OrderPaymentRepository.GetAll();
                    var paymentId = paymentList.Count()+1;
                    OrderPayment o = new OrderPayment{
                        SubTotal=weight,
                        PrePaid=order.PrePaid,
                        ServicePrice=ServicePrice,
                        DistanceCharges=(totalDistance*distancePrice)/1000,
                        TotalCharges=weight+order.PrePaid+ServicePrice+((totalDistance*distancePrice)/1000),
                        OrderPaymentStatusId=2
                    };
                    try
                    {
                        _unitOfWork.OrderPaymentRepository.Add(o);
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500,"Error at order payment table"));
                    }
                    try
                    {
                        order.OrderPaymentId=paymentId;
                        _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500,"Error at order table"));
                    }

            }else{
                return BadRequest(new ErrorResponse(401));
            }
            return Ok();
        }
        
         public static async Task<int> CalculateTotalDistanceAsync(string origin, string destination)
    {
        using (HttpClient client = new HttpClient())
        {
            string encodedOrigin = Uri.EscapeDataString(origin);
            string encodedDestination = Uri.EscapeDataString(destination);

            string url = $"https://maps.googleapis.com/maps/api/directions/json?origin={encodedOrigin}&destination={encodedDestination}&key=AIzaSyCwrRsY8vEyGBrnJ4jWFWJa_6lAuVVX77o";

            HttpResponseMessage response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var directionsResponse = JsonConvert.DeserializeObject<DirectionsResponse>(data);

                if (directionsResponse.status == "OK" && directionsResponse.routes.Length > 0)
                {
                    int totalDistance = directionsResponse.routes[0].legs.Sum(leg => leg.steps.Sum(step => step.Distance1.Value));
                    return totalDistance;
                }
            }

            return -1; // Indicate an error or no valid response
        }
    }
    [HttpGet("distance")]
    public async Task<ActionResult<int>> CalculateTotalDistanceAsync1(string origin, string destination)
    {
        using (HttpClient client = new HttpClient())
        {
            string encodedOrigin = Uri.EscapeDataString(origin);
            string encodedDestination = Uri.EscapeDataString(destination);

            string url = $"https://maps.googleapis.com/maps/api/directions/json?origin={encodedOrigin}&destination={encodedDestination}&key=AIzaSyDjTiE5SihVKBc4pqsQr-r9phTYXmmuHx0";

            HttpResponseMessage response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var directionsResponse = JsonConvert.DeserializeObject<DirectionsResponse>(data);

                if (directionsResponse.status == "OK" && directionsResponse.routes.Length > 0)
                {
                    int totalDistance = directionsResponse.routes[0].legs.Sum(leg => leg.steps.Sum(step => step.Distance1.Value));
                    return totalDistance;
                }
                return Ok(directionsResponse);
            }

            return BadRequest(new ErrorResponse(500,response.ToString())); // Indicate an error or no valid response
        }
    }
        public static async Task<Location> GetLocationAsync(string address)
    {
        using (HttpClient client = new HttpClient())
        {
            string encodedAddress = Uri.EscapeDataString(address);
            string url = $"https://maps.googleapis.com/maps/api/geocode/json?address={encodedAddress}&key=AIzaSyDDAFrEoBErPc_5B49M-D4nkcApKvl3fnw";

            HttpResponseMessage response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var geocodingResponse = JsonConvert.DeserializeObject<GeocodingResponse>(data);

                if (geocodingResponse.status == "OK" && geocodingResponse.results.Length > 0)
                {
                    var location = geocodingResponse.results[0].geometry.location;
                    return new Location { Latitude = location.Latitude, Longitude = location.Longitude };
                }
            }

            return null;
        }
    }
        public static async Task<double> CalculateTravelTimeAsync(string apiKey, Location origin, Location destination)
    {
        using (HttpClient client = new HttpClient())
        {
            string url = $"https://maps.googleapis.com/maps/api/directions/json?origin={origin.Latitude},{origin.Longitude}&destination={destination.Latitude},{destination.Longitude}&key={apiKey}";
            
            HttpResponseMessage response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsAsync<DirectionsResponse>();

                if (data.status == "OK" && data.routes.Length > 0 && data.routes[0].legs.Length > 0)
                {
                    return data.routes[0].legs[0].duration.value;
                }
            }

            // Handle errors or return a default value
            return -1;
        }
    }
    }
}