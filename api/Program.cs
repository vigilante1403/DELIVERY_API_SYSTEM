using api.DAl;
using api.DAL;
using api.Data;
using api.Models;
using api.services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using api.Helper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using StackExchange.Redis;
using Microsoft.AspNetCore.Mvc;
using api.Exceptions;
using api.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddIdentity<AppUser,IdentityRole>(options=>{
                        options.Password.RequireNonAlphanumeric=false;
                        options.Password.RequireUppercase=false;
                        options.Password.RequireDigit=false;
                        options.Password.RequireLowercase=false;
                        options.Password.RequiredLength=1;
                        })
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddSignInManager<SignInManager<AppUser>>()
.AddDefaultTokenProviders()
;

builder.Services.AddHttpClient();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,ops=>{
    ops.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuerSigningKey=true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"])),
        ValidIssuer=builder.Configuration["Token:Issuer"],
        ValidateIssuer = true,
        ValidateLifetime=true,
        ValidAudience = builder.Configuration["Token:Audience"]
    };
});
builder.Services.AddAuthorization(options =>
    {
        // Define a policy for administrators
        options.AddPolicy("AdminPolicy", policy =>
        {
            policy.RequireRole("admin");
            // Add other requirements as needed
        });

        // Define a policy for users
        options.AddPolicy("UserPolicy", policy =>
        {
            policy.RequireRole("user");
            // Add other requirements as needed
        });

        // Add other policies as needed...
    });

builder.Services.AddDbContext<ApplicationDbContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
builder.Services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
builder.Services.AddScoped<ITokenService,TokenService>();
// builder.Services.AddScoped<IBasketRepo,BasketRepo>();
// builder.Services.AddSingleton<IConnectionMultiplexer>(_=>{
//    var connectionRedisurl= ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"),true);
//     return ConnectionMultiplexer.Connect(connectionRedisurl);
// });
builder.Services.Configure<ApiBehaviorOptions>(options=>{
    options.InvalidModelStateResponseFactory = ActionContext =>{
        var errors = ActionContext.ModelState
        .Where(e=>e.Value.Errors.Count>0) //count errors
        .SelectMany(x=>x.Value.Errors)
        .Select(x=>x.ErrorMessage);//concat error strings
        //create error response
        var errorResponse = new ValidateInputErrorResponse(400){
            Errors=errors
        };
        return new BadRequestObjectResult(errorResponse);
    }; //get content of controller when model submit invalid
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options=>{
    options.AddDefaultPolicy(policy=>{
        policy.WithOrigins("http://localhost:4200");
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

builder.Services.AddAutoMapper(typeof(MyAutoMapper));
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  
    // app.UseSwagger();
    // app.UseSwaggerUI();
}
app.UseStatusCodePagesWithReExecute("/Error/{0}");
app.UseMiddleware<ServerErrorExceptionMiddleware>();
app.UseStaticFiles();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();


app.MapControllers();
await ApplicationDbSeed.Seed(app);

app.Run();
