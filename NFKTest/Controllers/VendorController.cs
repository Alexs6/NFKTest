using NFKTest.Models;
using NFKTest.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NFKTest.Controllers
{
    public class VendorController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Vendor
        [HttpPost]
        public JsonResult GetVendorList()
        {
            var resultList = db.Vendors.Select(v => new { Id = v.Id, Name = v.Name + " | " + v.INN });
            return Json(resultList);
        }
        [HttpPost]
        public ActionResult GetVendorTotal(int vendorId)
        {
            var vendor = db.Vendors.FirstOrDefault(v => v.Id == vendorId);
            if (vendor == null)
            {
                return ReturnJsonMessageError("Поставщик не найден!");
            }
            var resultList = vendor.Supplies.GroupBy(s => s.Currency).Select(s => new VendorTotalViewModel
            {
                Currency = s.Key,
                Quantity = s.Count(),
                Total = s.Sum(k => k.Total)
            });

            return Json(resultList);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Virtual methods
        protected virtual JsonResult ReturnJsonMessageError(string message)
        {
            return ReturnJsonMessage(message, "Error");
        }

        protected virtual JsonResult ReturnJsonMessageSuccess(string message)
        {
            return ReturnJsonMessage(message, "Success");
        }

        private class JsonMessageResult
        {
            public string Message { get; set; }
            public string Status { get; set; }
        }
        private JsonResult ReturnJsonMessage(string message, string status)
        {
            var result = new JsonMessageResult
            {
                Message = message,
                Status = status
            };
            return Json(result, JsonRequestBehavior.DenyGet);
        }
        #endregion
    }

}