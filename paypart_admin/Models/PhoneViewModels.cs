using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class PhoneViewModels
    {
        public long Id { get; set; }
        public long Orgid { get; set; }
        public string Phonenumber { get; set; }
        public int Status { get; set; }

        //public virtual OrganizationViewModels Org { get; set; }
    }
}
