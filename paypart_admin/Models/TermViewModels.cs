using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class TermViewModels
    {
        //public TermViewModels()
        //{
        //    Fee = new HashSet<FeeViewModels>();
        //}

        public long Id { get; set; }
        public long Orgid { get; set; }
        public string Name { get; set; }
        public string Startdate { get; set; }
        public string Enddate { get; set; }
        public int Status { get; set; }
        public string message { get; set; }

        //public virtual ICollection<FeeViewModels> Fee { get; set; }
        //public virtual OrganizationViewModels Org { get; set; }
    }
}
