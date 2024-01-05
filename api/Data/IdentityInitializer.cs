using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Data{
    public class IdentityInitializer{
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
            }

        }
    }
}