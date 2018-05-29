using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class AddressViewModels
    {
        public long Id { get; set; }
        public long Orgid { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public int Stateid { get; set; }
        public int Countryid { get; set; }
        public string Postcode { get; set; }
        public int Status { get; set; }

        //public virtual OrganizationViewModels Org { get; set; }
    }
}
