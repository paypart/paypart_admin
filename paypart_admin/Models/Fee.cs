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
    
    public partial class Fee
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Fee()
        {
            this.Payments = new HashSet<Payment>();
        }
    
        public long id { get; set; }
        public long orgid { get; set; }
        public long termid { get; set; }
        public long classid { get; set; }
        public string item { get; set; }
        public string curid { get; set; }
        public decimal cost { get; set; }
        public int status { get; set; }
    
        public virtual Class Class { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual Organization Organization { get; set; }
        public virtual Term Term { get; set; }
    }
}
