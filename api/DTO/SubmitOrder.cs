namespace api.DTO{
    public class SubmitOrder{

        public int ServiceId { get; set; }
        public string CustomerId { get; set; }
        public decimal PrePaid { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
    }
}