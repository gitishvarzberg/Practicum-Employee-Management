using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PracticumServer.Core.DTOs;
using PracticumServer.Core.Models;
using PracticumServer.Core.Services;
using PracticumServer.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PracticumServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleNamesController : ControllerBase
    {
        private readonly IRoleNameSevice _roleNameSevice;
        private readonly IMapper _mapper;

        public RoleNamesController(IRoleNameSevice roleNameSevice, IMapper mapper)
        {
            _roleNameSevice = roleNameSevice;
            _mapper = mapper;
        }
        // GET: api/<RoleNamesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roleNames = await _roleNameSevice.GetRoleNameAsync();
            return Ok(_mapper.Map<IEnumerable<RoleNameDto>>(roleNames));
        }

        // GET api/<RoleNamesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var roleName = await _roleNameSevice.GetRoleNameByIdAsync(id);
            return Ok(_mapper.Map<RoleNameDto>(roleName));
        }

        // POST api/<RoleNamesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleName roleName)
        {
            var newRoleName = await _roleNameSevice.AddRoleNameAsynce(_mapper.Map<RoleName>(roleName));
            return Ok(_mapper.Map<RoleNameDto>(newRoleName)); 
        }

        // PUT api/<RoleNamesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RoleName roleName)
        {
            var roleNameTemp = await _roleNameSevice.GetRoleNameByIdAsync(id);
            if (roleNameTemp is null)
            {
                return NotFound();
            }
            _mapper.Map(roleName, roleNameTemp);
            await _roleNameSevice.UpdateRoleNameAsynce(roleName);
            roleNameTemp = await _roleNameSevice.GetRoleNameByIdAsync(id);
            return Ok(_mapper.Map<RoleNameDto>(roleNameTemp));
        }

        // DELETE api/<RoleNamesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var roleName = await _roleNameSevice.GetRoleNameByIdAsync(id);
            if (roleName is null)
            {
                return NotFound();
            }

            await _roleNameSevice.DeleteRoleNameAsynce(id);
            return NoContent();
        }
    }
}
