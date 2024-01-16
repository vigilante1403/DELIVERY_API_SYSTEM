using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class AllPlacesInCountry{
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public Boolean Specila{get;set;}
        public int State { get; set; }

    }
}