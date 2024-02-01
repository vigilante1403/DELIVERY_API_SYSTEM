using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class ReturnWardDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string DistrictName { get; set; }
        public int? ZipCode { get; set; }
    }
}