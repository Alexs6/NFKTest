using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NFKTest.Startup))]
namespace NFKTest
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
