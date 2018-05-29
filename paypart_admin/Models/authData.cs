using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace paypart_admin.Models
{
    public class authData
    {
        public bool isAuth { get; set; }
        public string  auth { get; set; }
        public bool isFirstLogin { get; set; }
        public int userid { get; set; }
        public int billerid { get; set; }
        public int roleid { get; set; }
        public string username { get; set; }
        public string message { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string showDash { get; set; }
        public string showOrg { get; set; }
        public string showAdmin { get; set; }
        public string showFees { get; set; }
        public string showClass { get; set; }
        public string showTerm { get; set; }
        public string activepage { get; set; }
        public string pageheader { get; set; }
    }
}