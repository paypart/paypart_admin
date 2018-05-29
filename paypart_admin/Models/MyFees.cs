using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fees.Models
{
    public class MyFees
    {
        public string code { get; set; }
        public string name { get; set; }
        public string payref { get; set; }
        public string item { get; set; }
        public string orgname { get; set; }
        public string curid { get; set; }
        public string cost { get; set; }
        public int termid { get; set; }
        public int classid { get; set; }
        //public List<FeeViewModels> fees { get; set; }
    }
}