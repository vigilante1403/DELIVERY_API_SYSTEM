using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class ReturnDistrictDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string AllPlacesInCountryName { get; set; }
    }
}