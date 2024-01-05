namespace api.DTO{
    public class SubmitEditOrder{
        public int Id { get; set; }
        public string ContactAddress { get; set; }
        public int ServiceId { get; set; }
        public string? ServiceName { get; set; }
        public decimal PrePaid { get; set; }
    }
}