using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server
{
  public class AppDbContext : IdentityDbContext {
    public AppDbContext(DbContextOptions opt) : base(opt)
    {

    }
  }
}
