using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace api.Data{
    public class IdentityInitializer{
        public static async Task CreateRolesAsync(
            RoleManager<IdentityRole> roleManager
        ){
            string[] roles ={"user","admin","employee"};
            foreach(var role in roles){
                var flag = await roleManager.RoleExistsAsync(role);
                if(!flag){
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
        public static async Task SeedUserAsync( //use usermanager to get crud of user
            UserManager<AppUser> userManager
        ){
            if(!userManager.Users.Any()){
                var user = new AppUser{
                    DisplayName="Vy",
                    Email="admin@gmail.com",
                    UserName="admin",
                    
                };
               await userManager.CreateAsync(user,"password");
               await userManager.AddToRoleAsync(user,"admin");
            }

        }
      
    }
}