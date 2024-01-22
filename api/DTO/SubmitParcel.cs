namespace api.DTO{
    public class SubmitParcel{
        public int Id { get; set; }
        public string ParcelName { get; set; }
        public decimal Weight { get; set; }
        public IFormFile Image { get; set; }
        public int? Quantity { get; set; }

    }
}