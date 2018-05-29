using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class OrganizationViewModels
    {
        public OrganizationViewModels()
        {
            Address = new HashSet<AddressViewModels>();
            //Class = new HashSet<ClassViewModels>();
            //Fee = new HashSet<FeeViewModels>();
            Phone = new HashSet<PhoneViewModels>();
            Email = new HashSet<EmailViewModels>();
            Account = new HashSet<OrgAccountViewModels>();
            //Term = new HashSet<TermViewModels>();
            //User = new HashSet<UserViewModels>();
        }

        public long Id { get; set; }
        public long Typeid { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public int Status { get; set; }

        public virtual ICollection<AddressViewModels> Address { get; set; }
        //public virtual ICollection<ClassViewModels> Class { get; set; }
        //public virtual ICollection<FeeViewModels> Fee { get; set; }
        public virtual ICollection<PhoneViewModels> Phone { get; set; }
        public virtual ICollection<EmailViewModels> Email { get; set; }
        public virtual ICollection<OrgAccountViewModels> Account { get; set; }
        //public virtual ICollection<TermViewModels> Term { get; set; }
        //public virtual ICollection<UserViewModels> User { get; set; }
        //public virtual OrganizationTypeViewModels Type { get; set; }
    }
}
