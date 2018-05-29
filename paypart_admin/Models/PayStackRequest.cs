using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace paypart_admin.Models
{
    public class PayStackRequest
    {
        public string reference { get; set; }
        public int amount { get; set; }
        public string email { get; set; }
        public string authorization_code { get; set; }
    }
}