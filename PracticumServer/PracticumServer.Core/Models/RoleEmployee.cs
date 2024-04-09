using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Core.Models
{
    public class RoleEmployee
    {
        public int RoleNameId { get; set; }
        public int EmployeeId { get; set; }
        public bool IsManagerialRole { get; set; }
        public DateTime DateOfEntryIntoRole { get; set; }
    }
}
