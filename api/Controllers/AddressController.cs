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
    }
}