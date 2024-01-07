using System.Text.Json;
using api.DAl;
using api.DTO;
using StackExchange.Redis;


namespace api.DAL{
    public class BasketRepo : IBasketRepo
    {
        private readonly IDatabase db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public BasketRepo(IConnectionMultiplexer redis,IUnitOfWork unitOfWork,IHttpContextAccessor httpContextAccessor){
            db=redis.GetDatabase();
            _unitOfWork=unitOfWork;
            _httpContextAccessor=httpContextAccessor;
        }
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
           return await db.KeyDeleteAsync(basketId);
        }

        public async Task<SubmitAddress> GetBasketAsync(string basketId)
        {
            var data = await db.StringGetAsync(basketId);
            return data.IsNullOrEmpty?null:JsonSerializer.Deserialize<SubmitAddress>(data);
        }
        

        public async Task<SubmitAddress> UpdateBasketAsync(SubmitAddress address)
        {
           bool flag= await db.StringSetAsync(address.Id,JsonSerializer.Serialize(address),TimeSpan.FromDays(2));
           if(!flag){
            return null;
           }
           return await GetBasketAsync(address.Id);
        }
        

        
    }

       
    }

