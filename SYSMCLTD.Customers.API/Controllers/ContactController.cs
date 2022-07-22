using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SYSMCLTD.Customers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SYSMCLTD.Customers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly SYSMCLTDCustomersDBContext _dbContext;

        public ContactController()
        {
            this._dbContext = new SYSMCLTDCustomersDBContext();
        }

        [HttpPost]
        public ActionResult<Contact> Post([FromBody] Contact contact)
        {
            try
            {
                this._dbContext.Contacts.Add(contact);
                this._dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating contact");
            }
            return Ok(contact);


        }
    }
}
