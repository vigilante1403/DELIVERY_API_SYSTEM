using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Routing.Patterns;

namespace api.Models{
    public class Ward{
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public int DistrictId { get; set; }
        public District District { get; set; }
    }
}