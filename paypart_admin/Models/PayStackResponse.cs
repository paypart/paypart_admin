using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace paypart_admin.Models
{
    public class PayStackResponse
    {
        public bool status { get; set; }
        public string message { get; set; }
        public Data data { get; set; }
    }
    public class Data
    {
        public int id { get; set; }
        public string access_code { get; set; }
        public string reference { get; set; }
        public string amount { get; set; }
        public string currency { get; set; }
        public string transaction_date { get; set; }
        public string status { get; set; }
        public MetaData metadata { get; set; }
        public string domain { get; set; }
        public string gateway_response { get; set; }
        public string message { get; set; }
        public string channel { get; set; }
        public string ip_address { get; set; }
        public Log log { get; set; }
        public string fees { get; set; }
        public Authorization authorization { get; set; }
        public Customer customer { get; set; }
        public string plan { get; set; }
    }
    public class Authorization
    {
        public string authorization_code { get; set; }
        public string card_type { get; set; }
        public string bin { get; set; }
        public string last4 { get; set; }
        public string exp_month { get; set; }
        public string exp_year { get; set; }
        public string brand { get; set; }
        public string bank { get; set; }
        public string channel { get; set; }
        public bool reusable { get; set; }
        public string signature { get; set; }
        public string country_code { get; set; }
    }
    public class Customer
    {
        public string id { get; set; }
        public string customer_code { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public MetaData metadata { get; set; }
        public string risk_action { get; set; }
    }
    public class Log
    {
        public string time_spent { get; set; }
        public string attempts { get; set; }
        public string authentication { get; set; }
        public string errors { get; set; }
        public string success { get; set; }
        public string mobile { get; set; }
        public string[] input { get; set; }
        public string channel { get; set; }
        public List<History> history { get; set; }
    }
    public class History
    {
        public string type { get; set; }
        public string message { get; set; }
        public int time { get; set; }      
    }
    public class MetaData
    {
        public List<CustomFields> custom_fields { get; set; }
        public string referrer { get; set; }
    }
    public class CustomFields
    {
        public string display_name { get; set; }
        public string variable_name { get; set; }
        public string value { get; set; }
    }
}