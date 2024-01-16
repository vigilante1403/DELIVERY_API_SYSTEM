using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data{
    public class ApplicationDbContext:IdentityDbContext<AppUser>{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options){

        }
       public DbSet<Service> Services{get;set;}
       public DbSet<Customer> Customers{get;set;}
       public DbSet<CalculateCharges> CalculateCharges {get;set;}
       public DbSet<Address> Addresses{get;set;}
       public DbSet<Delivery> Deliveries {get;set;}
       public DbSet<DeliveryAgent> DeliveryAgents {get;set;}
       public DbSet<DeliveryStatus> DeliveryStatuses{get;set;}
       public DbSet<Order> Orders {get;set;}
       public DbSet<OrderDetail> OrderDetails {get;set;}
       public DbSet<OrderPayment> OrderPayments {get;set;}
       public DbSet<OrderPaymentStatus> OrderPaymentStatuses {get;set;}
       public DbSet<OrderStatus> OrderStatuses {get;set;}
       public DbSet<Parcel> Parcels {get;set;}
       public DbSet<ResetPassword> ResetPasswords{get;set;}
        public DbSet<AllPlacesInCountry> AllPlacesInCountries{get;set;}
        public DbSet<District> Districts{get;set;}
        public DbSet<Ward> Wards{get;set;}
        public DbSet<PricePerDistance> PricePerDistances{get;set;}
    }
}