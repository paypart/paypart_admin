using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using paypart_admin.Models;

namespace paypart_admin.ViewModels
{
    public class ServiceItemsViewModel
    {
        public string costitem { get; set; }
        public CostItem costitems { get; set; }
        //public List<CostItem> costitems { get; set; }
        public List<FieldItem> fielditems { get; set; }
    }
}
