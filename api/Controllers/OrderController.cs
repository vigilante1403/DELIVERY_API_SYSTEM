using System.Text;
using System.Text.Json;
using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using api.services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController:ControllerBase{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHandleRoute _handleRoute;
        private readonly IMapper _mapper;
        private readonly IHelper _helper;
        public OrderController(IHelper helper, IHandleRoute handleRoute, IUnitOfWork unitOfWork,IMapper mapper,IWebHostEnvironment environment,IHttpContextAccessor httpContextAccessor){
            _unitOfWork=unitOfWork;
            _mapper=mapper;
            _environment=environment;
            _httpContextAccessor=httpContextAccessor;
            _handleRoute=handleRoute;
            _helper=helper;
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
            var sList = await _unitOfWork.ServiceRepository.GetEntityByExpression(null,null,"DeliveryAgent");
            var selectedDeliveryAgentId = sList.Where(r=>r.Id==order.ServiceId).FirstOrDefault().DeliveryAgentId;
                o.DeliveryAgentId=selectedDeliveryAgentId;
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
                var random1 = _helper.GenerateRandomString(16);
                Parcel p = new Parcel{
                ParcelName = parcel.ParcelName,
                Weight = parcel.Weight ,
                CustomerId=customerId,
                Quantity=parcel.Quantity,
                GenerateAuthentication=random1,
                TotalPriceAmountAssume=parcel.AmountAssume*parcel.Quantity
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
            var latestList = await _unitOfWork.ParcelRepository.GetEntityByExpression(d=>d.CustomerId==customerId&&d.GenerateAuthentication==random1,null,"Customer");
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
                    ImageUrl=baseUrl+'/'+parcel.ImageUrl,
                    Quantity=parcel.Quantity
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
                p.Quantity=parcel.Quantity;
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
            var expectedList = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.Id==OrderId,null,"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
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
            var expectedList = await _unitOfWork.OrderRepository.GetEntityByExpression(t=>t.Id==submit.Id,null,"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
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
            var orderList = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.Id==Id&&d.CustomerId==customerId,null,"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
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
                SenderInfo=order.SenderInfo,
                DeliveryAgentId=order.DeliveryAgentId,
                PricePerDistanceId=order.PricePerDistanceId
            };
            return Ok(o);
        }
        [HttpGet("order/{customerId}")]
        public async Task<ActionResult<OrderDTO>> ReturnOrderInfoLatest([FromRoute] string customerId){
          
            var orderList = await _unitOfWork.OrderRepository.GetEntityByExpression(d=>d.CustomerId==customerId,w=>w.OrderByDescending(q=>q.Id),"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
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
                SenderInfo=order.SenderInfo,
                DeliveryAgentId=order.DeliveryAgentId,
                PricePerDistanceId=order.PricePerDistanceId
            };
            return Ok(o);
        }
        [HttpPost("required-list")]
        public async Task<ActionResult<List<ReturnPayInfoParcel>>> ReturnsWithRequiredOrderIdList(int[] orderIds){
            var orders = await _unitOfWork.OrderRepository.GetEntityByExpression(e=>orderIds.Contains(e.Id),null,"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
            var orderDTOs = _mapper.Map<IEnumerable<Order>,IEnumerable<OrderDTO>>(orders);
            var paymentIds =orders.Where(x=>x.OrderPaymentId.HasValue).Select(x=>x.OrderPaymentId);
            var payments = await _unitOfWork.OrderPaymentRepository.GetEntityByExpression(e=>paymentIds.Contains(e.Id),null,"OrderPaymentStatus");
            var paymentDTOs = _mapper.Map<IEnumerable<OrderPayment>,IEnumerable<ReturnPayment>>(payments);
            var result = new List<ReturnPayInfoParcel>();
            foreach(var id in orderIds){
                var orderDTO = orderDTOs.Where(x=>x.Id==id).FirstOrDefault();
                var paymentId = orderDTO.OrderPaymentId;
                var payment = paymentDTOs.Where(d=>d.Id==paymentId).FirstOrDefault();
                IEnumerable<OrderDetail> list = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(r=>r.OrderId==id,null,"Order,Parcel");
                IEnumerable<int> parcelList = list.Where(x=>x.ParcelId.HasValue).Select(x=>x.ParcelId.Value).ToList();
                List<ReturnParcel> returnParcel = new List<ReturnParcel>();
                string baseUrl = _httpContextAccessor.HttpContext.Request.Scheme+"://"+_httpContextAccessor.HttpContext.Request.Host;
            //list of Ids
                foreach(var id1 in parcelList){
                var parcel1 = await _unitOfWork.ParcelRepository.GetEntityByExpression(w=>w.Id==id1,null,null);
                var parcel = parcel1.FirstOrDefault();
                ReturnParcel rp = new ReturnParcel{
                    Id=parcel.Id,
                    ParcelName=parcel.ParcelName,
                    Weight=parcel.Weight,
                    ImageUrl=baseUrl+'/'+parcel.ImageUrl,
                    Quantity=parcel.Quantity
                };
                returnParcel.Add(rp);
            }
            ReturnPayInfoParcel r = new ReturnPayInfoParcel{
                OrderId=id,
                OrderDTO=orderDTO,
                ReturnParcels=returnParcel,
                ReturnPayment=payment
            };
            result.Add(r);
            }
            return Ok(result);

        }
        [HttpPost("edit/order-and-other-forms")]
        public async Task<ActionResult> EditUnfinishedOrder([FromForm] SubmitListParcel? listParcel){
            //truong hop cho truoc orderId
            //allow change service,packages and locations
            //check prev service
            Console.WriteLine(listParcel.Submit1);
            Console.WriteLine("Submit1 la: ",listParcel.Submit1);
            SubmitEditUnfinishedOrder submit = JsonSerializer.Deserialize<SubmitEditUnfinishedOrder>(listParcel.Submit1);
            Console.WriteLine("Submit la: "+submit);
            Console.WriteLine(submit.SubmitOrder.OrderDate);

            var orderList = await _unitOfWork.OrderRepository.GetEntityByExpression(e=>e.Id==submit.OrderId,null,"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
            var expect = orderList.FirstOrDefault();
            Console.WriteLine("expect la",expect);
            var paid = expect.OrderPayment.OrderPaymentStatusId==1;
            if(paid){
                return BadRequest(new ErrorResponse(401,"Can't change paid orders"));
            }
            if(expect.ServiceId!=submit.SubmitOrder.ServiceId){
                Console.WriteLine("Expect ServiceId : "+expect.ServiceId);
                Console.WriteLine("Submit serviceId: "+submit.SubmitOrder.ServiceId);
                expect.ServiceId=submit.SubmitOrder.ServiceId;
                expect.PrePaid=submit.SubmitOrder.PrePaid;
                expect.OrderDate=DateTime.Now;
            _unitOfWork.Save();
            }else{
                expect.OrderDate=DateTime.Now;
                _unitOfWork.Save();
            }
            
            //changed service and prepaid
            //unlink prev packages and add new ones
            //order money -- no package
            //other service-but keep old package
            
            if(submit.SubmitOrder.PrePaid>0){ //money order
                var orderDetails = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(e=>e.OrderId==submit.OrderId,null,"Order,Parcel");
            if(orderDetails.Any()){
                foreach(var detail in orderDetails){
                    detail.ParcelId=null;
                }
                _unitOfWork.Save();
            }
            }else{ //another case -- but keep stuff
            //do nothing here
            //another case - update stuff
                if(listParcel!=null){
                    //unlink prev stuffs
                    var orderDetails = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(e=>e.OrderId==submit.OrderId,null,"Order,Parcel");
            if(orderDetails.Any()){
                foreach(var detail in orderDetails){
                    detail.ParcelId=null;
                }
                _unitOfWork.Save();
            }
                var customerId = listParcel.CustomerId;
            var folderName= "images/customer/"+customerId;
            var uploadsFolder = Path.Combine(_environment.WebRootPath,folderName);
            if(!Directory.Exists(uploadsFolder)){
                Directory.CreateDirectory(uploadsFolder);
            }
            foreach(var parcel in listParcel.List){
                var random1 = _helper.GenerateRandomString(16);
                Parcel p = new Parcel{
                ParcelName = parcel.ParcelName,
                Weight = parcel.Weight ,
                CustomerId=customerId,
                GenerateAuthentication=random1,
                Quantity=parcel.Quantity,
                TotalPriceAmountAssume=parcel.AmountAssume
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
            var latestList = await _unitOfWork.ParcelRepository.GetEntityByExpression(d=>d.GenerateAuthentication==random1&&d.CustomerId==customerId,null,"Customer");
            var parcelId= latestList.FirstOrDefault().Id;
            OrderDetail detail = new OrderDetail{
                ParcelId=parcelId,
                OrderId=submit.OrderId
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
            }
            }
           
            
            
            //change current order payment to status 4 if exist
            var payment = expect.OrderPaymentId;
            if(payment!=null){
                expect.OrderPaymentId=null;
            }
            //create new order payment
                    //xet diem dau va diem cuoi cua route //vi du 62-63
                    var startPlaceId = submit.SubmitAddressNew.LocationStartPlaceId;
                    var endPlaceId = submit.SubmitAddressNew.LocationEndPlaceId;
                    var Places = await _unitOfWork.AllPlacesInCountryRepository.GetEntityByExpression(null,null,null);
                    var startPlace = Places.Where(x=>x.Id==startPlaceId).FirstOrDefault();
                    var endPlace = Places.Where(x=>x.Id==endPlaceId).FirstOrDefault();
                    var routeChooseId = _handleRoute.ChooseRoute(startPlace,endPlace);
                    var comboList = await _unitOfWork.PricePerDistanceRepository.GetEntityByExpression(d=>d.Id==routeChooseId,null,null);
                    var combo = comboList.FirstOrDefault();
                    var agentList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(null,null,null);
                    var agent = agentList.Where(e=>e.Id==submit.SubmitAddressNew.DeliveryAgentId).FirstOrDefault();
                    var charges = agent.Charges.Value;
                    var maxWeight=agent.MaxFreeWeight;
                    var serviceList = await _unitOfWork.ServiceRepository.GetEntityByExpression(null,null,"DeliveryAgent");
                    var newServiceChosen = serviceList.Where(r=>r.Id==submit.SubmitOrder.ServiceId).FirstOrDefault();
                    var ServicePrice = newServiceChosen.Price;
                    //get subtotal 
                    IEnumerable<OrderDetail> parcelList = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(d=>d.OrderId==submit.OrderId,null,"Parcel");
                    var filter=parcelList.Where(x=>x.ParcelId.HasValue);
                    var weight = filter.Sum(x=>x.Parcel.Weight*x.Parcel.Quantity);
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
                        PrePaid=submit.SubmitOrder.PrePaid,
                        ServicePrice=ServicePrice,
                        DistanceCharges=distancePrice+charges,
                        TotalCharges=weightPlus+submit.SubmitOrder.PrePaid+ServicePrice+distancePrice,
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
                   var contactWard = WardList.Where(e=>e.Id==submit.SubmitAddressNew.LocationEndWardId).FirstOrDefault().Name;
                   var contactDistrict = DistrictList.Where(r=>r.Id==submit.SubmitAddressNew.LocationEndDistrictId).FirstOrDefault().Name;
                   var contactCountry = CountryList.Where(w=>w.Id==submit.SubmitAddressNew.LocationEndPlaceId).FirstOrDefault().Name;
                   var contactCityMark =  CountryList.Where(w=>w.Id==submit.SubmitAddressNew.LocationEndPlaceId).FirstOrDefault().Specila==true?"City":"Provine";
                   string ContactAddress = string.Concat(submit.SubmitAddressNew.LocationEndStreet,", ",contactWard," Ward ",contactDistrict," District ",contactCountry," ",contactCityMark);
                    var senderWard = WardList.Where(e=>e.Id==submit.SubmitAddressNew.LocationStartWardId).FirstOrDefault().Name;
                   var senderDistrict = DistrictList.Where(r=>r.Id==submit.SubmitAddressNew.LocationStartDistrictId).FirstOrDefault().Name;
                   var senderCountry = CountryList.Where(w=>w.Id==submit.SubmitAddressNew.LocationStartPlaceId).FirstOrDefault().Name;
                   var senderCityMark =  CountryList.Where(w=>w.Id==submit.SubmitAddressNew.LocationStartPlaceId).FirstOrDefault().Specila==true?"City":"Provine";
                   string SenderAddress = string.Concat(submit.SubmitAddressNew.LocationStartStreet,", ",senderWard," Ward ",senderDistrict," District ",senderCountry," ",senderCityMark);
                    InfoCombine contact = new InfoCombine{
                        FullName= submit.SubmitAddressNew.ContactName,
                        PhoneNumber=submit.SubmitAddressNew.ContactPhoneNumber,
                       Address=ContactAddress
                    };
                    InfoCombine sender = new InfoCombine{
                        FullName = submit.SubmitAddressNew.SenderName,
                        PhoneNumber = submit.SubmitAddressNew.SenderPhoneNumber,
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
                        expect.OrderPaymentId=expectPayment.Id;
                        expect.ContactAddress=contactString;
                        expect.SenderInfo=senderString;
                        expect.PricePerDistanceId=combo.Id;
                        expect.DeliveryAgentId=agent.Id;
                        _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500,"Error at order table"));
                    }

            
            return Ok();

        }
        [HttpGet("edit/order-and-other-forms/{orderId}")]
        public async Task<ActionResult<ReturnPayInfoParcel>> GetDataToEdit([FromRoute] string orderId){
            int Id=0;
            try
            {
                Id=int.Parse(orderId);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(400,"Invalid orderId"));
            }
            var orders = await _unitOfWork.OrderRepository.GetEntityByExpression(e=>e.Id==Id,null,"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
            if(!orders.Any()){
                return BadRequest(new ErrorResponse(404,"Can't find order with submitted orderId"));
            }
            var order = orders.FirstOrDefault();
            var orderDTO = _mapper.Map<Order,OrderDTO>(order);
            var paymentId =order.OrderPaymentId;
            ReturnPayment paymentDTO = new ReturnPayment();
            if(paymentId!=null){
                var payment = await _unitOfWork.OrderPaymentRepository.GetEntityByExpression(e=>e.Id==paymentId,null,"OrderPaymentStatus");
                 paymentDTO = _mapper.Map<OrderPayment,ReturnPayment>(payment.FirstOrDefault());
            }
            var result = new ReturnPayInfoParcel();
            List<ReturnParcel> p = new List<ReturnParcel>();
             string baseUrl = _httpContextAccessor.HttpContext.Request.Scheme+"://"+_httpContextAccessor.HttpContext.Request.Host;
            //get list of parcels
            var orderDetails = await _unitOfWork.OrderDetailRepository.GetEntityByExpression(w=>w.OrderId==Id,null,"Order,Parcel");
            if(orderDetails.Any()){
                var ids= orderDetails.Where(w=>w.ParcelId.HasValue).Select(e=>e.ParcelId);
                if(ids.Count()>0){
                    var parcelsList = await _unitOfWork.ParcelRepository.GetEntityByExpression(e=>ids.Contains(e.Id),null,null);
                    foreach(var parcel in parcelsList){
                         ReturnParcel c = new ReturnParcel{
                            Id=parcel.Id,
                            ParcelName=parcel.ParcelName,
                            Weight=parcel.Weight,
                            ImageUrl=baseUrl+'/'+parcel.ImageUrl,
                            Quantity=parcel.Quantity
                };
                p.Add(c);
                    }
               
                }
            }
            result.OrderDTO=orderDTO;
            result.OrderId=Id;
            result.ReturnParcels=p;
            result.ReturnPayment=paymentDTO;
            
            return Ok(result);
        }
    [HttpPost("edit/paid-orders")]
    //method change paid order details
    //cho phep doi address-not package
    public async Task<ActionResult> EditPaidOrder([FromForm] string submit1){
        Console.WriteLine("Chuoi string"+submit1);
            SubmitEditUnfinishedOrder submit = JsonSerializer.Deserialize<SubmitEditUnfinishedOrder>(submit1);
           
           var orders = await _unitOfWork.OrderRepository.GetEntityByExpression(o=>o.Id==submit.OrderId,null,"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
           if(!orders.Any()){
                return BadRequest(new ErrorResponse(404));
           }
           var order = orders.FirstOrDefault();
           var submitTime = submit.NewPickUpTime;
           if(submitTime>=order.OrderDate&&submitTime.HasValue){
            order.OrderDate=submitTime.Value;
            _unitOfWork.Save();
           }
            var WardList = await _unitOfWork.WardRepository.GetEntityByExpression(null,null,"District");
                   var DistrictList = await _unitOfWork.DistrictRepository.GetEntityByExpression(null,null,"AllPlacesInCountry");
                   var CountryList = await _unitOfWork.AllPlacesInCountryRepository.GetEntityByExpression(null,null,null);
                   var contactWard = "";
                   if(submit.SubmitAddressNew.LocationEndWardId!=-1){
                  contactWard= WardList.Where(e=>e.Id==submit.SubmitAddressNew.LocationEndWardId).FirstOrDefault().Name;
                   }
                   var contactDistrict = "";
                   if(submit.SubmitAddressNew.LocationEndDistrictId!=-1){
                  contactDistrict = DistrictList.Where(r=>r.Id==submit.SubmitAddressNew.LocationEndDistrictId).FirstOrDefault().Name;
                   }
                   var contactCountry = "";
                   if(submit.SubmitAddressNew.LocationEndPlaceId!=-1){
                   contactCountry= CountryList.Where(w=>w.Id==submit.SubmitAddressNew.LocationEndPlaceId).FirstOrDefault().Name;
                   }
                   var contactCityMark ="";
                   if(submit.SubmitAddressNew.LocationEndPlaceId!=-1){
                        contactCityMark= CountryList.Where(w=>w.Id==submit.SubmitAddressNew.LocationEndPlaceId).FirstOrDefault().Specila==true?"City":"Provine";
                   }
                   string ContactAddress = "";
                   if(submit.SubmitAddressNew.LocationEndPlaceId!=-1){
                         ContactAddress = string.Concat(submit.SubmitAddressNew.LocationEndStreet,", ",contactWard," Ward ",contactDistrict," District ",contactCountry," ",contactCityMark);
                   }
                   
                    var senderWard = "";
                    if(submit.SubmitAddressNew.LocationStartWardId!=-1){
                      senderWard=  WardList.Where(e=>e.Id==submit.SubmitAddressNew.LocationStartWardId).FirstOrDefault().Name;
                    }
                   var senderDistrict = "";
                   if(submit.SubmitAddressNew.LocationStartDistrictId!=-1){
                   senderDistrict= DistrictList.Where(r=>r.Id==submit.SubmitAddressNew.LocationStartDistrictId).FirstOrDefault().Name;
                   }
                   var senderCountry = "";
                   if(submit.SubmitAddressNew.LocationStartPlaceId!=-1){
                    senderCountry=CountryList.Where(w=>w.Id==submit.SubmitAddressNew.LocationStartPlaceId).FirstOrDefault().Name;
                   }
                   var senderCityMark="";
                   if(submit.SubmitAddressNew.LocationStartPlaceId!=-1){
                    senderCityMark = CountryList.Where(w=>w.Id==submit.SubmitAddressNew.LocationStartPlaceId).FirstOrDefault().Specila==true?"City":"Provine";
                   }
                     
                   string SenderAddress = "";
                   if(submit.SubmitAddressNew.LocationStartPlaceId!=-1){
                    SenderAddress=string.Concat(submit.SubmitAddressNew.LocationStartStreet,", ",senderWard," Ward ",senderDistrict," District ",senderCountry," ",senderCityMark);
                   }
                    InfoCombine contact = new InfoCombine{
                        FullName= submit.SubmitAddressNew.ContactName,
                        PhoneNumber=submit.SubmitAddressNew.ContactPhoneNumber,
                       Address=ContactAddress
                    };
                    InfoCombine sender = new InfoCombine{
                        FullName = submit.SubmitAddressNew.SenderName,
                        PhoneNumber = submit.SubmitAddressNew.SenderPhoneNumber,
                        Address=SenderAddress
                    };
                    var contactString = System.Text.Json.JsonSerializer.Serialize(contact);
                    var senderString = System.Text.Json.JsonSerializer.Serialize(sender);
                    if(submit.SubmitAddressNew.LocationEndPlaceId==-1&&submit.SubmitAddressNew.LocationStartPlaceId==-1){
                        //do nothing
                    }
                    else if(submit.SubmitAddressNew.LocationStartPlaceId==-1){
                        try
                    {
                        order.ContactAddress=contactString;
                        _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500,"Error at order table"));
                    }
                    }else if(submit.SubmitAddressNew.LocationEndPlaceId==-1){
                        try
                    {

                        order.SenderInfo=senderString;
                        _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500,"Error at order table"));
                    }
                    }else{
                         try
                    {
                        order.ContactAddress=contactString;
                        order.SenderInfo=senderString;
                        _unitOfWork.Save();
                    }
                    catch (System.Exception)
                    {
                        
                        return BadRequest(new ErrorResponse(500,"Error at order table"));
                    }
                    }
                   
                    return Ok();

        }

    }
}