using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace paypart_admin.Models
{
    public class CountryViewModels
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Country { get; set; }
        public int Status { get; set; }
    }
}