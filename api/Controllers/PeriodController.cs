using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers{
   
    [ApiController]
    [Route("api/[controller]")]
    public class PeriodController:ControllerBase{

         private static int counter = 0;
         public PeriodController(){
         }
       [HttpGet("data")]
    public IActionResult GetData()
    {
        // Replace this with actual data retrieval logic
        var data = new { Counter = counter++, Timestamp = DateTime.Now.ToString("HH:mm:ss") };
        return Ok(data);
    }
    }
}