using api.DAL;
using api.Models;
namespace api.DAl{
    public interface IUnitOfWork:IDisposable{
        void Save();
        GenericRepository<Address> AddressRepository {get;set;}
        GenericRepository<CalculateCharges> CalculateChargesRepository {get;set;}
        GenericRepository<Customer> CustomerRepository {get;set;}
        GenericRepository<Delivery> DeliveryRepository{get;set;}
        GenericRepository<DeliveryAgent> DeliveryAgentRepository{get;set;}
        GenericRepository<DeliveryStatus> DeliveryStatusRepository{get;set;}
        GenericRepository<Order> OrderRepository{get;set;}
        GenericRepository<OrderDetail> OrderDetailRepository{get;set;}
        GenericRepository<OrderPayment> OrderPaymentRepository{get;set;}
        GenericRepository<OrderPaymentStatus> OrderPaymentStatusRepository{get;set;}
        GenericRepository<OrderStatus> OrderStatusRepository{get;set;}
        GenericRepository<Parcel> ParcelRepository{get;set;}
        GenericRepository<Service> ServiceRepository{get;set;}
        GenericRepository<ResetPassword> ResetPasswordRepository{get;set;}
        GenericRepository<AllPlacesInCountry> AllPlacesInCountryRepository{get;set;}
        GenericRepository<District> DistrictRepository{get;set;}
        GenericRepository<Ward> WardRepository{get;set;}
        GenericRepository<PricePerDistance> PricePerDistanceRepository{get;set;}
        GenericRepository<CancelOrderSubmittedByCustomer> CancelOrderSubmittedByCustomerRepository{get;set;}
        

    }
}