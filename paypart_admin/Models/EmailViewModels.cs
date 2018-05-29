using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace paypart_admin.Models
{
    public class EmailViewModels
    {
        public long Id { get; set; }
        public long Orgid { get; set; }
        public string Emailaddress { get; set; }
        public int Status { get; set; }

        //public virtual OrganizationViewModels Org { get; set; }
    }
}