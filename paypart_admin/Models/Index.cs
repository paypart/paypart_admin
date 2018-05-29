using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using paypart_admin.ViewModels;

namespace paypart_admin.Models
{
    public class Index
    {
        public authData authdata { get; set; }
        public User user { get; set; }
        public BillerCategory billercategory { get; set; }
        public Biller biller { get; set; }
        public ServiceCategory servicecategory { get; set; }
        public Service service { get; set; }
    }
}
