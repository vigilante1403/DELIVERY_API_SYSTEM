using api.DAl;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Timers;

namespace api.Data{
    public class ApplicationDbSeed{
        

        public static async Task Seed(IApplicationBuilder applicationBuilder){
            using(var scope=applicationBuilder.ApplicationServices.CreateScope()){
               var context=scope.ServiceProvider.GetService<ApplicationDbContext>();
                
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            await IdentityInitializer.CreateRolesAsync(roleManager);
            await IdentityInitializer.SeedUserAsync(userManager);
            //  TelegramBotInitializer.BotStart();
             
             
             System.Timers.Timer timer = new System.Timers.Timer(10 * 60 * 1000); // 10 minutes in milliseconds

        // Hook up the Elapsed event
        timer.Elapsed +=(sender,e)=> OnTimedEvent(sender,e,applicationBuilder);

        // Start the timer
        timer.Start();
             
            }
        }
        private static void OnTimedEvent(object sender, ElapsedEventArgs e,IApplicationBuilder appBuilder)
        {
             using(var scope=appBuilder.ApplicationServices.CreateScope()){
                 Console.WriteLine("Runnning total step function");
                 var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            // Your logic here, for example:
           SendEmailToCustomerSystem.TotalSteps(unitOfWork);
             }
                
            // SendEmailToCustomerSystem.TotalSteps(unitOfWork);  // Uncomment this line if needed
        }
    }
}