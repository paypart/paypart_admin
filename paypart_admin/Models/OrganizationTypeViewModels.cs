using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class OrganizationTypeViewModels
    {
        public OrganizationTypeViewModels()
        {
            Organization = new HashSet<OrganizationViewModels>();
        }

        public long Id { get; set; }
        public string Type { get; set; }

        public virtual ICollection<OrganizationViewModels> Organization { get; set; }
    }
}
