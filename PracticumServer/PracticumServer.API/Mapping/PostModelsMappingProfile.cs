using AutoMapper;
using PracticumServer.API.models;
using PracticumServer.Core.Models;

namespace PracticumServer.API.Mapping
{
    public class PostModelsMappingProfile:Profile
    {
  
        public PostModelsMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<RoleNamePostModel, RoleName>();
            CreateMap<RoleEmployeePostModel, RoleEmployee>();

        }
    }
}
