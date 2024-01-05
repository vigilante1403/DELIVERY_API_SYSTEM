namespace api.DTO{
    public class SubmitParcel{
        public string ParcelName { get; set; }
        public decimal Weight { get; set; }
        public IFormFile image { get; set; }

    }
}