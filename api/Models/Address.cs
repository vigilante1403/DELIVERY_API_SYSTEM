using System.ComponentModel.DataAnnotations;

namespace api.Models{
   public class Address
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    [Required]
    public string CustomerId { get; set; }
    public Customer Customer { get; set; }
    
}
}
