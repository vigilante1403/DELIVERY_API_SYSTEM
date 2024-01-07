using api.DTO;
namespace api.DAl{
    public interface IBasketRepo{
        Task<SubmitAddress> GetBasketAsync(string basketId);
        
        Task<SubmitAddress> UpdateBasketAsync(SubmitAddress basket);
       
        Task<bool> DeleteBasketAsync(string basketId);
    }
}