using PracticumServer.Core.Models;

namespace PracticumServer.API.models
{
    public class RoleEmployeePostModel
    {
        public int RoleNameId { get; set; }
        public bool IsManagerialRole { get; set; }
        public DateTime DateOfEntryIntoRole { get; set; }
    }
}
