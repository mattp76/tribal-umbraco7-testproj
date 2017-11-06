using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(tribal.umbraco7.webapp.Startup))]
namespace tribal.umbraco7.webapp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
