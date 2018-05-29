using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace paypart_admin.Models
{
    public class Subaccount
    {
        public bool status { get; set; }
        public string message { get; set; }
        public SubAccountData data { get; set; }
    }
    public class SubAccountData
    {
        public int integration { get; set; }
        public string domain { get; set; }
        public string subaccount_code { get; set; }
        public string business_name { get; set; }
        public string description { get; set; }
        public string primary_contact_name { get; set; }
        public string primary_contact_email { get; set; }
        public string primary_contact_phone { get; set; }
        public string metadata { get; set; }
        public decimal percentage_charge { get; set; }
        public bool is_verified { get; set; }
        public string settlement_bank { get; set; }
        public string account_number { get; set; }
        public string settlement_schedule { get; set; }
        public bool active { get; set; }
        public bool migrate { get; set; }
        public int id { get; set; }
        public string createdAt { get; set; }
        public string updatedAt { get; set; }
    }
    public class SubAccountRequest
    {
        public string business_name { get; set; }
        public string settlement_bank { get; set; }
        public string account_number { get; set; }
        public double percentage_charge { get; set; }
    }
}

