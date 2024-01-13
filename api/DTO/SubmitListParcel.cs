namespace api.DTO{
    public class SubmitListParcel{
        public List<SubmitParcel> List { get; set; }
        public string OrderId { get; set; }
        public string CustomerId { get; set; }
    }
}