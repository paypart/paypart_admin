using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace paypart_admin.Models
{
    public class OrgAccountViewModels
    {
        public long Id { get; set; }
        public long Orgid { get; set; }
        public string Bankcode { get; set; }
        public string Bankname { get; set; }    
        public string Accountnumber { get; set; }
        public string Accountname { get; set; }
        public string Accountref { get; set; }
        public int Status { get; set; }
    }
}