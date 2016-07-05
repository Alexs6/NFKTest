using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NFKTest.Models
{
    public class Supply
    {
        [Key]
        public int Id { get; set; }
        public string Number { get; set; }

        public string Currency { get; set; }
        public decimal Total { get; set; }
        public virtual Vendor Vendor { get; set; }
    }
}