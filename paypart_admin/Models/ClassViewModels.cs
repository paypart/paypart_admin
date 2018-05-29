using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class ClassViewModels
    {
        //public ClassViewModels()
        //{
        //    Fee = new HashSet<FeeViewModels>();
        //}

        public long Id { get; set; }
        public long Orgid { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
        public string message { get; set; }

        //public virtual ICollection<FeeViewModels> Fee { get; set; }
        //public virtual OrganizationViewModels Org { get; set; }
    }
}
