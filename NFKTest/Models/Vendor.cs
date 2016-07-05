using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace NFKTest.Models
{
    public class Vendor
    {
        [Key]
        public int Id { get; set; }
        public string INN { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Supply> Supplies { get; set; }
    }
}