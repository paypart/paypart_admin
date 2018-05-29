using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using paypart_admin.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace paypart_admin.ViewModels
{
    public class BillerViewModel
    {
        public Biller biller { get; set; }
        public BillerContact billercontact { get; set; }
    }
}
