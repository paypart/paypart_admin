using System;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;
using paypart_admin.Models;
using System.Net.Http;
using System.Text;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using paypart_admin.ViewModels;

namespace paypart_admin.Services
{
    public class Utility
    {
        IOptions<AppSetting> appsetting;
        HttpContext context;
        public Utility(IOptions<AppSetting> _appsetting,HttpContext _context)
        {
            appsetting = _appsetting;
            context = _context;
        }
        public async Task<User> validateUser(Login login)
        {
            User u = new User();
            string request = string.Empty;
            string responseTxt = string.Empty;
            string contentType = "application/json";
            string baseurl = appsetting.Value.user_url;

            using (var client = new HttpClient())
            {
                request = JsonHelper.toJson(login);
                var content = new StringContent(request, Encoding.UTF8, contentType);
                HttpResponseMessage response = await client.PostAsync(baseurl + "validateuser", content);
                
                responseTxt = await response.Content.ReadAsStringAsync();

                u = JsonConvert.DeserializeObject<User>(responseTxt);

                IEnumerable<string> values;
                if (response.Headers.TryGetValues("Token", out values))
                {
                    u.token = values.First();
                }
            }
            return u;
        }
        public async Task<User> activateUser(Login login)
        {
            User u = new User();
            string request = string.Empty;
            string responseTxt = string.Empty;
            string contentType = "application/json";
            string baseurl = appsetting.Value.user_url;

            using (var client = new HttpClient())
            {
                request = JsonHelper.toJson(login);
                var content = new StringContent(request, Encoding.UTF8, contentType);
                HttpResponseMessage response = await client.PostAsync(baseurl + "activateuser", content);
                responseTxt = await response.Content.ReadAsStringAsync();

                u = JsonConvert.DeserializeObject<User>(responseTxt);
            }
            return u;
        }
        public async Task<User> resetUser(ResetViewModel reset)
        {
            User u = new User();
            string request = string.Empty;
            string responseTxt = string.Empty;
            string contentType = "application/json";
            string baseurl = appsetting.Value.user_url;

            using (var client = new HttpClient())
            {
                request = JsonHelper.toJson(reset);
                var content = new StringContent(request, Encoding.UTF8, contentType);
                HttpResponseMessage response = await client.PostAsync(baseurl + "resetuser", content);
                //response.EnsureSuccessStatusCode();
                responseTxt = await response.Content.ReadAsStringAsync();

                u = JsonConvert.DeserializeObject<User>(responseTxt);
                //u = JsonHelper.fromJson<User>(responseTxt);
            }
            return u;
        }

        //public async Task<IEnumerable<BillerCategory>> getBillerCategories()
        //{
        //    List<BillerCategory> bc = new List<BillerCategory>();
        //    string request = string.Empty;
        //    string responseTxt = string.Empty;
        //    string baseurl = appsetting.Value.base_url;

        //    using (var client = new HttpClient())
        //    {
        //        HttpResponseMessage response = await client.GetAsync(baseurl + "billercategory/getallbillercategories");
        //        responseTxt = await response.Content.ReadAsStringAsync();

        //        bc = JsonConvert.DeserializeObject<List<BillerCategory>>(responseTxt);
        //    }
        //    return bc;
        //}
        //public async Task<IEnumerable<Country>> getCountries()
        //{
        //    List<Country> country = new List<Country>();
        //    string request = string.Empty;
        //    string responseTxt = string.Empty;
        //    string baseurl = appsetting.Value.base_url;

        //    using (var client = new HttpClient())
        //    {
        //        HttpResponseMessage response = await client.GetAsync(baseurl + "Country/GetAllCountries");
        //        responseTxt = await response.Content.ReadAsStringAsync();

        //        country = JsonConvert.DeserializeObject<List<Country>>(responseTxt);
        //    }
        //    return country;
        //}
        //public async Task<IEnumerable<State>> getStates()
        //{
        //    List<State> state = new List<State>();
        //    string request = string.Empty;
        //    string responseTxt = string.Empty;
        //    string baseurl = appsetting.Value.base_url;

        //    using (var client = new HttpClient())
        //    {
        //        HttpResponseMessage response = await client.GetAsync(baseurl + "State/GetAllStates");
        //        responseTxt = await response.Content.ReadAsStringAsync();

        //        state = JsonConvert.DeserializeObject<List<State>>(responseTxt);
        //    }
        //    return state;
        //}
        //public async Task<User> addUser(User user)
        //{
        //    User u = new User();
        //    user.datecreated = DateTime.Now;
        //    user.createdby = context.Session.GetString("_email");
        //    user.password = RandomString(appsetting.Value.pLength);
        //    string request = string.Empty;
        //    string responseTxt = string.Empty;
        //    string contentType = "application/json";
        //    string baseurl = appsetting.Value.user_url;

        //    using (var client = new HttpClient())
        //    {
        //        request = JsonHelper.toJson(user);
        //        var content = new StringContent(request, Encoding.UTF8, contentType);
        //        HttpResponseMessage response = await client.PostAsync(baseurl + "adduser", content);
        //        //response.EnsureSuccessStatusCode();
        //        responseTxt = await response.Content.ReadAsStringAsync();

        //        u = JsonConvert.DeserializeObject<User>(responseTxt);
        //        //u = JsonHelper.fromJson<User>(responseTxt);
        //    }
        //    return u;
        //}
        //public async Task<BillerCategory> addBillerCategory(BillerCategory category)
        //{
        //    BillerCategory bc = new BillerCategory();
        //    category.created_on = DateTime.Now;
        //    string request = string.Empty;
        //    string responseTxt = string.Empty;
        //    string contentType = "application/json";
        //    string baseurl = appsetting.Value.cat_url;

        //    using (var client = new HttpClient())
        //    {
        //        request = JsonHelper.toJson(category);
        //        var content = new StringContent(request, Encoding.UTF8, contentType);
        //        HttpResponseMessage response = await client.PostAsync(baseurl + "billercategory/addbillercategory", content);
        //        //response.EnsureSuccessStatusCode();
        //        responseTxt = await response.Content.ReadAsStringAsync();

        //        bc = JsonConvert.DeserializeObject<BillerCategory>(responseTxt);
        //        //u = JsonHelper.fromJson<User>(responseTxt);
        //    }
        //    return bc;
        //}
        //public async Task<Biller> addBiller(Biller biller)
        //{
        //    int status = 1;
        //    Biller bvm = new Biller();
        //    biller.created_on = DateTime.Now;
        //    biller.status = status;

        //    biller.billercontact.status = status;

        //    string request = string.Empty;
        //    string responseTxt = string.Empty;
        //    string contentType = "application/json";
        //    string baseurl = appsetting.Value.bill_url;

        //    using (var client = new HttpClient())
        //    {
        //        request = JsonHelper.toJson(biller);
        //        var content = new StringContent(request, Encoding.UTF8, contentType);
        //        HttpResponseMessage response = await client.PostAsync(baseurl + "addbiller", content);
        //        //response.EnsureSuccessStatusCode();
        //        responseTxt = await response.Content.ReadAsStringAsync();

        //        bvm = JsonConvert.DeserializeObject<Biller>(responseTxt);
        //        //u = JsonHelper.fromJson<User>(responseTxt);
        //    }
        //    return bvm;
        //}
        //public async Task<ServiceCategory> addServiceCategory(ServiceCategory category)
        //{
        //    ServiceCategory sc = new ServiceCategory();
        //    category.created_on = DateTime.Now;
        //    string request = string.Empty;
        //    string responseTxt = string.Empty;
        //    string contentType = "application/json";
        //    string baseurl = appsetting.Value.cat_url;

        //    using (var client = new HttpClient())
        //    {
        //        request = JsonHelper.toJson(category);
        //        var content = new StringContent(request, Encoding.UTF8, contentType);
        //        HttpResponseMessage response = await client.PostAsync(baseurl + "servicecategory/addservicecategory", content);
        //        //response.EnsureSuccessStatusCode();
        //        responseTxt = await response.Content.ReadAsStringAsync();

        //        sc = JsonConvert.DeserializeObject<ServiceCategory>(responseTxt);
        //        //u = JsonHelper.fromJson<User>(responseTxt);
        //    }
        //    return sc;
        //}
        //public async Task<Service> addService(Service service)
        //{
        //    int status = 1;
        //    Service svc = new Service();
        //    service.created_on = DateTime.Now;
        //    service.status = status;

        //    service.serviceaccount.status = status;

        //    string request = string.Empty;
        //    string responseTxt = string.Empty;
        //    string contentType = "application/json";
        //    string baseurl = appsetting.Value.svc_url;

        //    using (var client = new HttpClient())
        //    {
        //        request = JsonHelper.toJson(service);
        //        var content = new StringContent(request, Encoding.UTF8, contentType);
        //        HttpResponseMessage response = await client.PostAsync(baseurl + "addservice", content);
        //        //response.EnsureSuccessStatusCode();
        //        responseTxt = await response.Content.ReadAsStringAsync();

        //        //u = JsonHelper.fromJson<User>(responseTxt);
        //    }
        //    return svc;
        //}

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-$@!()[]?";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static string RandomStringOnly(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
