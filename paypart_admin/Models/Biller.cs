using System;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace paypart_admin.Models
{
    public class Biller
    {
        public int id { get; set; }
        public string title { get; set; }
        public string logo { get; set; }
        public int category_id { get; set; }
        public DateTime created_on { get; set; }
        public int status { get; set; }

        public BillerContact billercontact { get; set; }

    }
}
