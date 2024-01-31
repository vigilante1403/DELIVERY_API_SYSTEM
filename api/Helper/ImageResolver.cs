
using api.DTO;
using api.Models;
using AutoMapper;

namespace api.Helper{
    public  class ImageResolver:IValueResolver<Delivery,ReturnDelivery,string>
    {
        // private IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        // public ProductImageUrlResolver(IConfiguration config){
        //     _config = config;
        // }
        public ImageResolver(IHttpContextAccessor httpContextAccessor){
            _httpContextAccessor=httpContextAccessor;
        }

        public string Resolve(Delivery source, ReturnDelivery destination, string? destMember, ResolutionContext? context)
        {
             if(!string.IsNullOrEmpty(source.ReceiveImage)){
                string baseUrl = _httpContextAccessor.HttpContext.Request.Scheme+"://"+_httpContextAccessor.HttpContext.Request.Host;
                return baseUrl+"/"+source.ReceiveImage;
            }
            return null;
        }

        
    }
}