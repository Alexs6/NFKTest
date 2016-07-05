using BundleTransformer.Core.Builders;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Resolvers;
using BundleTransformer.Core.Transformers;
using System.Web;
using System.Web.Optimization;

namespace NFKTest
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            var nullBuilder = new NullBuilder();
            var styleTransformer = new StyleTransformer();
            var scriptTransformer = new ScriptTransformer();
            var nullOrderer = new NullOrderer();

            BundleResolver.Current = new CustomBundleResolver();
            var cssBundle = new Bundle("~/Content/css");
            cssBundle.Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Site.css",
                      "~/Content/Bootstrap/kendo.common-bootstrap.min.css",
                      "~/Content/Bootstrap/kendo.bootstrap.min.css",
                      "~/Scripts/Toastr/toastr.min.css"
                      );
            cssBundle.Builder = nullBuilder;
            cssBundle.Transforms.Add(styleTransformer);
            cssBundle.Orderer = nullOrderer;
            bundles.Add(cssBundle);

            var jsMainBundle = new Bundle("~/bundles/js");
            jsMainBundle.Include(
                    "~/Scripts/jquery-1.11.1.min.js",
                    "~/Scripts/bootstrap.min.js",
                    "~/Scripts/jquery.unobtrusive-ajax.min.js",
                    "~/Scripts/Toastr/ToastrWrapper.js",
                    "~/Scripts/Toastr/toastr.min.js",
                    "~/Scripts/Kendo/kendo.web.min.js",
                    "~/Scripts/Kendo/kendo.culture.ru-RU.min.js",
                    "~/Scripts/Angular/angular.min.js",
                    "~/Scripts/Kendo/kendo.angular.min.js"
                      );
            jsMainBundle.Builder = nullBuilder;
            jsMainBundle.Transforms.Add(scriptTransformer);
            jsMainBundle.Orderer = nullOrderer;
            bundles.Add(jsMainBundle);

            var jsVendorAppBulk = new Bundle("~/bundles/jsVendorApp");
            jsVendorAppBulk.Include(
                        "~/Scripts/Angular/vendorApp.js"
                      );
            jsVendorAppBulk.Builder = nullBuilder;
            jsVendorAppBulk.Transforms.Add(scriptTransformer);
            jsVendorAppBulk.Orderer = nullOrderer;
            bundles.Add(jsVendorAppBulk);
        }
    }
}
