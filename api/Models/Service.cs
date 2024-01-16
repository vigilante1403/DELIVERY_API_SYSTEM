using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class Service{
        [Key]
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public decimal Price { get; set; }
        public bool PrePaid { get; set; }
        public bool Collect { get; set; }
        public int DaysAdd { get; set; }
        public int? DeliveryAgentId { get; set; }
        public DeliveryAgent? DeliveryAgent { get; set; }
    }
}