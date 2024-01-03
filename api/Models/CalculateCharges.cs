using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class CalculateCharges{
        [Key]
        public int Id { get; set; }
        public decimal BasicPricePerKg { get; set; }
        public int Year { get; set; }
    }
}