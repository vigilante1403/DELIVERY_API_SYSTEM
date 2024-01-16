namespace api.DTO{
    public class OrderDTO{
        public int Id { get; set; }
        public string? ContactAddress { get; set; }
        public string? SenderAddress { get; set; }
        public string Service { get; set; }
        public string CustomerId { get; set; }
        public decimal PrePaid { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string OrderStatus { get; set; }
        
        public int? OrderPaymentId { get; set; }
        
    }
}