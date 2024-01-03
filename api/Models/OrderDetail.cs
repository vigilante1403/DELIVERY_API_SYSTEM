using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class OrderDetail{
        [Key]
        public int Id { get; set; }
        [Required]
        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int? ParcelId { get; set; }
        public Parcel? Parcel { get; set; }
    }
}