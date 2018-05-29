using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public class State
    {
        public int id { get; set; }
        public int countryid { get; set; }
        public string code { get; set; }
        public string title { get; set; }
        public int status { get; set; }
        public DateTime created_on { get; set; }
    }
}
