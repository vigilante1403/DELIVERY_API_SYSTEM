namespace api.DTO{
    public class SubmitDelivery{
        public int Id { get; set; }=1;
        public string basketId { get; set; }
        public int OrderId { get; set; }
        public int AgentId { get; set; }
    }
}