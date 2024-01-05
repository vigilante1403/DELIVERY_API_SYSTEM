namespace api.DTO{
    public class SubmitListParcel{
        public List<SubmitParcel> list { get; set; }
        public int OrderId { get; set; }
        public string CustomerId { get; set; }
    }
}