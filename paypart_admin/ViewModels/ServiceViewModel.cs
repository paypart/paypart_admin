using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using paypart_admin.Models;

namespace paypart_admin.ViewModels
{
    public class ServiceViewModel
    {
        public Service service { get; set; }
        public ServiceAccount billeraccount { get; set; }
    }
}
