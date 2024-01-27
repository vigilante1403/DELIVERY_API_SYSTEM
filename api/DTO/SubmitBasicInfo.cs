namespace api.DTO{
    public class SubmitBasicInfo{
        public string? DisplayName { get; set; }
        public string Email { get; set; }
        public IFormFile? ImageUrl { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? BackupEmail { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Street { get; set; }
        public string? ZipCode { get; set; }
    }
}