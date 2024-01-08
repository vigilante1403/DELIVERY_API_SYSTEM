using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace api.Data{
    public class ApplicationDbSeed{
        public static async Task Seed(IApplicationBuilder applicationBuilder){
            using(var scope=applicationBuilder.ApplicationServices.CreateScope()){
               var context=scope.ServiceProvider.GetService<ApplicationDbContext>();
                    
                   
               
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            await IdentityInitializer.CreateRolesAsync(roleManager);
            await IdentityInitializer.SeedUserAsync(userManager);
             
            }
        }
    }
}