using System.ComponentModel.DataAnnotations;

namespace api.Models{
public class CancelOrderSubmittedByCustomer{
    [Key]
    public int Id { get; set; }
    [Required]
    public int OrderId { get; set; }
    public Order Order { get; set; }
    public string? Reason { get; set; }
    public bool Check { get; set; }
}
}