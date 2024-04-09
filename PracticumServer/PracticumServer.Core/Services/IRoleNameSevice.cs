using PracticumServer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.Services
{
    public interface IRoleNameSevice
    {
        Task<IEnumerable<RoleName>> GetRoleNameAsync();
        Task<RoleName> GetRoleNameByIdAsync(int id);
        Task<RoleName> AddRoleNameAsynce(RoleName roleName);
        Task<RoleName> UpdateRoleNameAsynce(RoleName roleName);
        Task DeleteRoleNameAsynce(int id);
    }
}
