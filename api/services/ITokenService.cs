using api.Models;

namespace api.services{
    public interface ITokenService{
        string CreateToken(AppUser user);
    }
}