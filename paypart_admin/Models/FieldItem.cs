using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace paypart_admin.Models
{
    public class FieldItem
    {
        public int id { get; set; }
        public string label { get; set; }
        public string value { get; set; }
        public int fieldtype { get; set; }
        public string mandate { get; set; }
    }
}
