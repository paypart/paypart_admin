using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using paypart_admin.Models;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;

namespace paypart_admin.Services
{
    public enum Status
    {
        Pending,
        Active,
        Deleted
    }
    public class DAC
    {
        internal const string sec = "78cmr44uhgerhfg87fnshfwe09r83eur2i34toiyj4y548947432h4bfuyf67234uht48634ht378etdgbrhuh345t734576jtnuf786r3y";
        IOptions<AppSetting> appsetting;
        HttpContext context;
        public DAC(IOptions<AppSetting> _appsetting, HttpContext _context)
        {
            appsetting = _appsetting;
            context = _context;
        }
        public async Task<authData> Login(LoginViewModel login)
        {
            authData ad = new Models.authData();
            Utility utility = new Utility(appsetting, context);
            try
            {
                //string pass = hashPass(login.Password);
                string pass = login.Password;
                var ot = await utility.validateUser(new Login()
                {
                    password = login.Password,
                    email = login.Email
                });
                if (ot != null)
                {
                    ad.isAuth = ot.status == 1 || ot.status == 0;
                    ad.roleid = ot.role_id;
                    ad.isFirstLogin = ot.status == 0;
                    ad.username = ot.username;
                    ad.email = ot.email;
                    ad.billerid = ot.billerid;
                    ad.userid = ot._id;
                    ad.auth = ot.token;
                    ad.password = (ot.status == 0) ? login.Password : "";
                    ad.showAdmin = (ot.role_id == 1) ? "block" : "none";
                    ad.showDash = (ot.role_id == 1 || ot.role_id == 2) ? "block" : "none";
                    ad.showOrg = (ot.role_id == 1) ? "block" : "none";
                    ad.showFees = (ot.role_id == 1 || ot.role_id == 2) ? "block" : "none";
                    ad.showClass = (ot.role_id == 1 || ot.role_id == 2) ? "block" : "none";
                    ad.showTerm = (ot.role_id == 1 || ot.role_id == 2) ? "block" : "none";
                }
                ad.message = (ad.isAuth) ? "Login Successful" : "Login Failed";
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }
            return ad;
        }
        public async Task<authData> activateUser(LoginViewModel login)
        {
            authData adata = new Models.authData();
            Utility utility = new Utility(appsetting, context);

            try
            {
                var ot = await utility.activateUser(new Login()
                {
                    password = login.Changepwd,
                    email = login.Email,
                    id = login.id
                });

                if (ot != null)
                {
                    adata.isAuth = true;
                    adata.billerid = ot.billerid;
                    adata.roleid = ot.role_id;
                    adata.isFirstLogin = ot.status == 0;
                    adata.username = ot.username;
                    adata.email = ot.email;
                    adata.showAdmin = (ot.role_id == 1) ? "block" : "none";
                    adata.showDash = (ot.role_id == 1) ? "block" : "none";
                    adata.showOrg = (ot.role_id == 1) ? "block" : "none";
                    adata.showFees = (ot.role_id == 1 || ot.role_id == 2) ? "block" : "none";
                    adata.showClass = (ot.role_id == 1 || ot.role_id == 2) ? "block" : "none";
                    adata.showTerm = (ot.role_id == 1 || ot.role_id == 2) ? "block" : "none";
                }

            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }
            return adata;
        }
        public async Task<authData> resetPwd(ResetViewModel reset)
        {
            authData adata = new authData();
            Utility utility = new Utility(appsetting, context);

            try
            {
                string pwd = Utility.RandomString(appsetting.Value.pLength);
                var ot = await utility.resetUser(reset);
                if (ot != null)
                {
                    //ot.password = hashPass(pwd);

                    if (ot._id > 0)
                    {
                        //call notification service
                        adata.message = "success";
                    }

                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }
            return adata;
        }

    }
}
