using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace paypart_admin.Models
{
    public static class Proxy
    {
        public static HttpClientHandler getDetail()
        {
            HttpClientHandler handler = new HttpClientHandler()
            {
                Proxy = new WebProxy("http://10.0.5.10:80", true)
                {
                    UseDefaultCredentials = true,
                },
                PreAuthenticate = true,
                UseDefaultCredentials = true
            };
            return handler;
        }
    }
}