using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class ResetPassword{
        [Key]
        public int Id { get; set; }
        public string CustomerEmail { get; set; }
        public string OTP { get; set; }
        public DateTime CreatedAt { get; set; }=DateTime.Now;

    }
}