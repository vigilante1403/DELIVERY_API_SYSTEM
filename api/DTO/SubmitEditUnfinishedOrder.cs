namespace api.DTO{
    public class SubmitEditUnfinishedOrder{
        public int OrderId { get; set; }
        public SubmitOrder? SubmitOrder { get; set; }
        public SubmitAddressNew SubmitAddressNew { get; set; }
        public DateTime? NewPickUpTime { get; set; }
      
    }
}