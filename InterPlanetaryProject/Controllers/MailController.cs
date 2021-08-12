using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterPlanetaryProject.Controllers
{
    public class MailController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("Inbox");
        }

        public IActionResult Inbox()
        {
            return View();
        }

        public IActionResult Sent()
        {
            return View();
        }

        public IActionResult Filter()
        {
            return View();
        }

        public IActionResult SendMail()
        {
            return View();
        }

        public IActionResult Information()
        {
            return View();
        }
    }
}
