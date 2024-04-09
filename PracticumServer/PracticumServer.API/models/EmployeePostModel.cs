using PracticumServer.Core.Models;

namespace PracticumServer.API.models
{
    public class EmployeePostModel
    {
        public int Id { get; set; } 
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public List<RoleEmployeePostModel> Roles { get; set; }
    }
}
