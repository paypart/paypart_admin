using System;
using System.Collections.Generic;

namespace paypart_admin.Models
{
    public partial class PaymentViewModels
    {
        public PaymentViewModels()
        {
            Payer = new HashSet<PayerViewModels>();
        }

        public long Id { get; set; }
        public long Feesid { get; set; }
        public string Payref { get; set; }
        public string Gatewaypayref { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }

        public virtual ICollection<PayerViewModels> Payer { get; set; }
        //public virtual FeeViewModels Fees { get; set; }
    }
}
