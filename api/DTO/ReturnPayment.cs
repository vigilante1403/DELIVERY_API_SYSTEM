namespace api.DTO{
    public class ReturnPayment{
         public int Id { get; set; }
        public decimal SubTotal { get; set; }
        public decimal PrePaid { get; set; }
        public decimal ServicePrice { get; set; }
        public decimal DistanceCharges { get; set; }
        public decimal TotalCharges { get; set; }
        public string OrderPaymentStatus { get; set; }
       
    }
}