namespace api.Models{
    public class UserDTO
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string? ImageUrl { get; set; }
        public string? UserId { get; set; }
        public string? Role { get; set; }
        public string? TotalDeliveriesMade { get; set; }
        public string? PhoneNumber { get; set; }
    }
}