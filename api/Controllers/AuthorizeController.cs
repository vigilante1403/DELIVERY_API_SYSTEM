using api.DAl;
using api.Exceptions;
using api.Models;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;

namespace api.Controllers{
   
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes ="Bearer")]
    public class AuthorizeController:ControllerBase{
         private readonly IUnitOfWork _unitOfWork;
         public AuthorizeController(IUnitOfWork unitOfWork){
            _unitOfWork=unitOfWork;
         }
        [HttpGet("profile/1/{email}")]
        
        public async Task<ActionResult<Customer>> GetCustomerInfo([FromRoute]string email)
        {
            var customer = await _unitOfWork.CustomerRepository.GetEntityByExpression(e => e.Email == email, null, null);
            if (!customer.Any())
            {
                return BadRequest(new ErrorResponse(400, "Doesn't exist customer email: " + email));
            }
            return Ok(customer.FirstOrDefault());
        }
    }
}