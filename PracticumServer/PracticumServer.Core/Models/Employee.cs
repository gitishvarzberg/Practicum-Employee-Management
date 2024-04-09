using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.Models
{
  
    public class Employee
    {
        public int Id { get; set; } 
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set;}
        public Gender Gender { get; set; }
        public List<RoleEmployee> Roles { get; set; }
        public bool IsDeleted { get; set; }
    }
}
