using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using PracticumServer.Core.Models;
using PracticumServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
                _context = context; 
        }

        public async Task<Employee> AddEmployeeAsynce(Employee employee)
        {
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(x => x.Identity == employee.Identity);
            employee.IsDeleted = false;
            if (existingEmployee != null)
            {
                employee.Id = existingEmployee.Id;
                return await UpdateEmployeeAsynce(employee);
            }
            else 
            {
                _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
            }
                
        }
       
        public async Task DeleteEmployeeAsynce(int id)
        {
            var employee = await GetEmployeeByIdAsync(id);
            //_context.Employees.Remove(employee);
           employee.IsDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task< IEnumerable<Employee>> GetEmployeeAsync()
        {
            return await _context.Employees.Include((x=>x.Roles)).Where(e=>e.IsDeleted==false).ToListAsync();   
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.Include((x=>x.Roles)).FirstAsync(x => x.Id == id); 
        }

        public async Task<Employee> UpdateEmployeeAsynce(Employee employee)
        {
            var existingEmployee = await GetEmployeeByIdAsync(employee.Id);

            _context.Entry(existingEmployee).CurrentValues.SetValues(employee); 
            existingEmployee.Roles=employee.Roles;  
            await _context.SaveChangesAsync();
            return existingEmployee;
        }
    }
}
