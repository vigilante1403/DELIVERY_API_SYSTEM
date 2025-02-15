using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class Delivery{
        [Key]
        public int Id { get; set; }
        [Required]
        public int OrderId { get; set; }
        public Order Order { get; set; }
        [Required]
        public int DeliveryAgentId { get; set; }
        public DeliveryAgent DeliveryAgent { get; set; }

        [Required]
        public int OrderPaymentId { get; set; }
        public OrderPayment OrderPayment { get; set; }
        public DateTime PickUpDateTime { get; set; }
        public DateTime DeliveryDate { get; set; } //expect date
        [Required]
        public int DeliveryStatusId { get; set; }
        public DeliveryStatus DeliveryStatus { get; set; }
        public decimal? VPPMoney { get; set; }
        public int? CodeLocation { get; set; }
        public int? ZipCodeStart { get; set; }
        public int? ZipCodeEnd { get; set; }
        public bool? EmailDeliveryStart { get; set; }
        public bool? EmailDeliveryReached { get; set; }
        public string? ReceiveImage { get; set; }
    }
}