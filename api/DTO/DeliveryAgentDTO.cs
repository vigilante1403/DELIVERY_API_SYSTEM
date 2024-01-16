namespace api.DTO{
    public class DeliveryAgentDTO
    {
        public int Id { get; set; }
        public string AgentName { get; set; }
        public string VehicleNumber { get; set; }
        public string AgentContactNumber { get; set; }
        public string? StartWorkingTime { get; set; }
        public string? EndWorkingTime { get; set; }
        public string? PickUpTimeInCity { get; set; }
        public string? PickUpTimeInOtherPlace { get; set; }
        public int? PickUpTimeForSpecialOrder { get; set; }
        public decimal? DayMayDelay { get; set; }
        public string? RequiredTimeForOrderToPickUp { get; set; }
        public decimal? Charges { get; set; }
        public decimal? MaxFreeWeight { get; set; }
    }
}