using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class Order{
        [Key]
        public int Id { get; set; }
        public string ContactAddress { get; set; }
        [Required]
        public int ServiceId { get; set; }
        public Service Service { get; set; }
        [Required]
        public string CustomerId { get; set; }
        public Customer Customer { get; set; }
        public decimal PrePaid { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        [Required]
        public int OrderStatusId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        
        public int? OrderPaymentId { get; set; }
        public OrderPayment? OrderPayment { get; set; }
    }
}