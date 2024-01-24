namespace api.DTO{
    public class SubmitDelivery{
        // public string basketId { get; set; }
        public int OrderId { get; set; }
        public int? ZipCodeStart { get; set; }
        public int? ZipCodeEnd { get; set; }
        // public int AgentId { get; set; }
    }
}