using PracticumServer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.Repositories
{
    public interface IEmployeeRepository
    {

        Task<IEnumerable<Employee>> GetEmployeeAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> AddEmployeeAsynce(Employee employee);
        Task<Employee> UpdateEmployeeAsynce(Employee employee);
        Task DeleteEmployeeAsynce(int id);

    }
}
