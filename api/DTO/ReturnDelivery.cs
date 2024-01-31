namespace api.DTO{
    public class ReturnDelivery{
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string DeliveryAgentName { get; set; }
        public int OrderPaymentId { get; set; }
        public DateTime PickUpDateTime { get; set; }
        public DateTime DeliveryDate { get; set; } //expect date
        public string DeliveryStatusName { get; set; }
        public decimal? CodMoney { get; set; }
        public string? ReceiveImage { get; set; }

    }
}