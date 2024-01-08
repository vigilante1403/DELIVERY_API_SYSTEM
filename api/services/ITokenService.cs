using api.Models;

namespace api.services{
    public interface ITokenService{
        Task<string> CreateToken(AppUser user);
        Task<string> CreateAdminToken(AppUser user);
    }
}