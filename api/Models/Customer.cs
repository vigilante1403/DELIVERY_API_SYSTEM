using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Models{
    public class Customer{
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}