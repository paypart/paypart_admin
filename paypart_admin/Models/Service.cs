using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace paypart_admin.Models
{
    public class Service
    {
        public int id { get; set; }
        public int categoryid { get; set; }
        public int billerid { get; set; }
        public string title { get; set; }
        public int status { get; set; }
        public DateTime created_on { get; set; }

        public ServiceAccount serviceaccount { get; set; }
    }
}
