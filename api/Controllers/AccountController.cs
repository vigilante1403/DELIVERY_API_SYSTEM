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
        private readonly IWebHostEnvironment _environment;
        private readonly IHelper _helper;

        public AccountController(IWebHostEnvironment environment,IHelper helper,SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, ITokenService tokenService, IUnitOfWork unitOfWork)
        {
            _signinManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;
            _helper=helper;
            _environment=environment;

        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody] RegisterDTO register)
        {
            var user = new AppUser
            {
                DisplayName = register.DisplayName,
                Email = register.Email,
                UserName = register.Email
            };
            var result = await _userManager.CreateAsync(user, register.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new ErrorResponse(400,"error in aspnet user"));
            }
            
            var newUser = await _userManager.FindByEmailAsync(user.Email);
            await _userManager.AddToRoleAsync(newUser,"user");
            var totalAddress = await _unitOfWork.AddressRepository.GetAll();
            var total = totalAddress.Count();
            Customer customer = new Customer
            {
                Id = newUser.Id,
                Name = newUser.DisplayName,
                Email = newUser.Email,
                PhoneNumber = "Unknown"
            };
            try
            {
                _unitOfWork.CustomerRepository.Add(customer);

            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500,"Error at customer table"));
            }
            Address a = new Address
                {
                    
                    FirstName = newUser.DisplayName,
                    LastName = "Unknown",
                    Street = "Unknown",
                    City = "Unknown",
                    State = "Unknown",
                    ZipCode = "Unknown",
                    CustomerId=newUser.Id
                };
                try
                {
                    _unitOfWork.AddressRepository.Add(a);
                }
                catch (System.Exception)
                {
                    
                    return BadRequest(new ErrorResponse(500,"error at address table"));
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
       
        
        
        [HttpGet("profile")]
        [Authorize]
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
            DateTime current = DateTime.Now;
            var deltaTime = current-latest.CreatedAt;
            int minuses = deltaTime.Minutes;
            if(minuses>5){
                return BadRequest(new ErrorResponse(401,"OTP expired!"));
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
            var token = await GenerateJwtToken(userEmail);
            var mailMessage = new MailMessage
            {
                From = new MailAddress("new.vytruong.1812@gmail.com"),
                Subject = "Password Reset Token",
                Body = $"Your password reset token is:{otp}\n If you're really ask for reseting password, access to this link: http://localhost:4200/user/1/reset/{token}",
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
    
    public static async Task<string> GenerateJwtToken(string userEmail)
    {
        api.services.Helper help = new api.services.Helper();
        var random = help.GenerateRandomString(8);
        string secretKey = "CqqXj0t7O2EziQwB16AYFyABPTvsZ9xzf8tWJdc2gwchqwb6gRR7BGZ3PMf5Jt7j5TbqZalHqsYpUiIwW7A380sDIpdUg2FzGFSBuX8z9"+random;

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
    [HttpPost("3/r/reset-password/{token}")]
    public async Task<ActionResult> UserChangePassword([FromRoute]string token,[FromBody] SubmitChangePassword newpassword){
       var email= ReadJwtToken(token);
       var user = await _userManager.FindByEmailAsync(email);
       if(user==null){
        return BadRequest(new ErrorResponse(404,"User not found"));
       }
       var expectList = await _unitOfWork.ResetPasswordRepository.GetEntityByExpression(d=>d.Authentication==token,null,null);
       if(!expectList.Any()){
            return BadRequest(new ErrorResponse(404));
       }
       var expect = expectList.FirstOrDefault();
       if(expect.Used2){
        return BadRequest(new ErrorResponse(401));
       }
       var rsToken = await _userManager.GeneratePasswordResetTokenAsync(user);
      var result= await _userManager.ResetPasswordAsync(user,rsToken,newpassword.newPassword);
      if(result.Succeeded){
        try
        {
            expect.Used2=true;
            _unitOfWork.Save();
        }
        catch (System.Exception)
        {
            
            return BadRequest(new ErrorResponse(500));
        }
        return Ok();
    }else{
        return BadRequest(new ErrorResponse(500));
    }
      }




    [HttpGet("token")]
    public async Task<ActionResult<TokenDTO>> GenerateJwtTokenP([FromQuery]string userEmail)
    {
        var help = _helper.GenerateRandomString(8);
        string secretKey = "CqqXj0t7O2EziQwB16AYFyABPTvsZ9xzf8tWJdc2gwchqwb6gRR7BGZ3PMf5Jt7j5TbqZalHqsYpUiIwW7A380sDIpdUg2FzGFSBuX8z9"+help;

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(secretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("email", userEmail) }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        Console.WriteLine(tokenHandler.WriteToken(token));
         TokenDTO Token = new TokenDTO
            {
               
                token =tokenHandler.WriteToken(token),
            };
       
        return Ok(Token);
    }



    //forgot password
    [HttpGet("3/r/forgot-password/findemail")]
    public async Task<ActionResult> FindAccountByEmail(string email){
        var user = await _userManager.FindByEmailAsync(email);
        if(user==null){
        return BadRequest(new ErrorResponse(404,"User not found"));
       }
        return Ok(user);
    }
    [HttpPost("sendMail-forgot")]
     public static  async Task<bool> SendEmailForgotPasswordAsync(string otp,string userEmail,
     string token)
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
                Subject = "Password Forgot Token",
                Body = $"Your password reset token is:{otp}\n If you're really ask for reseting password, access to this link: http://localhost:4200/user/1/reset/{token}",
                IsBodyHtml = false,
            };

            mailMessage.To.Add(new MailAddress(userEmail));

            await smtpClient.SendMailAsync(mailMessage);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            return false;
        }
    }

     [HttpGet("forgot-generate-otp")]
        public async Task<ActionResult> UserAskToOTPPasswordGenerate(string userEmail){
         var otp= GenerateOTP();
          var token = await GenerateJwtToken(userEmail);
        var sendResult= await SendEmailForgotPasswordAsync(otp,userEmail,token);
         //user get otp then pass to form otp submit on client, if matchs proceed to url change-password
         if(sendResult==true){
            ResetPassword otpCode = new ResetPassword{
                CustomerEmail=userEmail,
                OTP=otp,
                Authentication=token
            };
            try
            {
                _unitOfWork.ResetPasswordRepository.Add(otpCode);
            }
            catch (System.Exception)
            {
                
                return BadRequest(new ErrorResponse(500));
            }
             return Ok();
         }else{
            return BadRequest(new ErrorResponse(500));
         }
           
        }

         [HttpPost("verification-otp-f")]
        public async Task<ActionResult> ProceedToForgotPassword([FromBody] SubmitReset otpSubmit){
            var expectList = await _unitOfWork.ResetPasswordRepository.GetEntityByExpression(d=>(d.OTP==otpSubmit.OTP)&&(d.CustomerEmail==otpSubmit.CustomerEmail)&&(d.Authentication==otpSubmit.Authentication),null,null);
            var expect = expectList.FirstOrDefault();
            if(!expectList.Any()){
                return BadRequest(new ErrorResponse(404));
            }
            DateTime current = DateTime.Now;
            var deltaTime = current-expect.CreatedAt;
            int minuses = deltaTime.Minutes;
            if(expect.used){
                return BadRequest(new ErrorResponse(401,"OTP used!"));

            }
           
            if(minuses>5){
                return BadRequest(new ErrorResponse(401,"OTP expired!"));
            }
            expect.used=true;
            // _unitOfWork.ResetPasswordRepository.Update(expect);
            _unitOfWork.Save();

            return Ok();
        }

        [HttpPost("3/r/change-password")]
    public async Task<ActionResult> UserNewPassword([FromBody] SubmitNewPassword newpassword){
    //    var email= ReadJwtToken(token);
       var user = await _userManager.FindByEmailAsync(newpassword.email);
       if(user==null){
        return BadRequest(new ErrorResponse(404,"User not found"));
       }
       
    //    var rsToken = await _userManager.GeneratePasswordResetTokenAsync(user);
      var result= await _userManager.ChangePasswordAsync(user,newpassword.oldPassword,newpassword.newPassword);
      if(result.Succeeded){
        return Ok();
    }else{
        return BadRequest(new ErrorResponse(500));
    }
      }
      [HttpPost("update-basic-info")]
      public async Task<ActionResult> UpdateUserBasicInfo([FromForm] SubmitBasicInfo submit){
        
        var user = await _userManager.FindByEmailAsync(submit.Email);
        var customerId="";
        if(user!=null){
             customerId = user.Id;
             user.DisplayName=submit.DisplayName;
             await _userManager.UpdateAsync(user);
        var folderName= "images/customer/"+customerId;
            var uploadsFolder = Path.Combine(_environment.WebRootPath,folderName);
            if(!Directory.Exists(uploadsFolder)){
                Directory.CreateDirectory(uploadsFolder);
            }
                if(submit.ImageUrl.Length>0){
                     var filePath = Path.Combine(uploadsFolder, submit.ImageUrl.FileName);
                
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    submit.ImageUrl.CopyTo(fileStream);
                }
                var customerList = await _unitOfWork.CustomerRepository.GetEntityByExpression(e=>e.Id==customerId,null,null);
                if(!customerList.Any()){
                    return BadRequest(new ErrorResponse(404));
                }
                var customer = customerList.FirstOrDefault();
                try
                {
                    customer.Name=submit.DisplayName;
                customer.ImageUrl=filePath;
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