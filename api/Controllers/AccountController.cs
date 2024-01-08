using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using api.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<AppUser> _signinManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;

        public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, ITokenService tokenService, IUnitOfWork unitOfWork)
        {
            _signinManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;

        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody] RegisterDTO register)
        {
            var user = new AppUser
            {
                DisplayName = register.DisplayName,
                Email = register.Email,
                UserName = register.DisplayName
            };
            var result = await _userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new ErrorResponse(400));
            }
            await _userManager.AddToRoleAsync(user,"user");
            var newUser = await _userManager.FindByEmailAsync(user.Email);
            var totalAddress = await _unitOfWork.AddressRepository.GetAll();
            var total = totalAddress.Count();
            Customer customer = new Customer
            {
                Id = newUser.Id,
                Name = newUser.DisplayName,
                Address = new Address
                {
                    Id = total + 1,
                    FirstName = newUser.DisplayName,
                    LastName = "Unknown",
                    Street = "Unknown",
                    City = "Unknown",
                    State = "Unknown",
                    ZipCode = "Unknown"
                },
                Email = newUser.Email,
                PhoneNumber = "Unknown"
            };
            try
            {
                _unitOfWork.CustomerRepository.Add(customer);

            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }

            UserDTO returnUser = new UserDTO
            {
                Email = newUser.Email,
                DisplayName = newUser.DisplayName,
                Token = await _tokenService.CreateToken(newUser)
            };
            return Ok(returnUser);

        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user == null)
            {
                return Unauthorized(new ErrorResponse(401));
            }
            var result = await _signinManager.CheckPasswordSignInAsync(user, login.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new ErrorResponse(401));
            }
            UserDTO userReturn = new UserDTO
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = await _tokenService.CreateToken(user)
            };
            return userReturn;
        }
        [Authorize]
        [HttpGet("profile/{id}")]
        public async Task<ActionResult<Customer>> GetCustomerInfo(string id)
        {
            var customer = await _unitOfWork.CustomerRepository.GetEntityByExpression(e => e.Id == id, null, "Address");
            if (!customer.Any())
            {
                return BadRequest(new ErrorResponse(400, "Doesn't exist customer id: " + id));
            }
            return Ok(customer.FirstOrDefault());
        }
        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetAllCustomerInfo()
        {
            IEnumerable<Customer> customers = await _unitOfWork.CustomerRepository.GetEntityByExpression(null, null, "Address");

            if (!customers.Any())
            {
                return BadRequest(new ErrorResponse(400, "Doesn't exist customers: "));
            }
            return Ok(customers);
        }
        //doi password
       
        [HttpGet("generate-otp")]
        public async Task<ActionResult> UserAskToOTPGenerate([FromQuery] string userEmail){
         var otp= GenerateOTP();
        var sendResult= await SendEmailAsync(otp);
         //user get otp then pass to form otp submit on client, if matchs proceed to url change-password
         if(sendResult==true){
            ResetPassword otpCode = new ResetPassword{
                CustomerEmail=userEmail,
                OTP=otp,
            };
            try
            {
                _unitOfWork.ResetPasswordRepository.Add(otpCode);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
             return Ok("Sent otp to customer email");
         }else{
            return BadRequest(new ErrorResponse(500));
         }
           
        }
        //after customer input otp and proceed
        [HttpPost("verification-otp")]
        public async Task<ActionResult> ProceedToChangePassword([FromBody] SubmitReset otpSubmit){
            var latestotpList = await _unitOfWork.ResetPasswordRepository.GetEntityByExpression(d=>(d.OTP==otpSubmit.OTP)&&(d.CustomerEmail==otpSubmit.CustomerEmail),r=>r.OrderByDescending(q=>q.Id),null);
            var latest = latestotpList.FirstOrDefault();
            if(!latestotpList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            return Ok("Proceed to change password page");
        }
        //send email
        public static async Task<bool> SendEmailAsync(string otp,string userEmail="new.vytruong.1812@gmail.com")
    {
        
        try
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("new.vytruong.1812@gmail.com", "erya gvus chag rvok"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("new.vytruong.1812@gmail.com"),
                Subject = "Password Reset Token",
                Body = $"Your password reset token is:{otp}",
                IsBodyHtml = false,
            };

            mailMessage.To.Add(userEmail);

            await smtpClient.SendMailAsync(mailMessage);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            return false;
        }
    }
     public static string  GenerateOTP(){
       var random= RandomNumberGenerator.Create();
       byte[] data = new byte[6];
       random.GetBytes(data);
       var otp = BitConverter.ToUInt16(data,0).ToString("D6");

       Console.WriteLine(otp);
       return otp;
    }
    [HttpGet("token")]
    public async Task<string> GenerateJwtToken([FromQuery]string userEmail)
    {
        // Replace "your_secret_key" with a secure, secret key
        string secretKey = "iza4hdBuIKqpmftelAcEAB8pHrDVWOvrz1xBqPVkGl2GTZldYBFj66pKGyeOMVPt";

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(secretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("email", userEmail) }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    public static string ReadJwtToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
        var userEmail = "";
        if (jwtToken != null)
        {
            foreach (var claim in jwtToken.Claims)
            {
               if(claim.Type=="email"){
                userEmail=claim.Value;
               }
            }
            return userEmail;
        }
        return null;
    }
    //change password
    [HttpPost("3/r/change-password/{token}")]
    public async Task<ActionResult> UserChangePassword([FromRoute]string token,[FromBody] SubmitChangePassword newpassword){
       var email= ReadJwtToken(token);
       var user = await _userManager.FindByEmailAsync(email);
       if(user==null){
        return BadRequest(new ErrorResponse(404,"User not found"));
       }
       var rsToken = await _userManager.GeneratePasswordResetTokenAsync(user);
      var result= await _userManager.ResetPasswordAsync(user,rsToken,newpassword.newPassword);
      if(result.Succeeded){
        return Ok("Password changed");
    }else{
        return BadRequest(new ErrorResponse(500));
    }
      }
       
    }
}