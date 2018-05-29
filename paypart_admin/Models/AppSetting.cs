using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace paypart_admin.Models
{
    public class AppSetting
    {
        public string base_url { get; set; }
        public string user_url { get; set; }
        public string cat_url { get; set; }
        public string bill_url { get; set; }
        public string svc_url { get; set; }
        public int pLength { get; set; }
    }
}
