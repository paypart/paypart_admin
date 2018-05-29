using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using paypart_admin.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.HealthChecks;


namespace paypart_admin
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.Configure<AppSetting>(options =>
            {
                options.base_url = Configuration.GetSection("AppSetting:base_url").Value;
                options.user_url = Configuration.GetSection("AppSetting:user_url").Value;
                options.cat_url = Configuration.GetSection("AppSetting:cat_url").Value;
                options.bill_url = Configuration.GetSection("AppSetting:bill_url").Value;
                options.svc_url = Configuration.GetSection("AppSetting:svc_url").Value;
                options.pLength = Convert.ToInt32(Configuration.GetSection("AppSetting:pLength").Value);
            });

            //health check
            services.AddHealthChecks(checks =>
            {
                checks.AddValueTaskCheck("HTTP Endpoint", () => new
                ValueTask<IHealthCheckResult>(HealthCheckResult.Healthy("Ok")));
            });

            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromSeconds(180);
                options.Cookie.HttpOnly = true;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseSession();

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Login}/{LoginViewModel?}");
            });
        }
    }
}
