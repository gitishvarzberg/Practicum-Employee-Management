using PracticumServer.Core.Models;
using PracticumServer.Core.Repositories;
using PracticumServer.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeerepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeerepository = employeeRepository;
        }

     

        public async Task DeleteEmployeeAsynce(int id)
        {
            await _employeerepository.DeleteEmployeeAsynce(id);
        }

        public async Task<IEnumerable<Employee>> GetEmployeeAsync()
        {
            return await _employeerepository.GetEmployeeAsync();  
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _employeerepository.GetEmployeeByIdAsync(id);  
        }

        public async Task<Employee> UpdateEmployeeAsynce(Employee employee)
        {
            return await _employeerepository.UpdateEmployeeAsynce(employee);
        }
        public async Task<Employee> AddEmployeeAsynce(Employee employee)
        {
            var existingEmployees = await _employeerepository.GetEmployeeAsync();

            if (existingEmployees.Any(e => e.Identity == employee.Identity && e.IsDeleted==false)
                ||employee.Identity.Length!=9
                ) 
            {
                return null;
            }
            return await _employeerepository.AddEmployeeAsynce(employee);
        }
    }
       
}

