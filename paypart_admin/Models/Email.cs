//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace paypart_admin.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Email
    {
        public long id { get; set; }
        public long orgid { get; set; }
        public string emailaddress { get; set; }
        public int status { get; set; }
    
        public virtual Organization Organization { get; set; }
    }
}
