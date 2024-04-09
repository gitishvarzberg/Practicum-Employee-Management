using Microsoft.EntityFrameworkCore;
using PracticumServer.Core.Models;
using PracticumServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace PracticumServer.Data.Repositories
{
    public class RoleNameRepository : IRoleNameRepository
    {
        private readonly DataContext _context;

        public RoleNameRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<RoleName> AddRoleNameAsynce(RoleName roleName)
        {
            _context.RoleNames.Add(roleName);
            await _context.SaveChangesAsync();
            return roleName;
        }

        public async Task DeleteRoleNameAsynce(int id)
        {
            var roleName = await GetRoleNameByIdAsync(id);
            _context.RoleNames.Remove(roleName);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<RoleName>> GetRoleNameAsync()
        {
            return await _context.RoleNames.ToListAsync();
        }

        public async Task<RoleName> GetRoleNameByIdAsync(int id)
        {
            return await _context.RoleNames.FirstAsync(x => x.Id == id);
        }

        public async Task<RoleName> UpdateRoleNameAsynce(RoleName roleName)
        {
            var exitRoleName = await GetRoleNameByIdAsync(roleName.Id);
            _context.Entry(exitRoleName).CurrentValues.SetValues(roleName);
            await _context.SaveChangesAsync();
            return exitRoleName;

        
        }
    }
}
