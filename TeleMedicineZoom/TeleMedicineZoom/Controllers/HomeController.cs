using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using WebApplication5.Models;

namespace WebApplication5.Controllers
{
    public class ZoomSettings
    {
        public string apiKey { get; set; }
        public string apiSecretKey { get; set; }
        public string meetingId { get; set; }
        public string password { get; set; }
        public string role { get; set; }
        public string leaveUrl { get; set; }
        public string signature { get; set; }

        
    }
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private string apiKey = "";
        private string apiSecretKey = "";
        private string meetingId = "";
        private string password = "";
        private string leaveUrl = "";
        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            apiKey = configuration["ZoomSettings:ApiKey"].ToString();
            apiSecretKey = configuration["ZoomSettings:ApiSecretKey"].ToString();
            meetingId = configuration["ZoomSettings:MeetingId"].ToString();
            password = configuration["ZoomSettings:Password"].ToString();
            leaveUrl = configuration["ZoomSettings:LeaveUrl"].ToString();
        }

        //For doctor 
        public IActionResult getDoctorConfig()
        {
            var signature = GenerateToken(
                    apiKey, apiSecretKey, meetingId, "1"
                    );
            var zoomsettings = new ZoomSettings()
            {
                apiKey = apiKey,
                apiSecretKey = apiSecretKey,
                meetingId = meetingId,
                password = password,
                signature = signature,
                role= "1",
                leaveUrl = leaveUrl
            };
            return Ok(zoomsettings);
        }

        //For patient
        public IActionResult getPatientConfig()
        {
            var signature = GenerateToken(
                    apiKey, apiSecretKey, meetingId, "0"
                    );
            var zoomsettings = new ZoomSettings()
            {
                apiKey = apiKey,
                apiSecretKey = apiSecretKey,
                meetingId = meetingId,
                password = password,
                signature = signature,
                role = "0",
                leaveUrl = leaveUrl
            };
            return Ok(zoomsettings);
        }

        public IActionResult Index()
        {
            return View();
        }
        static readonly char[] padding = { '=' };
        public static long ToTimestamp(DateTime value)
        {
            long epoch = (value.Ticks - 621355968000000000) / 10000;
            return epoch;
        }
        
        public string GenerateToken(string apiKey, string apiSecret, string meetingNumber
            , string role)
        {
            string ts = (ToTimestamp(DateTime.UtcNow.ToUniversalTime()) - 30000).ToString();
            
            string message = String.Format("{0}{1}{2}{3}", apiKey, meetingNumber, ts, role);
            apiSecret = apiSecret ?? "";
            var encoding = new System.Text.ASCIIEncoding();
            byte[] keyByte = encoding.GetBytes(apiSecret);
            byte[] messageBytesTest = encoding.GetBytes(message);
            string msgHashPreHmac = System.Convert.ToBase64String(messageBytesTest);
            byte[] messageBytes = encoding.GetBytes(msgHashPreHmac);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                string msgHash = System.Convert.ToBase64String(hashmessage);
                string token = String.Format("{0}.{1}.{2}.{3}.{4}", apiKey, meetingNumber, ts, role, msgHash);
                var tokenBytes = System.Text.Encoding.UTF8.GetBytes(token);
                return System.Convert.ToBase64String(tokenBytes).TrimEnd(padding);
            }
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
