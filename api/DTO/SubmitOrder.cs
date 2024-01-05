namespace api.DTO{
    public class SubmitOrder{
        public string ContactAddress { get; set; }
        public int ServiceId { get; set; }
        public string CustomerId { get; set; }
        public decimal PrePaid { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
    }
}