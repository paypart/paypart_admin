using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public class UserRole
    {
        //public int id { get; set; }
        //[BsonId(IdGenerator = typeof(StringObjectIdGenerator))]

        [Key]
        public int _id { get; set; }
        public string role { get; set; }
    }
}
