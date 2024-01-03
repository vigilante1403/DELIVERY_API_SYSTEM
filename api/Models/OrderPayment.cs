using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class OrderPayment{
        [Key]
        public int Id { get; set; }
        public decimal SubTotal { get; set; }
        public decimal PrePaid { get; set; }
        public decimal ServicePrice { get; set; }
        public decimal DistanceCharges { get; set; }
        public decimal TotalCharges { get; set; }
        [Required]
        public int OrderPaymentStatusId { get; set; }
        public OrderPaymentStatus OrderPaymentStatus { get; set; }
    }
}