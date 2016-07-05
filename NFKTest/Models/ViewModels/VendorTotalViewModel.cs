using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NFKTest.Models.ViewModels
{
    public class VendorTotalViewModel
    {
        public int Quantity { get; set; }
        public string Currency { get; set; }
        public decimal Total { get; set; }
    }
}