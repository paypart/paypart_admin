using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class UserViewModels
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public long Orgid { get; set; }
        public int Roleid { get; set; }
        public string Datecreated { get; set; }
        public string Lastlogin { get; set; }
        public string Createdby { get; set; }
        public int Status { get; set; }

        //public virtual OrganizationViewModels Org { get; set; }
    }
}
