namespace api.DTO{
    public class SubmitBasicInfo{
        public string? DisplayName { get; set; }
        public string Email { get; set; }
        public IFormFile? ImageUrl { get; set; }
    }
}