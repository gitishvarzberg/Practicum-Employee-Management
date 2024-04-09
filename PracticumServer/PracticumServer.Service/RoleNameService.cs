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
    public class RoleNameService : IRoleNameSevice
    {

        private readonly IRoleNameRepository _roleNameReposiyory; 

        public RoleNameService(IRoleNameRepository roleNameRepository)
        {
            _roleNameReposiyory = roleNameRepository;
        }
        public async Task<RoleName> AddRoleNameAsynce(RoleName roleName)
        {
            return await _roleNameReposiyory.AddRoleNameAsynce(roleName);

        }

        public async Task DeleteRoleNameAsynce(int id)
        {
            await _roleNameReposiyory.DeleteRoleNameAsynce(id);
        }

        public async Task<IEnumerable<RoleName>> GetRoleNameAsync()
        {
            return await _roleNameReposiyory.GetRoleNameAsync();    
        }

        public async Task<RoleName> GetRoleNameByIdAsync(int id)
        {
            return await _roleNameReposiyory.GetRoleNameByIdAsync(id);
        }

        public async Task<RoleName> UpdateRoleNameAsynce(RoleName roleName)
        {
            return await _roleNameReposiyory.UpdateRoleNameAsynce(roleName) ;
        }
    }
}
