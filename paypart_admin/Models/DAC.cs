using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Reflection;
using System.Net.Http.Headers;
using System.Net;

namespace paypart_admin.Models
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
        string feesconn = ConfigurationManager.ConnectionStrings["feesDBEntities"].ToString();
        string payStackBaseURL = ConfigurationManager.AppSettings["payStackBaseURL"].ToString();
        public authData Login(LoginViewModel login)
        {
            authData ad = new Models.authData();
            try
            {
                //string pass = hashPass(login.Password);
                string pass = login.Password;
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Users.Where(s => (s.status == (int)Status.Active || s.status == (int)Status.Pending) && s.password == pass && s.email == login.Email).ToList().FirstOrDefault();
                    if (ot != null)
                    {
                        ot.lastlogin = DateTime.Now;
                        ie.SaveChanges();

                        ad.isAuth = true;
                        ad.orgid = (int)ot.orgid;
                        ad.roleid = ot.roleid;
                        ad.isFirstLogin = ot.status == 0;
                        ad.username = ot.username;
                        ad.email = ot.email;
                        ad.password = (ot.status == 0) ? login.Password : "";
                        ad.showAdmin = (ot.roleid == 1) ? "block" : "none";
                        ad.showDash = (ot.roleid == 1 || ot.roleid == 2) ? "block" : "none";
                        ad.showOrg = (ot.roleid == 1) ? "block" : "none";
                        ad.showFees = (ot.roleid == 1 || ot.roleid == 2) ? "block" : "none";
                        ad.showClass = (ot.roleid == 1 || ot.roleid == 2) ? "block" : "none";
                        ad.showTerm = (ot.roleid == 1 || ot.roleid == 2) ? "block" : "none";
                    }
                    ad.message = (ad.isAuth) ? "Login Successful" : "Login Failed";
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return ad;
        }
        public authData activateUser(LoginViewModel login)
        {
            authData adata = new Models.authData();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    string pass = hashPass(login.Password);
                    var ot = ie.Users.Where(s => (s.status == (int)Status.Pending) && s.password == pass && s.email == login.Email).ToList().FirstOrDefault();
                    if (ot != null)
                    {
                        ot.status = 1;
                        ot.lastlogin = DateTime.Now;
                        ot.password = hashPass(login.Changepwd);
                        ie.SaveChanges();

                        adata.isAuth = true;
                        adata.orgid = (int)ot.orgid;
                        adata.roleid = ot.roleid;
                        adata.isFirstLogin = ot.status == 0;
                        adata.username = ot.username;
                        adata.email = ot.email;
                        adata.showAdmin = (ot.roleid == 1) ? "block" : "none";
                        adata.showDash = (ot.roleid == 1) ? "block" : "none";
                        adata.showOrg = (ot.roleid == 1) ? "block" : "none";
                        adata.showFees = (ot.roleid == 1 || ot.roleid == 2) ? "block" : "none";
                        adata.showClass = (ot.roleid == 1 || ot.roleid == 2) ? "block" : "none";
                        adata.showTerm = (ot.roleid == 1 || ot.roleid == 2) ? "block" : "none";
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return adata;
        }
        public authData resetPwd(ResetViewModel login)
        {
            authData adata = new Models.authData();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    string pwd = RandomString(Convert.ToInt32(ConfigurationManager.AppSettings["pLength"]));
                    var ot = ie.Users.Where(s => (s.status == (int)Status.Active) && s.email == login.Email).ToList().FirstOrDefault();
                    if (ot != null)
                    {
                        ot.status = 0;
                        ot.password = hashPass(pwd);
                        ie.SaveChanges();

                        if (ot.id > 0)
                        {
                            string bodyfilename = ConfigurationManager.AppSettings["resetBodyFilename"].ToString();
                            string bodypath = HostingEnvironment.MapPath("~/Email/" + bodyfilename);
                            string bodyText = System.IO.File.ReadAllText(bodypath);
                            string orgName = getOrgById((int)ot.orgid).Name;
                            bodyText = bodyText.Replace(":Organization", orgName).Replace(":peeword", pwd);

                            string _from = ConfigurationManager.AppSettings["_from"].ToString();
                            string _pwd = ConfigurationManager.AppSettings["_pwd"].ToString();
                            string _subject = ConfigurationManager.AppSettings["reset_subject"].ToString();
                            string _uname = ConfigurationManager.AppSettings["_uname"].ToString();

                            EmailMetaData data = new EmailMetaData()
                            {
                                appname = "Feesng.com",
                                body = bodyText,
                                fromaddress = _from,
                                isHtml = true,
                                peeword = _pwd,
                                subject = _subject,
                                toaddress = login.Email,
                                uname = _uname,

                            };
                            try
                            {
                                SendMail(data);
                            }
                            catch (Exception)
                            {

                            }
                            adata.message = "success";
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return adata;
        }
        public List<OrganizationTypeViewModels> getOrgTypes()
        {
            List<OrganizationTypeViewModels> types = new List<OrganizationTypeViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.OrganizationTypes.Where(s => s.status == (int)Status.Active).ToList();
                    foreach (var t in ot)
                    {
                        OrganizationTypeViewModels type = new Models.OrganizationTypeViewModels()
                        {
                            Id = t.id,
                            Type = t.type
                        };
                        types.Add(type);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return types;
        }
        public OrganizationViewModels getOrgById(int id)
        {
            OrganizationViewModels org = new OrganizationViewModels();
            try
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                    cfg.CreateMap<Organization, OrganizationViewModels>()
                    .ReverseMap();
                });
                var mapper = config.CreateMapper();
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Organizations.Where(s => s.status == (int)Status.Active && s.id == id).ToList().FirstOrDefault();
                    ot.logo = ConfigurationManager.AppSettings["fileurl"].ToString() + ot.name + "\\" + ot.logo;
                    org = mapper.Map<Organization, OrganizationViewModels>(ot);

                    foreach (var e in ot.Emails)
                    {
                        var emailconfig = new MapperConfiguration(cfg =>
                        {
                            cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                            cfg.CreateMap<Email, EmailViewModels>()
                            .ReverseMap();
                        });
                        var emailmapper = emailconfig.CreateMapper();

                        EmailViewModels em = new EmailViewModels();
                        em = emailmapper.Map<Email, EmailViewModels>(e);
                        org.Email.Add(em);
                    }
                    foreach (var ph in ot.Phones)
                    {
                        var phoneconfig = new MapperConfiguration(cfg =>
                        {
                            cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                            cfg.CreateMap<Phone, PhoneViewModels>()
                            .ReverseMap();
                        });
                        var phonemapper = phoneconfig.CreateMapper();

                        PhoneViewModels em = new PhoneViewModels();
                        em = phonemapper.Map<Phone, PhoneViewModels>(ph);
                        org.Phone.Add(em);
                    }
                    foreach (var a in ot.Addresses)
                    {
                        var addressconfig = new MapperConfiguration(cfg =>
                        {
                            cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                            cfg.CreateMap<Address, AddressViewModels>()
                            .ReverseMap();
                        });
                        var addressmapper = addressconfig.CreateMapper();

                        AddressViewModels em = new AddressViewModels();
                        em = addressmapper.Map<Address, AddressViewModels>(a);
                        org.Address.Add(em);
                    }
                    foreach (var a in ot.Accounts)
                    {
                        var accountconfig = new MapperConfiguration(cfg =>
                        {
                            cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                            cfg.CreateMap<Account, OrgAccountViewModels>()
                            .ReverseMap();
                        });
                        var accountmapper = accountconfig.CreateMapper();

                        OrgAccountViewModels em = new OrgAccountViewModels();
                        em = accountmapper.Map<Account, OrgAccountViewModels>(a);
                        org.Account.Add(em);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return org;
        }
        public List<OrganizationViewModels> getOrgs()
        {
            List<OrganizationViewModels> org = new List<OrganizationViewModels>();
            try
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                    cfg.CreateMap<Organization, OrganizationViewModels>()
                    .ReverseMap();
                });
                var mapper = config.CreateMapper();
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Organizations.Where(s => s.status == (int)Status.Active).ToList();
                    foreach (var o in ot)
                    {
                        OrganizationViewModels or = new OrganizationViewModels();
                        or = mapper.Map<Organization, OrganizationViewModels>(o);
                        org.Add(or);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return org;
        }
        public List<UserViewModels> getUsers()
        {
            List<UserViewModels> users = new List<UserViewModels>();
            try
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                    cfg.CreateMap<User, UserViewModels>()
                    .ReverseMap();
                });
                var mapper = config.CreateMapper();
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Users.Where(s => s.status == (int)Status.Active).ToList();
                    foreach (var o in ot)
                    {
                        UserViewModels user = new UserViewModels();
                        user = mapper.Map<User, UserViewModels>(o);
                        users.Add(user);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return users;
        }
        public UserViewModels getActiveUserById(int id)
        {
            UserViewModels user = new UserViewModels();
            try
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                    cfg.CreateMap<User, UserViewModels>()
                    .ReverseMap();
                });
                var mapper = config.CreateMapper();
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Users.Where(s => s.status == (int)Status.Active && s.id == id).ToList().FirstOrDefault();
                    user = mapper.Map<User, UserViewModels>(ot);
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return user;
        }
        public List<CountryViewModels> getCountries()
        {
            List<CountryViewModels> countries = new List<CountryViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ct = ie.Countries.Where(s => s.status == (int)Status.Active).OrderBy(c => c.country1).ToList();
                    foreach (var c in ct)
                    {
                        CountryViewModels country = new Models.CountryViewModels()
                        {
                            Id = c.id,
                            Code = c.code,
                            Country = c.country1,
                            Status = (int)c.status
                        };
                        countries.Add(country);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return countries;
        }
        public async Task<List<AccountData>> getBanks()
        {
            string resultContent = string.Empty;
            string _ContentType = "application/json";
            string authToken = ConfigurationManager.AppSettings["authToken"].ToString();
            BankViewModels bankdetail = new BankViewModels();
            List<AccountData> banks = new List<AccountData>();
            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_ContentType));

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                    var result = await client.GetAsync(payStackBaseURL + "bank");
                    resultContent = await result.Content.ReadAsStringAsync();

                }
                bankdetail = JsonHelper.fromJson<BankViewModels>(resultContent);
                banks = bankdetail.data;
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return banks;
        }
        public async Task<AccountNameData> getAccountName(string id, string acctnum)
        {
            string resultContent = string.Empty;
            string _ContentType = "application/json";
            string authToken = ConfigurationManager.AppSettings["authToken"].ToString();
            AccountNameData accountdet = new AccountNameData();
            AccountName acctname = new AccountName();
            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_ContentType));

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                    var result = await client.GetAsync(payStackBaseURL + "bank/resolve?account_number=" + acctnum + "&bank_code=" + id);
                    resultContent = await result.Content.ReadAsStringAsync();

                }
                acctname = JsonHelper.fromJson<AccountName>(resultContent);
                accountdet = acctname.data;
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return accountdet;
        }
        public List<RoleViewModels> getRoles()
        {
            List<RoleViewModels> roles = new List<RoleViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ct = ie.Roles.Where(s => s.id > (int)Status.Pending).OrderBy(c => c.role1).ToList();
                    foreach (var c in ct)
                    {
                        RoleViewModels role = new Models.RoleViewModels()
                        {
                            Id = c.id,
                            Role = c.role1
                        };
                        roles.Add(role);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return roles;
        }
        public UserViewModels getUserById(int id)
        {
            UserViewModels user = new UserViewModels();
            try
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsVirtual;
                    cfg.CreateMap<User, UserViewModels>()
                    .ReverseMap();
                });
                var mapper = config.CreateMapper();
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ct = ie.Users.Where(s => s.id == id).ToList().FirstOrDefault();
                    user = mapper.Map<User, UserViewModels>(ct);
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return user;
        }
        public FeeViewModels getFeeById(int id)
        {
            FeeViewModels fee = new FeeViewModels();
            try
            {

                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ct = ie.Fees.Where(s => s.id == id).ToList().FirstOrDefault();

                    fee.Classid = ct.classid;
                    fee.Cost = ct.cost;
                    fee.Curid = ct.curid;
                    fee.Id = ct.id;
                    fee.Item = ct.item;
                    fee.Orgid = ct.orgid;
                    fee.Status = ct.status;
                    ct.termid = ct.termid;
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return fee;
        }
        public bool checkAdminUname(string uname, int id)
        {
            bool exists = true;
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ct = ie.Users.Where(s => s.username.ToLower() == uname.ToLower() && s.id != id).ToList().FirstOrDefault();
                    if (ct != null && !string.IsNullOrEmpty(ct.username))
                    {
                        exists = false;
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return exists;
        }
        public bool checkClassExist(ClassViewModels _class, string operation)
        {
            bool exists = false;
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ct = ie.Classes.Where(s => s.name.ToLower() == _class.Name.ToLower() && s.orgid == _class.Orgid && s.status == _class.Status).ToList().FirstOrDefault();
                    if (ct != null)
                    {
                        switch (operation)
                        {
                            case "save":
                                exists = !string.IsNullOrEmpty(ct.name);
                                break;
                            case "update":
                                exists = !string.IsNullOrEmpty(ct.name) && _class.Id != ct.id;
                                break;
                            default:
                                exists = false;
                                break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return exists;
        }
        public bool checkTermExist(TermViewModels term, string operation)
        {
            bool exists = false;
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ct = ie.Terms.Where(s => s.name.ToLower() == term.Name.ToLower() && s.orgid == term.Orgid && s.status == term.Status).ToList();
                    foreach (var c in ct)
                    {
                        if (c != null)
                        {
                            bool issameyear = false;
                            if (c.startdate.HasValue && c.enddate.HasValue)
                            {
                                DateTime start = Convert.ToDateTime(c.startdate);
                                DateTime end = Convert.ToDateTime(c.enddate);
                                DateTime itemstart = Convert.ToDateTime(term.Startdate);
                                DateTime itemend = Convert.ToDateTime(term.Enddate);
                                issameyear = (start.Year == itemstart.Year) && (end.Year == itemend.Year);
                            }
                            switch (operation)
                            {
                                case "save":
                                    exists = !string.IsNullOrEmpty(c.name) && issameyear;
                                    break;
                                case "update":
                                    exists = !string.IsNullOrEmpty(c.name) && (term.Id != c.id) && issameyear;
                                    break;
                                default:
                                    exists = false;
                                    break;
                            }
                            if (exists)
                            {
                                break;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return exists;
        }
        public List<StateViewModels> getStatesByCountryId(int cid)
        {
            List<StateViewModels> states = new List<StateViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.States.Where(s => s.status == (int)Status.Active && s.countryid == cid).OrderBy(o => o.state1).ToList();
                    foreach (var t in ot)
                    {
                        StateViewModels state = new Models.StateViewModels()
                        {
                            Id = t.id,
                            Code = t.code,
                            State = t.state1,
                            Status = t.status
                        };
                        states.Add(state);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return states;
        }
        public List<TermViewModels> getTermByOrgId(int id)
        {
            List<TermViewModels> terms = new List<TermViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Terms.Where(s => s.status == (int)Status.Active && s.orgid == id).ToList().OrderByDescending(e => e.id);
                    foreach (var t in ot)
                    {
                        TermViewModels term = new Models.TermViewModels()
                        {
                            Id = t.id,
                            Enddate = t.enddate.ToString(),
                            Name = t.name,
                            Orgid = t.orgid,
                            Startdate = t.startdate.ToString(),
                            Status = t.status
                        };
                        terms.Add(term);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return terms;
        }
        public List<FeeViewModels> getFeeByOrgTermClassId(int id, int cid, int tid)
        {
            List<FeeViewModels> fees = new List<FeeViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Fees.Where(s => s.status == (int)Status.Active && s.orgid == id && s.termid == tid && s.classid == cid).ToList().OrderByDescending(e => e.id);
                    foreach (var t in ot)
                    {
                        FeeViewModels fee = new Models.FeeViewModels()
                        {
                            Id = t.id,
                            Termid = t.termid,
                            Classid = t.classid,
                            Orgid = t.orgid,
                            Cost = t.cost,
                            Curid = t.curid,
                            Item = t.item,
                            Status = t.status
                        };
                        fees.Add(fee);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return fees;
        }
        public List<FeeViewModels> getFeeByOrgTermClassId(int id, int cid, int tid, string email)
        {
            List<FeeViewModels> fees = new List<FeeViewModels>();
            string[] paidFees = getPaidFees(email);
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Fees.Where(s => s.status == (int)Status.Active && s.orgid == id && s.termid == tid && s.classid == cid).ToList().OrderByDescending(e => e.id);

                    foreach (var t in ot)
                    {
                        FeeViewModels fee = new Models.FeeViewModels()
                        {
                            Id = t.id,
                            Termid = t.termid,
                            Classid = t.classid,
                            Orgid = t.orgid,
                            Cost = t.cost,
                            Curid = t.curid,
                            Item = t.item,
                            Status = t.status,
                            Ispaid = paidFees.Contains(t.id.ToString())
                        };
                        fees.Add(fee);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return fees;
        }
        public List<FeeViewModels> getFeeByIdsandPayRef(int cid, int tid, string payref)
        {
            List<FeeViewModels> fees = new List<FeeViewModels>();
            string[] paidFees = getPaidFeesByRef(payref);
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Fees.Where(s => s.status == (int)Status.Active && s.termid == tid && s.classid == cid).ToList().OrderByDescending(e => e.id);

                    foreach (var t in ot)
                    {
                        FeeViewModels fee = new Models.FeeViewModels()
                        {
                            Id = t.id,
                            Termid = t.termid,
                            Classid = t.classid,
                            Orgid = t.orgid,
                            Cost = t.cost,
                            Curid = t.curid,
                            Item = t.item,
                            Status = t.status,
                            Ispaid = paidFees.Contains(t.id.ToString())
                        };
                        fees.Add(fee);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return fees;
        }
        public string[] getPaidFeesByRef(string payref)
        {
            string[] listoffees = null;
            int count = 0;
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var fees = ie.Payments.Where(s => s.payref == payref).DefaultIfEmpty()
                            .Join(ie.Fees, s => s.feesid, t => t.id, (s, t) => t)
                             .Select(c => new
                             {
                                 c.id
                             }).ToList();
                    count = fees.ToList().Count;
                    listoffees = new string[count];
                    for (int i = 0; i < count; i++)
                    {
                        listoffees[i] = fees[i].id.ToString();
                    }
                }
            }
            catch (Exception)
            {

            }
            return listoffees;
        }
        public string[] getPaidFees(string email)
        {
            string[] listoffees = null;
            int count = 0;
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var fees = ie.Payers.Where(s => s.email == email).DefaultIfEmpty().Join
                        (ie.Payments, p => p.paymentid, o => o.id, (p, o) => o)
                            .Join(ie.Fees, s => s.feesid, t => t.id, (s, t) => t)
                             .Select(c => new
                             {
                                 c.id,
                                 c.item,
                                 c.curid,
                                 c.cost
                             }).ToList();
                    count = fees.ToList().Count;
                    listoffees = new string[count];
                    for (int i = 0; i < count; i++)
                    {
                        listoffees[i] = fees[i].id.ToString();
                    }
                }
            }
            catch (Exception)
            {

            }
            return listoffees;
        }
        public List<MyFees> getMyFees(string email)
        {
            List<MyFees> myfees = new List<MyFees>();
            int count = 0;
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var fees = ie.getMyFees(email);

                    foreach (var f in fees)
                    {
                        var feesvm = getFeeByIdsandPayRef((int)f.classid, (int)f.termid, f.payref);
                        MyFees mf = new MyFees()
                        {
                            code = f.code,
                            name = f.name,
                            payref = f.payref,
                            termid = (int)f.termid,
                            classid = (int)f.classid,
                            orgname = f.orgname,
                            fees = feesvm
                        };
                        myfees.Add(mf);
                    }

                }
            }
            catch (Exception ex)
            {

            }
            return myfees;
        }
        public List<ClassViewModels> getClassByOrgId(int id, int tid)
        {
            List<ClassViewModels> classes = new List<ClassViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    List<string> unique = new List<string>();
                    var it = ie.Fees.Where(d => d.orgid == id && d.termid == tid).ToList();
                    foreach (var i in it)
                    {
                        if (!unique.Contains(i.classid.ToString()))
                        {
                            var ot = ie.Classes.Where(s => s.status == (int)Status.Active && s.id == i.classid).ToList();
                            foreach (var t in ot)
                            {
                                ClassViewModels _class = new Models.ClassViewModels()
                                {
                                    Id = t.id,
                                    Name = t.name,
                                    Orgid = t.orgid,
                                    Status = t.status
                                };
                                classes.Add(_class);
                            }
                            unique.Add(i.classid.ToString());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return classes;
        }
        public List<TermViewModels> getTermByOrgId1(int id)
        {
            List<TermViewModels> terms = new List<TermViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Terms.Where(s => s.status == (int)Status.Active && s.orgid == id).ToList();
                    foreach (var t in ot)
                    {
                        TermViewModels term = new Models.TermViewModels()
                        {
                            Id = t.id,
                            Name = t.name,
                            Orgid = t.orgid,
                            Status = t.status
                        };
                        terms.Add(term);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return terms;
        }
        public List<ClassViewModels> getClassesByOrgId(int id)
        {
            List<ClassViewModels> classes = new List<ClassViewModels>();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var it = ie.Classes.Where(d => d.orgid == id && d.status == (int)Status.Active).ToList();
                    foreach (var t in it)
                    {
                        ClassViewModels _class = new Models.ClassViewModels()
                        {
                            Id = t.id,
                            Name = t.name,
                            Orgid = t.orgid,
                            Status = t.status
                        };
                        classes.Add(_class);
                    }
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return classes;
        }
        public ClassViewModels getClassById(int id)
        {
            ClassViewModels _class = new ClassViewModels();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Classes.Where(s => s.id == id).ToList().FirstOrDefault();
                    _class = new Models.ClassViewModels()
                    {
                        Id = ot.id,
                        Name = ot.name,
                        Orgid = ot.orgid,
                        Status = ot.status
                    };
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return _class;
        }
        public TermViewModels getTermById(int id)
        {
            TermViewModels term = new TermViewModels();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    var ot = ie.Terms.Where(s => s.id == id).ToList().FirstOrDefault();
                    term = new Models.TermViewModels()
                    {
                        Id = ot.id,
                        Name = ot.name,
                        Orgid = ot.orgid,
                        Startdate = ot.startdate.ToString(),
                        Enddate = ot.enddate.ToString(),
                        Status = ot.status
                    };
                }
            }
            catch (Exception ex)
            {
                //u.LogError(ex, "DAC -- getSBUs: ");
            }
            return term;
        }
        public async Task<OrganizationViewModels> saveOrg(OrganizationViewModels organization)
        {
            OrganizationViewModels org = new OrganizationViewModels();
            long oid = organization.Id;
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    Organization neworg = new Organization()
                    {
                        id = oid,
                        logo = organization.Logo,
                        name = organization.Name,
                        status = organization.Status,
                        typeid = organization.Typeid
                    };

                    ObjectContext ie = new ObjectContext(feesconn);
                    if (oid > 0)
                    {

                        ie.AttachTo("feesDBEntities.Organizations", neworg);
                        ie.ObjectStateManager.ChangeObjectState(neworg, EntityState.Modified);
                        ie.SaveChanges();
                    }
                    else
                    {
                        ie.AddObject("feesDBEntities.Organizations", neworg);
                        ie.SaveChanges();
                        oid = neworg.id;
                    }

                    var oe = new ObjectContext(feesconn);
                    foreach (var i in organization.Address)
                    {
                        Address a = new Models.Address()
                        {
                            id = i.Id,
                            city = i.City,
                            countryid = i.Countryid,
                            orgid = oid,
                            postcode = i.Postcode,
                            stateid = i.Stateid,
                            status = i.Status,
                            street = i.Street
                        };

                        if (i.Id > 0)
                        {
                            oe.AttachTo("feesDBEntities.Addresses", a);
                            oe.ObjectStateManager.ChangeObjectState(a, EntityState.Modified);
                        }
                        else
                        {
                            oe.AddObject("feesDBEntities.Addresses", a);
                        }
                        oe.SaveChanges();
                    }

                    var ue = new ObjectContext(feesconn);
                    foreach (var i in organization.Email)
                    {
                        if (!string.IsNullOrEmpty(i.Emailaddress))
                        {
                            Email e = new Email()
                            {
                                id = i.Id,
                                emailaddress = i.Emailaddress,
                                orgid = oid,
                                status = i.Status
                            };
                            if (i.Id > 0)
                            {
                                ue.AttachTo("feesDBEntities.Emails", e);
                                ue.ObjectStateManager.ChangeObjectState(e, EntityState.Modified);
                            }
                            else
                            {
                                ue.AddObject("feesDBEntities.Emails", e);
                            }
                            ue.SaveChanges();
                        }
                    }

                    var pe = new ObjectContext(feesconn);
                    foreach (var i in organization.Phone)
                    {
                        if (!string.IsNullOrEmpty(i.Phonenumber))
                        {
                            Phone p = new Phone()
                            {
                                id = i.Id,
                                orgid = oid,
                                phonenumber = i.Phonenumber,
                                status = i.Status
                            };
                            if (i.Id > 0)
                            {
                                pe.AttachTo("feesDBEntities.Phones", p);
                                pe.ObjectStateManager.ChangeObjectState(p, EntityState.Modified);
                            }
                            else
                            {
                                pe.AddObject("feesDBEntities.Phones", p);
                            }
                            pe.SaveChanges();
                        }
                    }
                    var ac = new ObjectContext(feesconn);
                    foreach (var i in organization.Account)
                    {
                        Account acct = new Account()
                        {
                            id = i.Id,
                            orgid = oid,
                            accountname = i.Accountname,
                            accountnumber = i.Accountnumber.ToString(),
                            accountref = i.Accountref,
                            bankcode = i.Bankcode,
                            bankname = i.Bankname,
                            status = i.Status
                        };
                        if (i.Id > 0)
                        {
                            ac.AttachTo("feesDBEntities.Accounts", acct);
                            ac.ObjectStateManager.ChangeObjectState(acct, EntityState.Modified);
                        }
                        else
                        {
                            SubAccountRequest subreq = new Models.SubAccountRequest()
                            {
                                account_number = i.Accountnumber,
                                business_name = i.Accountname,
                                percentage_charge = 90.55,
                                settlement_bank = i.Bankname
                            };
                            Subaccount subacct = new Models.Subaccount();
                            subacct = await createSubAccount(subreq);
                            acct.accountref = subacct.data.subaccount_code;
                            ac.AddObject("feesDBEntities.Accounts", acct);
                        }
                        ac.SaveChanges();
                    }
                    scope.Complete();
                    ie.AcceptAllChanges();
                    ue.AcceptAllChanges();
                    oe.AcceptAllChanges();
                    pe.AcceptAllChanges();
                    ac.AcceptAllChanges();
                }
                if (oid > 0)
                    org = getOrgById((int)oid);

            }
            catch (Exception ex)
            {

            }
            return org;
        }
        public UserViewModels saveAdmin(UserViewModels user)
        {
            UserViewModels usr = new UserViewModels();
            UserViewModels u = new UserViewModels();
            User newusr = new User();
            long uid = user.Id;
            string pwd = RandomString(Convert.ToInt32(ConfigurationManager.AppSettings["pLength"]));
            if (uid > 0)
            {
                u = getUserById((int)uid);
                DateTime? value = null;
                newusr = new User()
                {
                    id = uid,
                    createdby = u.Createdby,
                    datecreated = Convert.ToDateTime(u.Datecreated),
                    lastlogin = (Convert.ToDateTime(u.Lastlogin).Year == 1) ? value : Convert.ToDateTime(u.Lastlogin),
                    email = user.Email,
                    password = hashPass(u.Password),
                    orgid = user.Orgid,
                    roleid = user.Roleid,
                    status = u.Status,
                    username = user.Username
                };
            }
            else
            {
                newusr = new User()
                {
                    id = uid,
                    createdby = user.Createdby,
                    datecreated = DateTime.Now,
                    email = user.Email,
                    password = hashPass(pwd),
                    orgid = user.Orgid,
                    roleid = user.Roleid,
                    status = 0,
                    username = user.Username
                };
            }
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    ObjectContext ie = new ObjectContext(feesconn);
                    if (uid > 0)
                    {
                        ie.AttachTo("feesDBEntities.Users", newusr);
                        ie.ObjectStateManager.ChangeObjectState(newusr, EntityState.Modified);
                        ie.SaveChanges();
                    }
                    else
                    {
                        ie.AddObject("feesDBEntities.Users", newusr);
                        ie.SaveChanges();
                        uid = newusr.id;
                    }
                    scope.Complete();
                    ie.AcceptAllChanges();
                }
                //string bodypath = ConfigurationManager.AppSettings["emailBody"].ToString();
                string bodyfilename = ConfigurationManager.AppSettings["emailBodyFilename"].ToString();
                string bodypath = HostingEnvironment.MapPath("~/Email/" + bodyfilename);
                string bodyText = System.IO.File.ReadAllText(bodypath);
                string orgName = getOrgById((int)user.Orgid).Name;
                bodyText = bodyText.Replace(":Organization", orgName).Replace(":peeword", pwd);
                //test part
                string errpath = HostingEnvironment.MapPath("~/Email/Error.txt");
                using (System.IO.StreamWriter file =
                new System.IO.StreamWriter(errpath, true))
                {
                    file.WriteLine(bodyText);
                }
                //test part
                string _from = ConfigurationManager.AppSettings["_from"].ToString();
                string _pwd = ConfigurationManager.AppSettings["_pwd"].ToString();
                string _subject = ConfigurationManager.AppSettings["_subject"].ToString();
                string _uname = ConfigurationManager.AppSettings["_uname"].ToString();
                string _host = ConfigurationManager.AppSettings["_host"].ToString();
                int _port = Convert.ToInt32(ConfigurationManager.AppSettings["_port"]);
                bool _enablessl = Convert.ToBoolean(ConfigurationManager.AppSettings["_enablessl"]);
                bool _usedefaultcredential = Convert.ToBoolean(ConfigurationManager.AppSettings["_usedefaultcredential"]);

                Smtp _protocol = new Smtp()
                {
                    enablessl = _enablessl,
                    host = _host,
                    port = _port,
                    usedefaultcredential = _usedefaultcredential
                };

                EmailMetaData data = new EmailMetaData()
                {
                    appname = "Feesng.com",
                    body = bodyText,
                    fromaddress = _from,
                    isHtml = true,
                    peeword = _pwd,
                    subject = _subject,
                    toaddress = newusr.email,
                    uname = _uname,
                    protocol = _protocol

                };

                //test email
                using (System.IO.StreamWriter file =
                new System.IO.StreamWriter(errpath, true))
                {
                    file.WriteLine(data.toaddress);
                }
                //test email

                SendMail(data);

                if (uid > 0)
                {
                    u = getUserById((int)uid);
                }
            }
            catch (Exception ex)
            {

            }
            return u;
        }
        public FeeViewModels saveFee(FeeViewModels fee)
        {
            FeeViewModels f = new FeeViewModels();
            Fee newfee = new Fee();
            long fid = fee.Id;

            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    ObjectContext ie = new ObjectContext(feesconn);
                    ObjectContext oe = new ObjectContext(feesconn);

                    if (fid > 0)
                    {

                    }
                    else
                    {
                        long classid = 0;
                        //long termid = 0;
                        //var _term = new Term()
                        //{
                        //    id = fee.Term.Id,
                        //    name = fee.Term.Name,
                        //    startdate = fee.Term.Startdate,
                        //    enddate = fee.Term.Enddate,
                        //    orgid = fee.Term.Orgid,
                        //    status = fee.Term.Status
                        //};
                        //ie.AddObject("feesDBEntities.Terms", _term);
                        //ie.SaveChanges();
                        //termid = _term.id;

                        foreach (var c in fee.Class)
                        {
                            //var _class = new Class()
                            //{
                            //    id = c.Id,
                            //    name = c.Name,
                            //    orgid = c.Orgid,
                            //    status = c.Status
                            //};
                            //ie.AddObject("feesDBEntities.Classes", _class);
                            //ie.SaveChanges();
                            classid = c.Id;
                            foreach (var item in fee.FeeItems)
                            {
                                newfee = new Fee()
                                {
                                    //id = fid,
                                    classid = classid,
                                    cost = item.Cost,
                                    curid = item.Currency,
                                    item = item.Item,
                                    orgid = fee.Orgid,
                                    termid = fee.Termid,
                                    status = fee.Status
                                };
                                oe.AddObject("feesDBEntities.Fees", newfee);
                                oe.SaveChanges();
                                fid = newfee.id;
                            }
                        }
                    }
                    scope.Complete();
                    ie.AcceptAllChanges();
                    oe.AcceptAllChanges();
                }
                if (fid > 0)
                {
                    f = getFeeById((int)fid);
                }
            }
            catch (Exception ex)
            {

            }
            return f;
        }
        public FeeViewModels updateFee(List<FeeViewModels> fees)
        {
            FeeViewModels f = new FeeViewModels();
            Fee newfee = new Fee();
            long fid = 0;
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    ObjectContext ie = new ObjectContext(feesconn);
                    ObjectContext oe = new ObjectContext(feesconn);

                    foreach (var fee in fees)
                    {
                        fid = fee.Id;
                        long classid = fee.Classid;
                        long termid = fee.Termid;
                        List<ItemList> items = new List<ItemList>();
                        //items = fee.FeeItems.ToList();

                        newfee = new Fee()
                        {
                            id = fid,
                            classid = classid,
                            cost = fee.Cost,
                            curid = fee.Curid,
                            item = fee.Item,
                            orgid = fee.Orgid,
                            termid = termid,
                            status = fee.Status
                        };

                        if (fid > 0)
                        {
                            ie.AttachTo("feesDBEntities.Fees", newfee);
                            ie.ObjectStateManager.ChangeObjectState(newfee, EntityState.Deleted);
                            ie.SaveChanges();
                        }
                        else
                        {
                            oe.AddObject("feesDBEntities.Fees", newfee);
                            oe.SaveChanges();
                            fid = newfee.id;
                        }
                    }
                    scope.Complete();
                    ie.AcceptAllChanges();
                    oe.AcceptAllChanges();
                }
                if (fid > 0)
                {
                    f = getFeeById((int)fid);
                }
            }
            catch (Exception ex)
            {

            }
            return f;
        }
        public EntityCountViewModels countEntities(int orgid)
        {
            EntityCountViewModels ec = new EntityCountViewModels();
            try
            {
                using (feesDBEntities ie = new feesDBEntities())
                {
                    if (orgid > 0)
                    {
                        ec.adminCount = ie.Users.Where(s => s.status == (int)Status.Active && s.orgid == orgid).ToList().Count;
                        ec.feeCount = ie.Fees.Where(s => s.status == (int)Status.Active && s.orgid == orgid).GroupBy(x => new { x.orgid, x.termid, x.classid }).ToList().Count;
                        ec.orgCount = ie.Organizations.Where(s => s.status == (int)Status.Active && s.id == orgid).ToList().Count;
                        ec.payCount = ie.Payments.Where(s => s.status == (int)Status.Active).DefaultIfEmpty()
                            .Join(ie.Fees, s => s.feesid, t => t.id, (s, t) => t).ToList().Count;
                    }
                    else
                    {
                        ec.adminCount = ie.Users.Where(s => s.status == (int)Status.Active).ToList().Count;
                        ec.feeCount = ie.Fees.Where(s => s.status == (int)Status.Active).GroupBy(x => new { x.orgid, x.termid, x.classid }).ToList().Count;
                        ec.orgCount = ie.Organizations.Where(s => s.status == (int)Status.Active).ToList().Count;
                        ec.payCount = ie.Payments.Where(s => s.status == (int)Status.Active).ToList().Count;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return ec;
        }

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
        public void SendMail(EmailMetaData data)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(data.toaddress);
            mail.From = new MailAddress(data.fromaddress);
            mail.Subject = data.subject;
            string Body = data.body;
            mail.Body = Body;
            mail.IsBodyHtml = data.isHtml;

            //test email
            string errpath = HostingEnvironment.MapPath("~/Email/Error.txt");
            using (System.IO.StreamWriter file =
            new System.IO.StreamWriter(errpath, true))
            {
                file.WriteLine(mail.To.ToList().FirstOrDefault());
            }
            //test email

            SmtpClient smtp = new SmtpClient();
            //smtp.Host = data.protocol.host;
            //smtp.Port = data.protocol.port;
            //smtp.UseDefaultCredentials = data.protocol.usedefaultcredential;
            //smtp.Credentials = new System.Net.NetworkCredential
            //(data.uname, data.peeword);
            //smtp.EnableSsl = data.protocol.enablessl;
            try
            {
                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                //test email
                using (System.IO.StreamWriter file =
                new System.IO.StreamWriter(errpath, true))
                {
                    file.WriteLine(ex.ToString() + "----------------" + ex.InnerException.ToString());
                }
                //test email
            }

        }
        private string hashPass(string pass)
        {
            var data = Encoding.ASCII.GetBytes(pass);
            var sha1 = new SHA1CryptoServiceProvider();
            var sha1data = sha1.ComputeHash(data);

            string hvalue = Encoding.ASCII.GetString(sha1data);

            return hvalue;
        }
        public ClassViewModels saveClass(ClassViewModels _class)
        {
            ClassViewModels c = new ClassViewModels();
            Class _c = new Class();
            try
            {

                long cid = _class.Id;
                string message = string.Empty;
                _c = new Class()
                {
                    id = cid,
                    name = _class.Name,
                    orgid = _class.Orgid,
                    status = _class.Status
                };
                using (TransactionScope scope = new TransactionScope())
                {
                    ObjectContext ie = new ObjectContext(feesconn);
                    if (cid > 0)
                    {
                        if (!checkClassExist(_class, "update"))
                        {
                            ie.AttachTo("feesDBEntities.Classes", _c);
                            ie.ObjectStateManager.ChangeObjectState(_c, EntityState.Modified);
                            ie.SaveChanges();
                            message = "update:success";
                        }
                        else
                        {
                            message = "update:duplicate";
                        }
                    }
                    else
                    {
                        if (!checkClassExist(_class, "save"))
                        {
                            ie.AddObject("feesDBEntities.Classes", _c);
                            ie.SaveChanges();
                            cid = _c.id;
                            message = "save:success";
                        }
                        else
                        {
                            message = "save:duplicate";
                        }
                    }
                    scope.Complete();
                    ie.AcceptAllChanges();
                }
                if (cid > 0)
                {
                    c = getClassById((int)cid);
                }
                c.message = message;
            }
            catch (Exception ex)
            {

            }
            return c;
        }
        public TermViewModels saveTerm(TermViewModels term)
        {
            TermViewModels t = new TermViewModels();
            Term tm = new Term();
            try
            {

                long tid = term.Id;
                string message = string.Empty;
                tm = new Term()
                {
                    id = tid,
                    enddate = Convert.ToDateTime(term.Enddate),
                    name = term.Name,
                    orgid = term.Orgid,
                    startdate = Convert.ToDateTime(term.Startdate),
                    status = term.Status

                };
                using (TransactionScope scope = new TransactionScope())
                {
                    ObjectContext ie = new ObjectContext(feesconn);
                    if (tid > 0)
                    {
                        if (!checkTermExist(term, "update"))
                        {
                            ie.AttachTo("feesDBEntities.Terms", tm);
                            ie.ObjectStateManager.ChangeObjectState(tm, EntityState.Modified);
                            ie.SaveChanges();
                            message = "update:success";
                        }
                        else
                        {
                            message = "update:duplicate";
                        }
                    }
                    else
                    {
                        if (!checkTermExist(term, "save"))
                        {
                            ie.AddObject("feesDBEntities.Terms", tm);
                            ie.SaveChanges();
                            tid = tm.id;
                            message = "save:success";
                        }
                        else
                        {
                            message = "save:duplicate";
                        }
                    }
                    scope.Complete();
                    ie.AcceptAllChanges();
                }
                if (tid > 0)
                {
                    t = getTermById((int)tid);
                }
                t.message = message;
            }
            catch (Exception ex)
            {

            }
            return t;
        }
        public string deleteClass(ClassViewModels _class)
        {
            Class _c = new Class();
            string message = string.Empty;
            try
            {
                long cid = _class.Id;

                _c = new Class()
                {
                    id = cid,
                    name = _class.Name,
                    orgid = _class.Orgid,
                    status = _class.Status
                };
                using (TransactionScope scope = new TransactionScope())
                {
                    ObjectContext ie = new ObjectContext(feesconn);
                    if (cid > 0)
                    {
                        ie.AttachTo("feesDBEntities.Classes", _c);
                        ie.ObjectStateManager.ChangeObjectState(_c, EntityState.Modified);
                        ie.SaveChanges();
                        message = "delete:success";
                    }
                    scope.Complete();
                    ie.AcceptAllChanges();
                }
            }
            catch (Exception ex)
            {

            }
            return message;
        }
        public string deleteTerm(TermViewModels _term)
        {
            Term _c = new Term();
            string message = string.Empty;
            try
            {
                long cid = _term.Id;

                _c = new Term()
                {
                    id = cid,
                    name = _term.Name,
                    orgid = _term.Orgid,
                    startdate = Convert.ToDateTime(_term.Startdate),
                    enddate = Convert.ToDateTime(_term.Enddate),
                    status = _term.Status
                };
                using (TransactionScope scope = new TransactionScope())
                {
                    ObjectContext ie = new ObjectContext(feesconn);
                    if (cid > 0)
                    {
                        ie.AttachTo("feesDBEntities.Terms", _c);
                        ie.ObjectStateManager.ChangeObjectState(_c, EntityState.Modified);
                        ie.SaveChanges();
                        message = "delete:success";
                    }
                    scope.Complete();
                    ie.AcceptAllChanges();
                }
            }
            catch (Exception ex)
            {

            }
            return message;
        }
        public async Task<bool> PayWithPayStack(PayStackRequest request)
        {
            bool paid = false;
            string resultContent = string.Empty;
            string _ContentType = "application/json";
            PayStackResponse vresp = new PayStackResponse();
            string baseUrl = ConfigurationManager.AppSettings["payStackURL"].ToString();
            string authToken = ConfigurationManager.AppSettings["authToken"].ToString();
            string reqString = JsonHelper.toJson(request);
            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
                using (var client = new HttpClient())
                {
                    PayStackRequest initiateReq = new Models.PayStackRequest()
                    {
                        amount = request.amount,
                        email = request.email,
                        reference = request.reference
                    };
                    reqString = JsonHelper.toJson(initiateReq);

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                    var content = new StringContent(reqString, Encoding.UTF8, _ContentType);
                    var result = await client.PostAsync(baseUrl + "initialize", content);
                    resultContent = await result.Content.ReadAsStringAsync();

                }
                vresp = JsonHelper.fromJson<PayStackResponse>(resultContent);
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_ContentType));

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                    var result = await client.GetAsync(baseUrl + "verify/" + request.reference);
                    //var result = await client.GetAsync(vresp.data.authorization_url);
                    resultContent = await result.Content.ReadAsStringAsync();

                }
                vresp = JsonHelper.fromJson<PayStackResponse>(resultContent);

                //using (var client = new HttpClient())
                //{
                //    PayStackRequest chargeReq = new Models.PayStackRequest()
                //    {
                //        amount = request.amount,
                //        email = request.email,
                //        //authorization_code = request.authorization_code
                //        authorization_code = "88eh2z0u474b6w4"
                //    };
                //    reqString = JsonHelper.toJson(chargeReq);

                //    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                //    var content = new StringContent(reqString, Encoding.UTF8, _ContentType);
                //    var result = await client.PostAsync(baseUrl + "charge_authorization", content);
                //    resultContent = await result.Content.ReadAsStringAsync();

                //}
                vresp = JsonHelper.fromJson<PayStackResponse>(resultContent);
            }
            catch (Exception ex)
            {

            }
            return paid;
        }
        public async Task<Subaccount> createSubAccount(SubAccountRequest request)
        {
            Subaccount subacct = new Subaccount();
            try
            {
                //get acct ref from paystack
                string resultContent = string.Empty;
                string _ContentType = "application/json";
                string baseUrl = ConfigurationManager.AppSettings["payStackBaseURL"].ToString();
                string authToken = ConfigurationManager.AppSettings["authToken"].ToString();


                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
                using (var client = new HttpClient())
                {
                    string reqString = JsonHelper.toJson(request);

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                    var content = new StringContent(reqString, Encoding.UTF8, _ContentType);
                    var result = await client.PostAsync(baseUrl + "subaccount", content);
                    resultContent = await result.Content.ReadAsStringAsync();

                }

                subacct = JsonHelper.fromJson<Subaccount>(resultContent);
            }
            catch (Exception ex)
            {

            }
            return subacct;
        }
        public async Task<bool> verifyPayment(string[] feeItems, string reference)
        {
            bool paid = false;
            string resultContent = string.Empty;
            string _ContentType = "application/json";
            PayStackResponse vresp = new PayStackResponse();
            string baseUrl = ConfigurationManager.AppSettings["payStackURL"].ToString();
            string authToken = ConfigurationManager.AppSettings["authToken"].ToString();
            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_ContentType));

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                    var result = await client.GetAsync(baseUrl + "verify/" + reference);
                    resultContent = await result.Content.ReadAsStringAsync();

                }
                vresp = JsonHelper.fromJson<PayStackResponse>(resultContent);
                if (vresp.status)
                {
                    string savepayment = string.Empty;
                    try
                    {
                        savepayment = savePayment(feeItems, reference, vresp);
                    }
                    catch (Exception)
                    {

                    }

                    paid = savepayment == "succesful";
                }

            }
            catch (Exception ex)
            {

            }
            return paid;
        }
        public string savePayment(string[] feeItems, string reference, PayStackResponse vresp)
        {
            string isSaved = "failed";
            string firstname = string.Empty;
            string lastname = string.Empty;
            string phone = string.Empty;
            string student = string.Empty;
            try
            {
                foreach (var item in feeItems)
                {
                    using (feesDBEntities ie = new feesDBEntities())
                    {
                        Payment pay = new Payment()
                        {
                            date = DateTime.Now,
                            feesid = Convert.ToInt32(item),
                            gatewaypayref = reference,
                            payref = reference,
                            status = 1
                        };
                        ie.Payments.Add(pay);
                        ie.SaveChanges();
                        foreach (var val in vresp.data.metadata.custom_fields)
                        {
                            if (val.variable_name.Contains("mobile"))
                            {
                                phone = val.value;
                            }
                            if (val.variable_name.Contains("first"))
                            {
                                firstname = val.value;

                            }
                            if (val.variable_name.Contains("last"))
                            {
                                lastname = val.value;
                            }
                            if (val.variable_name.Contains("student"))
                            {
                                student = val.value;
                            }
                        }
                        Payer payer = new Payer()
                        {
                            paymentid = pay.id,
                            email = vresp.data.customer.email,
                            name = firstname + " " + lastname,
                            code = student,
                            phone = phone

                        };
                        ie.Payers.Add(payer);
                        ie.SaveChanges();
                        isSaved = "succesful";
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return isSaved;
        }
    }
}