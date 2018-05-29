using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace paypart_admin.Models
{
    public class CostItem
    {
        public int id { get; set; }
        public string name { get; set; }
        public string cost { get; set; }
        public int currency { get; set; }
        public string mandate { get; set; }
    }
}
