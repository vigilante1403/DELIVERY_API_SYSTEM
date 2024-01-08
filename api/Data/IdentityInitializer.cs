using System.Net;
using System.Net.Mail;
using api.Models;
using Microsoft.AspNetCore.Identity;

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
       public static async Task<bool> SendEmailAsync(string userEmail="new.vytruong.1812@gmail.com")
    {
        try
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("new.vytruong.1812@gmail.com", "erya gvus chag rvok"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("new.vytruong.1812@gmail.com"),
                Subject = "Password Reset Token",
                Body = $"Your password reset token is: hihi",
                IsBodyHtml = false,
            };

            mailMessage.To.Add(userEmail);

            await smtpClient.SendMailAsync(mailMessage);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            return false;
        }
    }
    }
}