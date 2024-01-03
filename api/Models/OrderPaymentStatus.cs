using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class OrderPaymentStatus{
        [Key]
        public int Id { get; set; }
        public string StatusName { get; set; }
    }
}