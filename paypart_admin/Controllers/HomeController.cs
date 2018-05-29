using System;
using System.Linq;
using paypart_admin.Models;
using paypart_admin.Services;
using paypart_admin.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Http;

namespace paypart_admin.Controllers
{
    public class HomeController : Controller
    {
        IOptions<AppSetting> appsetting;
        public HomeController(IOptions<AppSetting> _appsetting)
        {
            appsetting = _appsetting;
        }

        [HttpGet]
        public IActionResult Index()
        {
            //return View();
            return PartialView("~/Views/Home/_Dashboard.cshtml");
        }

        [HttpPost]
        public IActionResult Index(Index index)
        {
            return View(index);
        }

        public IActionResult Dashboard()
        {
            return PartialView("~/Views/Home/_Dashboard.cshtml");
        }
        [HttpGet]
        public IActionResult AddBiller()
        {
            return PartialView("~/Views/Biller/_Add_Biller.cshtml");
        }
        //[HttpPost]
        //public async Task<IActionResult> AddBiller(Biller biller)
        //{
        //    Utility util = new Utility(appsetting, HttpContext);
        //    Biller bvm = await util.addBiller(biller);


        //    authData auth = new authData();
        //    auth.activepage = "AddBiller";
        //    auth.pageheader = "New Biller";
        //    auth.username = HttpContext.Session.GetString("_username");

        //    Index index = new Models.Index()
        //    {
        //        authdata = auth,
        //        biller = new Biller()
        //    };
        //    return View("Index", index);
        //}
        public IActionResult ManageBiller()
        {
            return PartialView("~/Views/Biller/_Manage_Biller.cshtml");
        }

        public IActionResult AddBillerCategory()
        {
            return PartialView("~/Views/BillerCategory/_Add_Biller_Category.cshtml");
        }

        //[HttpPost]
        //public async Task<IActionResult> AddBillerCategory(BillerCategory billercategory)
        //{
        //    Utility util = new Utility(appsetting, HttpContext);
        //    BillerCategory bc = await util.addBillerCategory(billercategory);


        //    authData auth = new authData();
        //    auth.activepage = "AddBillerCategory";
        //    auth.pageheader = "New Biller Category";
        //    auth.username = HttpContext.Session.GetString("_username");

        //    Index index = new Models.Index()
        //    {
        //        authdata = auth,
        //        billercategory = new Models.BillerCategory()
        //    };
        //    return View("Index", index);
        //}
        public IActionResult ManageBillerCategory()
        {
            return PartialView("~/Views/BillerCategory/_Manage_Biller_Category.cshtml");
        }

        //Administrator
        public IActionResult AddAdmin()
        {
            return PartialView("~/Views/Admin/_Add_Admin.cshtml");
        }
        //[HttpPost]
        //public async Task<IActionResult> AddAdmin(User user)
        //{
        //    Utility util = new Utility(appsetting, HttpContext);
        //    User u = await util.addUser(user);

        //    authData auth = new authData();
        //    auth.activepage = "AddAdmin";
        //    auth.pageheader = "New Administrator";
        //    auth.username = HttpContext.Session.GetString("_username");

        //    Index index = new Models.Index()
        //    {
        //        authdata = auth,
        //        user = new Models.User()
        //    };
        //    return View("Index", index);
        //}
        public IActionResult ManageAdmin()
        {
            return PartialView("~/Views/Admin/_Manage_Admin.cshtml");
        }



        //public IActionResult AddProduct()
        //{
        //    return PartialView("~/Views/Product/_Add_Product.cshtml");
        //}
        //public IActionResult ManageProduct()
        //{
        //    return PartialView("~/Views/Product/_Manage_Product.cshtml");
        //}

        //Service Category
        public IActionResult AddServiceCategory()
        {
            return PartialView("~/Views/ServiceCategory/_Add_Service_Category.cshtml");
        }
        //[HttpPost]
        //public async Task<IActionResult> AddServiceCategory(ServiceCategory servicecategory)
        //{
        //    Utility util = new Utility(appsetting, HttpContext);
        //    ServiceCategory svc = await util.addServiceCategory(servicecategory);

        //    authData auth = new authData();
        //    auth.activepage = "AddServiceCategory";
        //    auth.pageheader = "New Service Category";
        //    auth.username = HttpContext.Session.GetString("_username");

        //    Index index = new Models.Index()
        //    {
        //        authdata = auth,
        //        user = new Models.User()
        //    };
        //    return View("Index", index);
        //}
        public IActionResult ManageServiceCategory()
        {
            return PartialView("~/Views/ServiceCategory/_Manage_Service_Category.cshtml");
        }

        //Service
        public IActionResult AddService()
        {
            return PartialView("~/Views/Service/_Add_Service.cshtml", new Service());
        }
        //[HttpPost]
        //public async Task<IActionResult> AddService(Service service)
        //{
        //    Utility util = new Utility(appsetting, HttpContext);
        //    Service svc = await util.addService(service);


        //    authData auth = new authData();
        //    auth.activepage = "AddService";
        //    auth.pageheader = "New Service";
        //    auth.username = HttpContext.Session.GetString("_username");

        //    Index index = new Models.Index()
        //    {
        //        authdata = auth,
        //        service = new Service()
        //    };
        //    return View("Index", index);
        //}
        public IActionResult ManageService()
        {
            return PartialView("~/Views/Service/_Manage_Service.cshtml");
        }

        //Service Item
        public IActionResult AddServiceItem()
        {
            return PartialView("~/Views/Service/_Add_Service_Items.cshtml", new ServiceItemsViewModel());
        }
        [HttpPost]
        public IActionResult AddServiceItem(ServiceItemsViewModel sivm)
        {
            var serviceitem = sivm;
            return PartialView("~/Views/Service/_Add_Service_Items.cshtml");
        }
        public IActionResult ManageServiceItem()
        {
            return PartialView("~/Views/Product/_Manage_Service_Items.cshtml");
        }


        [HttpGet]
        //[AllowAnonymous]
        public IActionResult Login()
        {
            LoginViewModel login = new LoginViewModel();
            login.changediv = "none";
            login.logindiv = "block";
            login.resetdiv = "none";
            login.passdiv = "block";
            login.emailautofocus = "autofocus";
            login.changepwdautofocus = "";
            login.hKey = DAC.sec;
            return View(login);
        }
        [HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel login, string submit)
        {
            DAC dac = new DAC(appsetting, HttpContext);
            authData adata = new authData();

            if (submit == "Login")
            {
                login.emailautofocus = "autofocus";
                login.changepwdautofocus = "";
                login.changediv = "none";
                login.logindiv = "block";
                login.resetdiv = "none";
                login.passdiv = "block";

                if (!ModelState.IsValid)
                {
                    login.Message = "Login Failed";
                    return View(login);
                }

                try
                {
                    adata = await dac.Login(login);
                }
                catch (Exception)
                {

                }
                login.Message = adata.message;
                if (adata.isAuth)
                {
                    if (adata.isFirstLogin)
                    {
                        login.changediv = "block";
                        login.logindiv = "none";
                        login.emailautofocus = "";
                        login.changepwdautofocus = "autofocus";
                        login.Message = "";
                        login.Email = adata.email;
                        login.Password = adata.password;
                        login.id = adata.userid;
                        return View(login);
                    }
                    HttpContext.Session.SetString("_email", adata.email);
                    HttpContext.Session.SetString("_username", adata.username);
                    Index index = new Models.Index()
                    {
                        authdata = adata,
                        user = new Models.User()
                    };
                    return View("Index", index);
                }
            }

            if (submit == "Change")
            {
                login.changepwdautofocus = "autofocus";
                login.emailautofocus = "";
                login.passwordautofocus = "";
                login.confirmpwdautofocus = "";

                login.changediv = "block";
                login.logindiv = "none";
                login.resetdiv = "none";
                login.passdiv = "block";
                if (string.IsNullOrEmpty(login.Email))
                {
                    login.changepwdautofocus = "";
                    login.emailautofocus = "autofocus";
                    login.passwordautofocus = "";
                    login.confirmpwdautofocus = "";
                    login.Message = "Enter Email";
                    return View(login);
                }
                if (string.IsNullOrEmpty(login.Password))
                {
                    login.changepwdautofocus = "";
                    login.emailautofocus = "";
                    login.passwordautofocus = "autofocus";
                    login.confirmpwdautofocus = "";
                    login.Message = "Enter Old Password";
                    return View(login);
                }
                if (string.IsNullOrEmpty(login.Changepwd))
                {
                    login.Message = "Enter New Password";
                    return View(login);
                }
                if (string.IsNullOrEmpty(login.Confirmpwd))
                {
                    login.changepwdautofocus = "";
                    login.emailautofocus = "";
                    login.passwordautofocus = "";
                    login.confirmpwdautofocus = "autofocus";
                    login.Message = "Confirm New Password";
                    return View(login);
                }
                if (login.Changepwd.Length < 8)
                {
                    login.Message = "New Password must be at least 8 characters";
                    return View(login);
                }
                if (login.Changepwd != login.Confirmpwd)
                {
                    login.Message = "Password Mismatch";
                    return View(login);
                }

                try
                {
                    adata = await dac.activateUser(login);
                }
                catch (Exception ex)
                {
                    Console.Write(ex.ToString());
                }

                if (adata.isAuth)
                {
                    login.emailautofocus = "autofocus";
                    login.changepwdautofocus = "";
                    login.changediv = "none";
                    login.logindiv = "block";
                    login.resetdiv = "none";
                    login.passdiv = "block";

                    Index index = new Models.Index()
                    {
                        authdata = adata,
                        user = new Models.User()
                    };

                    return View("Index", index);
                }
                else
                {
                    login.Message = "Authentication Failed";
                    return View(login);
                }
            }
            return View(login);
        }
    }
}