using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class OrderStatus{
        [Key]
        public int Id { get; set; }
        public string StatusName { get; set; }
    }
}