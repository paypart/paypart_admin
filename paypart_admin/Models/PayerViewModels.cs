using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class PayerViewModels
    {
        public long Id { get; set; }
        public long Paymentid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public virtual PaymentViewModels Payment { get; set; }
    }
}
