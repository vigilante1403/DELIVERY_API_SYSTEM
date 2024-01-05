using api.DAl;
using api.DAL;
using api.Data;
using api.Models;
using api.services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddIdentityCore<AppUser>(options=>{
                        options.Password.RequireNonAlphanumeric=false;
                        options.Password.RequireUppercase=false;
                        options.Password.RequireDigit=false;
                        options.Password.RequireLowercase=false;
                        options.Password.RequiredLength=1;
                        })
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddSignInManager<SignInManager<AppUser>>();
builder.Services.AddAuthentication();
builder.Services.AddDbContext<ApplicationDbContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
builder.Services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
builder.Services.AddScoped<ITokenService,TokenService>();
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
await ApplicationDbSeed.Seed(app);

app.Run();
