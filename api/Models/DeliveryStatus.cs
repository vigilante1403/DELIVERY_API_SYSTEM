using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class DeliveryStatus{
        [Key]
        public int Id { get; set; }
        public string StatusName { get; set; }
    }
}