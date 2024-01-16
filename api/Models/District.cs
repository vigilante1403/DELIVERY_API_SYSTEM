using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class District{
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public int AllPlacesInCountryId { get; set; }
        public AllPlacesInCountry AllPlacesInCountry {get;set;}
    }
}