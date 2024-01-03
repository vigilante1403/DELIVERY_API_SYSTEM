using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class DeliveryAgent{
        [Key]
        public int Id { get; set; }
        public string AgentName { get; set; }
        public string VehicleNumber { get; set; }
        public string AgentContactNumber { get; set; }
    }
}