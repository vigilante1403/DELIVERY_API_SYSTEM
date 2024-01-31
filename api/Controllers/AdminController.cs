using api.DAl;
using api.Data;
using api.DTO;
using api.Exceptions;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes ="AdminBearer,EmployeeBearer")]
    public class AdminController:ControllerBase{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        public AdminController(IUnitOfWork unitOfWork,IMapper mapper,IWebHostEnvironment environment,IHttpContextAccessor httpContextAccessor,
       UserManager<AppUser> userManager,ApplicationDbContext context,RoleManager<IdentityRole> roleManager
        ){
            _unitOfWork=unitOfWork;
            _mapper=mapper;
            _environment=environment;
            _httpContextAccessor=httpContextAccessor;
            _userManager=userManager;
            _context=context;
            _roleManager=roleManager;
        }
        //method get all don duoc dat trong hnay--click vao detail co chi tiet moi don + payment method
        //after retrieve filter -- don da duoc thanh toan - don chua thanh toan -- lich su chinh sua
        [HttpGet("order-created")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> RetrieveAllCreatedOrder(){
            var orderList = await _unitOfWork.OrderRepository.GetEntityByExpression(x=>x.SenderInfo!=null&&x.OrderPaymentId!=null&&x.DeliveryAgentId!=null&&x.PricePerDistanceId!=null,null,"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");

            return Ok(_mapper.Map<IEnumerable<Order>,IEnumerable<OrderDTO>>(orderList));
        }
        //method get all don duoc pick up hnay 
        //co the duoc filter bang all orderDtOS list
        //method get all don dang duoc van chuyen hnay--filter orderstatus=2
        //phan loai theo tung loai delivery-- filter theo delivery agent
        //method get all don da duoc delivered trong hnay
        // danh sach user tao account moi
        //ds account tat ca user
        [HttpGet("users/all")]
        public async Task<ActionResult<List<ReturnUser>>> RetrieveAllUsersCreated(){
            var userIdAndRole =  _context.UserRoles
            // .Include(wr=>wr.UserId)
            // .Include(wr=>(string)wr.RoleId)
            .ToList();
            var roles = _context.Roles
            // .Include(wr=>(string)wr.Id)
            // .Include(wr=>(string)wr.Name)
            .ToList();
            var users = _context.Users
            // .Include(wr=>(string)wr.Id)
            // .Include(wr=>(string)wr.DisplayName)
            // .Include(wr=>(string)wr.Email)
            // .Include(wr=>(string)wr.PasswordHash)
            .ToList();
            List<ReturnUser> list = new List<ReturnUser>();
            foreach(var user in userIdAndRole){
                var userId = user.UserId;
                var customers= await _unitOfWork.CustomerRepository.GetEntityByExpression(r=>r.Id==userId,null,null);
                if(!customers.Any()){
                    continue;
                }
                var userToFind = users.Where(e=>e.Id==userId).FirstOrDefault();
                var roleId = user.RoleId;
                var roleName = roles.Where(e=>e.Id==roleId).FirstOrDefault().Name;
                ReturnUser a = new ReturnUser{
                    Id=userId,
                    Email=userToFind.Email,
                    Password=userToFind.PasswordHash,
                    DisplayName=userToFind.DisplayName,
                    RoleName=roleName
                };
                list.Add(a);
            }
            Console.WriteLine("Total"+list.Count());
            return Ok(list);
        }
        [HttpPost("change-user-role")]
        public async Task<ActionResult> ChangeUserRole([FromBody] string email,string role){
            var user = await _userManager.FindByEmailAsync(email);
            await _userManager.AddToRoleAsync(user,role);
            if(role=="admin"||role=="emloyee"){
                await _userManager.RemoveFromRoleAsync(user,"user");
            }
            return Ok();

        }
        [HttpGet("delivery-created")]
        public async Task<ActionResult<IEnumerable<ReturnDelivery>>> RetrieveAllCreatedDeliveries(){
            IEnumerable<Order> ordersList = await _unitOfWork.OrderRepository.GetEntityByExpression(null,q=>q.OrderByDescending(w=>w.OrderDate),"Service,Customer,OrderStatus,OrderPayment,PricePerDistance,DeliveryAgent");
            var orderIdList = ordersList.Select(w=>w.Id);
            IEnumerable<Delivery> deliveryList = await _unitOfWork.DeliveryRepository.GetEntityByExpression(q=>orderIdList.Contains(q.OrderId),null,"Order,DeliveryAgent,OrderPayment,DeliveryStatus");
            return Ok(_mapper.Map<IEnumerable<Delivery>,IEnumerable<ReturnDelivery>>(deliveryList));
        }
        //lay don hang duoc tao vao hnay --delivery hoan thanh vao waiting payment cua order

        //lay delivery duoc pick up 
        //lay delivery duoc giao

        



    }
}