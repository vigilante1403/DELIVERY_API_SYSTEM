using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using api.services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api. Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController:ControllerBase{
        private readonly SignInManager<AppUser> _signinManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;
        public AccountController(SignInManager<AppUser> signInManager,UserManager<AppUser> userManager,ITokenService tokenService,IUnitOfWork unitOfWork){
            _signinManager=signInManager;
            _userManager=userManager;
            _tokenService=tokenService;
            _unitOfWork=unitOfWork;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody]RegisterDTO register){
            var user = new AppUser{
                DisplayName=register.DisplayName,
                Email=register.Email,
                UserName = register.DisplayName
            };
            var result = await _userManager.CreateAsync(user,register.Password);
            if(!result.Succeeded){
                return BadRequest(new ErrorResponse(400));
            }
            var newUser = await _userManager.FindByEmailAsync(user.Email);
            var totalAddress = await _unitOfWork.AddressRepository.GetAll();
            var total = totalAddress.Count();
            Customer customer = new Customer{
                Id = newUser.Id,
                Name = newUser.DisplayName,
                Address = new Address{
                    Id = total+1,
                    FirstName= newUser.DisplayName,
                    LastName = "Unknown",
                    Street = "Unknown",
                    City="Unknown",
                    State="Unknown",
                    ZipCode="Unknown"
                },
                Email = newUser.Email,
                PhoneNumber="Unknown"
            };
            try
            {
                 _unitOfWork.CustomerRepository.Add(customer);

            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
           
            UserDTO returnUser = new UserDTO{
                Email = newUser.Email,
                DisplayName=newUser.DisplayName,
                Token = _tokenService.CreateToken(newUser)
            };
            return Ok(returnUser);
           
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login){
            var user = await _userManager.FindByEmailAsync(login.Email);
            if(user==null){
                return Unauthorized(new ErrorResponse(401));
            }
            var result = await _signinManager.CheckPasswordSignInAsync(user,login.Password,false);
            if(!result.Succeeded){
                return Unauthorized(new ErrorResponse(401));
            }
            UserDTO userReturn = new UserDTO{
                Email = user.Email,
                DisplayName=user.DisplayName,
                Token = _tokenService.CreateToken(user)
            };
            return userReturn;
        }
    }
}