using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticumServer.API.models;
using PracticumServer.Core.DTOs;
using PracticumServer.Core.Models;
using PracticumServer.Core.Repositories;
using PracticumServer.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticumServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = await _employeeService.GetEmployeeAsync();
            return Ok(_mapper.Map<IEnumerable<EmploteeDto>>(employees));
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            return Ok(_mapper.Map<EmploteeDto>(employee));
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            
            var newEmployee = await _employeeService.AddEmployeeAsynce(_mapper.Map<Employee>(employee));
            return Ok(_mapper.Map<EmploteeDto>(newEmployee));
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var employeeTemp = await _employeeService.GetEmployeeByIdAsync(id);
            if (employeeTemp is null)
            {
                return NotFound();
            }
            _mapper.Map(employee, employeeTemp);
            await _employeeService.UpdateEmployeeAsynce(_mapper.Map<Employee>(employee));
            employeeTemp = await _employeeService.GetEmployeeByIdAsync(id);
            return Ok(_mapper.Map<EmploteeDto>(employeeTemp));
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }

            await _employeeService.DeleteEmployeeAsynce(id);
            return NoContent();
        }
    }
}
