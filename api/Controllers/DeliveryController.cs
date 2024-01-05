using api.DAl;
using api.DTO;
using api.Exceptions;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class DeliveryController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        public DeliveryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

    

[HttpGet("delivery-agent")]

        public async Task<ActionResult<IEnumerable<DeliveryAgent>>> GetAllDeliveryAgents()
        {
            IEnumerable<DeliveryAgent> agents = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(null, null, null);

            return Ok(agents);
        }
        [HttpGet("delivery-agent/find/{id}")]
        public async Task<ActionResult<DeliveryAgent>> GetDeliveryAgent([FromRoute] string id)
        {
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(400, "Invalid id"));
            }
            var deliveryAgent = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(e => e.Id == Id, null, null);
            if (!deliveryAgent.Any())
            {
                return BadRequest(new ErrorResponse(404, "Doesn't exist delivery agent id: "+ id));
            }
            return Ok(deliveryAgent.FirstOrDefault());
        }

        [HttpPost("delivery-agent")]

        public async Task<ActionResult> AddDeliveryAgent(DeliveryAgentDTO delivery)
        {
            //validate
            var name = delivery.AgentName;
            var existList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(d => d.AgentName == name, null, null);
            var exist = existList.Any();
            if (exist)
            {
                return BadRequest(new ErrorResponse(400, "Existed"));
            }
            DeliveryAgent d = new DeliveryAgent
            {
                AgentName = delivery.AgentName,
                VehicleNumber = delivery.VehicleNumber,
                AgentContactNumber = delivery.AgentContactNumber,

            };

            try
            {
                _unitOfWork.DeliveryAgentRepository.Add(d);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }
            return Ok("Add delivery agent success");

        }
        [HttpPut("delivery-agent")]
        public async Task<ActionResult> EditDeliveryAgent(DeliveryAgentDTO delivery)
        {
            var id = delivery.Id;
            var existList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(r => r.Id == id, null, null);
            var exist = existList.Any();
            if (!exist)
            {
                return BadRequest(new ErrorResponse(404, "delivery agent invalid||not exist"));
            }
            DeliveryAgent d = existList.FirstOrDefault();
            var validateList = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(d => d.Id != id && d.AgentName == delivery.AgentName, null, null);
            if (validateList.Any())
            {
                return BadRequest(new ErrorResponse(400, "delivery agent name existed!"));
            }

            d.AgentName = delivery.AgentName;
            d.VehicleNumber = delivery.VehicleNumber;
            d.AgentContactNumber = delivery.AgentContactNumber;
            try
            {
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }

            return Ok("Edit delivery agent success");

        }

        [HttpDelete("delivery-agent")]
        public async Task<ActionResult> DeleteDeliveryAgent(string id)
        {
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(400));
            }
            var deliveryAgent = await _unitOfWork.DeliveryAgentRepository.GetEntityByExpression(e => e.Id == Id, null, null);
            if (!deliveryAgent.Any())
            {
                return BadRequest(new ErrorResponse(404, "Doesn't exist delivery agent id: " + id));
            }
            try
            {
                _unitOfWork.DeliveryStatusRepository.DeleteById(Id);
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }
            return Ok("Delete delivery agent success");

        }



        [HttpGet("delivery-status")]

        public async Task<ActionResult<IEnumerable<DeliveryStatus>>> GetAllDeliveryStatus()
        {
            IEnumerable<DeliveryStatus> deliveryStatus = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(null, null, null);

            return Ok(deliveryStatus);
        }
        [HttpGet("delivery-status/find/{id}")]
        public async Task<ActionResult<DeliveryStatus>> GetDeliveryStatus([FromRoute] string id)
        {
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(400, "Invalid id"));
            }
            var deliveryStatus = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(e => e.Id == Id, null, null);
            if (!deliveryStatus.Any())
            {
                return BadRequest(new ErrorResponse(404, "Doesn't exist delivery status id: " + id));
            }
            return Ok(deliveryStatus.FirstOrDefault());
        }

        [HttpPost("delivery-status")]

        public async Task<ActionResult> AddDeliveryStatus(DeliveryStatusDTO delivery)
        {
            //validate
            var name = delivery.StatusName;
            var existList = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(d => d.StatusName == name, null, null);
            var exist = existList.Any();
            if (exist)
            {
                return BadRequest(new ErrorResponse(400, "Existed"));
            }
            DeliveryStatus d = new DeliveryStatus
            {
                StatusName = delivery.StatusName,
               

            };

            try
            {
                _unitOfWork.DeliveryStatusRepository.Add(d);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }
            return Ok("Add delivery status success");

        }
        [HttpPut("delivery-status")]
        public async Task<ActionResult> EditDeliveryStatus(DeliveryStatusDTO delivery)
        {
            var id = delivery.Id;
            var existList = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(r => r.Id == id, null, null);
            var exist = existList.Any();
            if (!exist)
            {
                return BadRequest(new ErrorResponse(404, "delivery status invalid||not exist"));
            }
            DeliveryStatus d = existList.FirstOrDefault();
            var validateList = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(d => d.Id != id && d.StatusName == delivery.StatusName, null, null);
            if (validateList.Any())
            {
                return BadRequest(new ErrorResponse(400, "delivery status name existed!"));
            }

            d.StatusName = delivery.StatusName;
           
            try
            {
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }

            return Ok("Edit delivery status success");

        }

        [HttpDelete("delivery-status")]
        public async Task<ActionResult> DeleteDeliveryStatus(string id)
        {
            int Id = 0;
            try
            {
                Id = int.Parse(id);
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(400));
            }
            var deliveryStatus = await _unitOfWork.DeliveryStatusRepository.GetEntityByExpression(e => e.Id == Id, null, null);
            if (!deliveryStatus.Any())
            {
                return BadRequest(new ErrorResponse(404, "Doesn't exist delivery status id: " + id));
            }
            try
            {
                _unitOfWork.DeliveryStatusRepository.DeleteById(Id);
                _unitOfWork.Save();
            }
            catch (System.Exception)
            {

                return BadRequest(new ErrorResponse(500));
            }
            return Ok("Delete delivery status success");

        }
    }
}