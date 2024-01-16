using api.DTO;
namespace api.DAl{
    public interface IBasketRepo{
        Task<RedisSaveTravelData> GetBasketAsync(string basketId);
        
        Task<RedisSaveTravelData> UpdateBasketAsync(RedisSaveTravelData basket);
       
        Task<bool> DeleteBasketAsync(string basketId);
    }
}