using api.DTO;
using AutoMapper;
using api.Models;
namespace api.Helper{
    public class MyAutoMapper:Profile
    {
        public MyAutoMapper(){
            
            CreateMap<Order,OrderDTO>()
                .ForMember(d=>d.Service,o=>o.MapFrom(s=>s.Service.ServiceName))
                .ForMember(f=>f.CustomerId,r=>r.MapFrom(w=>w.Customer.Id))
                .ForMember(d=>d.OrderStatus,e=>e.MapFrom(r=>r.OrderStatus.StatusName))
                .ForMember(t=>t.OrderPaymentId,y=>y.MapFrom(q=>q.OrderPayment.Id))
                 //khai bao input & output
            ;
            CreateMap<District,DistrictDTO>()
            .ForMember(d=>d.AllPlacesInCountryId,r=>r.MapFrom(o=>o.AllPlacesInCountry.Id));
            CreateMap<Ward,WardDTO>()
            .ForMember(e=>e.DistrictId,w=>w.MapFrom(q=>q.District.Id));
            
        }
    }
}