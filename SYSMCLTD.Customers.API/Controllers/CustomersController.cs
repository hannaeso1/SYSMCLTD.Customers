using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SYSMCLTD.Customers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SYSMCLTD.Customers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly SYSMCLTDCustomersDBContext _dbContext;

        public CustomersController()
        {
            this._dbContext = new SYSMCLTDCustomersDBContext();
        }

        // GET: api/<CustomersController>
        [HttpGet]
        public List<Customer> Get()
        {
            try
            {
                var customers = this._dbContext.Customers.Where(c => !c.IsDeleted);
                if (customers != null)
                    return customers.ToList();
            }
            catch(Exception ex)
            {
                //Write to log
            }
            return null;
        }

        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public Customer Get(int id)
        {
            var customer = this._dbContext.Customers.Where(c => !c.IsDeleted && c.Id == id).Include(c => c.Addresses).Include(c => c.Contacts).First();
            return customer;
        }

        // POST api/<CustomersController>
        [HttpPost]
        public async Task<ActionResult<Customer>> Post([FromBody] Customer customer)
        {
            try
            {
                var currentCustomer = await this._dbContext.Customers.AnyAsync(c => c.CustomerNumber == customer.CustomerNumber);
                if (currentCustomer)
                    return StatusCode(StatusCodes.Status500InternalServerError,$"Customer with Customer Number {customer.CustomerNumber} already exist");

                this._dbContext.Customers.Add(customer);
                this._dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating customer");
            }
            return Ok();

           
        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Customer>> Put(int id, [FromBody] Customer customer)
        {
            try
            {
                if (id != customer.Id)
                    return BadRequest("Customer ID mismatch");

                var currentCustomer = await this._dbContext.Customers.AnyAsync(c => c.Id == id); 
                if (!currentCustomer)
                    return NotFound($"Customer with Id = {id} not found");

                var isExistCustomerNumber = await this._dbContext.Customers.AnyAsync(c => c.Id != id && c.CustomerNumber == customer.CustomerNumber);
                if (isExistCustomerNumber)
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Customer with Customer Number {customer.CustomerNumber} already exist");

                this._dbContext.Customers.Update(customer);
                this._dbContext.SaveChanges();
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
            return Ok();
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> Delete(int id)
        {
            try
            {
                var isCustomerExist = await this._dbContext.Customers.AnyAsync(c => c.Id == id); // Change
                if (!isCustomerExist)
                    return NotFound($"Customer with Id = {id} not found");

                var customer = this._dbContext.Customers.Find(id);
                customer.IsDeleted = true;
                this._dbContext.SaveChanges(); 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
            return Ok();

           /* var customer = this._dbContext.Customers.Find(id);
            if (customer == null)
            {
                return;
            }

            customer.IsDeleted = true;
            this._dbContext.SaveChanges();*/
        }
    }
}
