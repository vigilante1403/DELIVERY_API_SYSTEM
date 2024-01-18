using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers{
   
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController:ControllerBase{
         private readonly IUnitOfWork _unitOfWork;
         private readonly IMapper _mapper;
         public AddressController(IUnitOfWork unitOfWork, IMapper mapper){
            _unitOfWork=unitOfWork;
            _mapper=mapper;
         }
       [HttpGet("districts")]
       public async Task<ActionResult<IEnumerable<DistrictDTO>>> GetAllDistricts(){
        var districtList = await _unitOfWork.DistrictRepository.GetEntityByExpression(null,q=>q.OrderBy(r=>r.Name),"AllPlacesInCountry");
        return Ok(_mapper.Map<IEnumerable<District>,IEnumerable<DistrictDTO>>(districtList));
       }
       [HttpGet("wards")]
       public async Task<ActionResult<IEnumerable<WardDTO>>> GetAllWards(){
        var wardList = await _unitOfWork.WardRepository.GetEntityByExpression(null,q=>q.OrderBy(r=>r.Name),"District");
        return Ok(_mapper.Map<IEnumerable<Ward>,IEnumerable<WardDTO>>(wardList));
       }
       [HttpGet("countries")]
       public async Task<ActionResult<IEnumerable<AllPlacesInCountry>>> GetAllCountries(){
         var CountryList = await _unitOfWork.AllPlacesInCountryRepository.GetEntityByExpression(null,q=>q.OrderBy(r=>r.Name),null);
         return Ok(CountryList);
       }
       [HttpPost("district")]
       public async Task<ActionResult> AddNewDistrict([FromBody] DistrictDTO district){
        var exist = await _unitOfWork.DistrictRepository.GetEntityByExpression(e=>e.Name==district.Name&&e.AllPlacesInCountryId==district.AllPlacesInCountryId,null,"AllPlacesInCountry");
        if(exist.Any()){
          return BadRequest(new ErrorResponse(400,"Exist district with that name"));
        }
        District d = new District{
          Name=district.Name,
          AllPlacesInCountryId=district.AllPlacesInCountryId
        };
        try
        {
          _unitOfWork.DistrictRepository.Add(d);
        }
        catch (System.Exception)
        {
          
          return BadRequest(new ErrorResponse(500,"error at district table"));
        }
        return Ok();
       }
       [HttpPost("ward")]
       public async Task<ActionResult> AddNewWard([FromBody] WardDTO ward){
        var exist = await _unitOfWork.WardRepository.GetEntityByExpression(e=>e.Name==ward.Name&&e.DistrictId==ward.DistrictId,null,"District");
        if(exist.Any()){
          return BadRequest(new ErrorResponse(400,"Exist ward with that name"));
        }
        Ward d = new Ward{
          Name=ward.Name,
          DistrictId=ward.DistrictId
        };
        try
        {
          _unitOfWork.WardRepository.Add(d);
        }
        catch (System.Exception)
        {
          
          return BadRequest(new ErrorResponse(500,"error at ward table"));
        }
        return Ok();
       }
    }
}