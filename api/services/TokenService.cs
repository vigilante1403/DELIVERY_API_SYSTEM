using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.services{
    public class TokenService:ITokenService{
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config){
            _config=config;
            _key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
        }
        public string CreateToken(AppUser user){
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.GivenName,user.DisplayName),
                new Claim(ClaimTypes.Role,"user")
            };
            var credentials = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);
            var TokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = credentials,
                Expires = DateTime.Now.AddDays(4),
                Issuer = _config["Token:Issuer"],
                Audience = _config["Token:Audience"]
            };
            var tokenHandler = new JwtSecurityTokenHandler();
             var token = tokenHandler.CreateToken(TokenDescriptor);
             return tokenHandler.WriteToken(token);
        }
    }
}