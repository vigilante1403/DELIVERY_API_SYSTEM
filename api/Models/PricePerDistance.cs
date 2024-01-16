using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class PricePerDistance{
        [Key]
        public int Id { get; set; }
        public string Route { get; set; }
        public decimal PricePerKg { get; set; }
        public decimal PriceRoute { get; set; }
        public decimal PriceAdd1Kg { get; set; }
        public string DeliveryTime { get; set; }
    }
}