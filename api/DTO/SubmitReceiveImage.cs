namespace api.DTO{
    public class SubmitReceiveImage{
        public string OrderId { get; set; }
        public IFormFile ImageUrl { get; set; }
    }
}