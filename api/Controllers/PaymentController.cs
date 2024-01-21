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
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Text.Json;
using System.Text;
using Twilio.Rest.Microvisor.V1;
using api.services;
using AutoMapper;

namespace api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController:ControllerBase{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHandleRoute _handleRoute;
        private readonly IMapper _mapper;
        private readonly IHelper _helper;
      
        public PaymentController(IHelper helper, IUnitOfWork unitOfWork, IHandleRoute handleRoute,IMapper mapper){
            _unitOfWork=unitOfWork;
            _handleRoute=handleRoute;
            _mapper=mapper;
            _helper=helper;
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
        [HttpGet("order-payment/all")]
        public async Task<ActionResult<IEnumerable<ReturnPayment>>> GetAllPayments(){
            var payments = await _unitOfWork.OrderPaymentRepository.GetEntityByExpression(null,null,"OrderPaymentStatus");
            return Ok(_mapper.Map<IEnumerable<OrderPayment>,IEnumerable<ReturnPayment>>(payments));
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
        public async Task<ActionResult> CreateNewOrderPayment([FromRoute] string orderId,[FromBody] SubmitAddressNew address){
            int Id =0;
            try
            {
                Id=int.Parse(orderId);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400,"blah blah"));
            }
            var orderList = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.Id==Id,null,"Service,Customer,OrderStatus,OrderPayment");
            if(!orderList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            var order = orderList.FirstOrDefault();
            var orderPaymentId=order.OrderPaymentId;
            if(orderPaymentId==null||order.OrderPayment.OrderPaymentStatusId==4){
         
                    //xet diem dau va diem cuoi cua route //vi du 62-63
                    var startPlaceId = address.LocationStartPlaceId;
                    var endPlaceId = address.LocationEndPlaceId;
                    var Places = await _unitOfWork.AllPlacesInCountryRepository.GetEntityByExpression(null,null,null);
                    var startPlace = Places.Where(x=>x.Id==startPlaceId).FirstOrDefault();
                    var endPlace = Places.Where(x=>x.Id==endPlaceId).FirstOrDefault();
                    var routeChooseId = _handleRoute.ChooseRoute(startPlace,endPlace);
                    var comboList = await _unitOfWork.PricePerDistanceRepository.GetEntityByExpression(d=>d.Id==routeChooseId,null,null);
                    var combo = comboList.FirstOrDefault();
                    var agentList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(null,null,null);
                    var agent = agentList.Where(e=>e.Id==address.DeliveryAgentId).FirstOrDefault();
                    var charges = agent.Charges.Value;
                    var maxWeight=agent.MaxFreeWeight;
                    var serviceList = await _unitOfWork.ServiceRepository.GetEntityByExpression(null,null,"DeliveryAgent");
                    var newServiceChosen = serviceList.Where(r=>r.DeliveryAgentId==address.DeliveryAgentId).FirstOrDefault();
                    var ServicePrice = newServiceChosen.Price;
                    // DateTime today = DateTime.Now;
                    // var year = today.Year;
                    // var distanceList = await _unitOfWork.CalculateChargesRepository.GetEntityByExpression(d=>d.Year==year,null,null);
                    // var distancePrice = distanceList.FirstOrDefault().BasicPricePerKm;
                    // var weightCharge = distanceList.FirstOrDefault().BasicPricePerKg;
                    
                    //get subtotal 
                    IEnumerable<OrderDetail> parcelList = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(d=>d.OrderId==Id,null,"Parcel");
                    var weight = parcelList.Sum(x=>x.Parcel.Weight);
                    decimal weightPlus =0;
                    var freeWeightUpTo = combo.PricePerKg+maxWeight;
                    if(weight>freeWeightUpTo){
                        var delta = weight -freeWeightUpTo;
                        weightPlus = (decimal)(delta *combo.PriceAdd1Kg)/23;
                    }
                    if(weight<=maxWeight){
                        weightPlus=0;
                    }
                    var distancePrice =(decimal) combo.PriceRoute/23;
                    
                    var paymentList = await _unitOfWork.OrderPaymentRepository.GetAll();
                    
                    string random = _helper.GenerateRandomString(8);
                    OrderPayment o = new OrderPayment{
                        SubTotal=weightPlus,
                        PrePaid=order.PrePaid,
                        ServicePrice=ServicePrice,
                        DistanceCharges=distancePrice+charges,
                        TotalCharges=weightPlus+order.PrePaid+ServicePrice+distancePrice,
                        OrderPaymentStatusId=2,
                        GenrateStringAuthenticate=random
                        
                    };
                    try
                    {
                        _unitOfWork.OrderPaymentRepository.Add(o);
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500,"Error at order payment table"));
                    }
                   var WardList = await _unitOfWork.WardRepository.GetEntityByExpression(null,null,"District");
                   var DistrictList = await _unitOfWork.DistrictRepository.GetEntityByExpression(null,null,"AllPlacesInCountry");
                   var CountryList = await _unitOfWork.AllPlacesInCountryRepository.GetEntityByExpression(null,null,null);
                   var contactWard = WardList.Where(e=>e.Id==address.LocationEndWardId).FirstOrDefault().Name;
                   var contactDistrict = DistrictList.Where(r=>r.Id==address.LocationEndDistrictId).FirstOrDefault().Name;
                   var contactCountry = CountryList.Where(w=>w.Id==address.LocationEndPlaceId).FirstOrDefault().Name;
                   var contactCityMark =  CountryList.Where(w=>w.Id==address.LocationEndPlaceId).FirstOrDefault().Specila==true?"City":"Provine";
                   string ContactAddress = string.Concat(address.LocationEndStreet,", ",contactWard," Ward ",contactDistrict," District ",contactCountry," ",contactCityMark);
                    var senderWard = WardList.Where(e=>e.Id==address.LocationStartWardId).FirstOrDefault().Name;
                   var senderDistrict = DistrictList.Where(r=>r.Id==address.LocationStartDistrictId).FirstOrDefault().Name;
                   var senderCountry = CountryList.Where(w=>w.Id==address.LocationStartPlaceId).FirstOrDefault().Name;
                   var senderCityMark =  CountryList.Where(w=>w.Id==address.LocationStartPlaceId).FirstOrDefault().Specila==true?"City":"Provine";
                   string SenderAddress = string.Concat(address.LocationStartStreet,", ",senderWard," Ward ",senderDistrict," District ",senderCountry," ",senderCityMark);
                    InfoCombine contact = new InfoCombine{
                        FullName= address.ContactName,
                        PhoneNumber=address.ContactPhoneNumber,
                       Address=ContactAddress
                    };
                    InfoCombine sender = new InfoCombine{
                        FullName = address.SenderName,
                        PhoneNumber = address.SenderPhoneNumber,
                        Address=SenderAddress
                    };
                    var contactString = System.Text.Json.JsonSerializer.Serialize(contact);
                    var senderString = System.Text.Json.JsonSerializer.Serialize(sender);
                    var paymentsList = await _unitOfWork.OrderPaymentRepository.GetEntityByExpression(e=>e.GenrateStringAuthenticate==random,null,"OrderPaymentStatus");
                    var expectPayment = paymentsList.FirstOrDefault();
                    if(expectPayment==null){
                        return BadRequest( new ErrorResponse(500,"Can't match payment with order") );
                    }
                    try
                    {
                        order.OrderPaymentId=expectPayment.Id;
                        order.ContactAddress=contactString;
                        order.SenderInfo=senderString;
                        order.PricePerDistanceId=combo.Id;
                        order.DeliveryAgentId=agent.Id;
                        _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500,"Error at order table"));
                    }

            }else{
                return BadRequest(new ErrorResponse(401,"something is wrong"));
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
    public static async Task<ActionResult<int>> CalculateTotalDistanceAsync1([FromQuery]string origin, [FromQuery]string destination)
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
                return -2;
            }

            return -1; // Indicate an error or no valid response
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
    static void ProcessDistanceMatrixResponse(string jsonResponse)
    {
       try
    {
        dynamic data = Newtonsoft.Json.JsonConvert.DeserializeObject(jsonResponse);

        // Check if the expected properties exist
        //do chua check exist prop trong dynamic data
        if (data != null && data.rows != null && data.rows.Count > 0 &&
            data.rows[0].elements != null && data.rows[0].elements.Count > 0 &&
            data.rows[0].elements[0].distance != null && data.rows[0].elements[0].duration != null)
        {
            string distance = data.rows[0].elements[0].distance.text;
            string duration = data.rows[0].elements[0].duration.text;

            Console.WriteLine($"Distance: {distance}");
            Console.WriteLine($"Duration: {duration}");
        }
        else
        {
            Console.WriteLine(data);
            Console.WriteLine("Invalid JSON structure. Unable to parse distance and duration.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error parsing JSON response: {ex.Message}");
    }

        
    }
    
    [HttpGet("distance-matrix")]
    public async Task GetDistance(string origin,string destination){
        string apiUrl = $"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destination}&key=AIzaSyCwrRsY8vEyGBrnJ4jWFWJa_6lAuVVX77o";
        using (HttpClient client = new HttpClient())
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    // Parse the JSON response
                    ProcessDistanceMatrixResponse(jsonResponse);
                  
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
         
        }
    }
    }
}