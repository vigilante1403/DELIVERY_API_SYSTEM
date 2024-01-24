using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class Parcel{
        [Key]
        public int Id { get; set; }
        public string ParcelName { get; set; }
        public decimal Weight { get; set; }
        public string? ImageUrl { get; set; }
        [Required]
        public string CustomerId { get; set; }
        public Customer Customer { get; set; }
        public string? GenerateAuthentication { get; set; }
        public int? Quantity { get; set; }=1;
        public decimal? TotalPriceAmountAssume { get; set; }
    }
}