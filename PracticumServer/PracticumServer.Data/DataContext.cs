using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PracticumServer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticumServer.Data
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<RoleEmployee> Roles { get; set; }
        public DbSet<RoleName> RoleNames { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=my_db");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoleEmployee>()
                .HasKey(e => new { e.RoleNameId, e.EmployeeId });
        }
    }
}
