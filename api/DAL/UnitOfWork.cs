using api.DAl;
using api.Data;
using api.Models;

namespace api.DAL{
    public class UnitOfWork:IUnitOfWork{
        private  GenericRepository<Address> _addressRepository;
        private GenericRepository<CalculateCharges> _calculateChargesRepository;
        private GenericRepository<Customer> _customerRepository;
        private  GenericRepository<Delivery> _deliveryRepository;
        private GenericRepository<DeliveryAgent> _deliveryAgentRepository;
        private GenericRepository<DeliveryStatus> _deliveryStatusRepository;
        private  GenericRepository<Order> _orderRepository;
        private GenericRepository<OrderDetail> _orderDetailRepository;
        private GenericRepository<OrderPayment> _orderPaymentRepository;
        private GenericRepository<OrderPaymentStatus> _orderPaymentStatusRepository;
        private GenericRepository<OrderStatus> _orderStatusRepository;
        private GenericRepository<Parcel> _parcelRepository;
        private GenericRepository<Service> _serviceRepository;
        private GenericRepository<ResetPassword> _resetPasswordRepository;

        
        public readonly ApplicationDbContext _db;
        public UnitOfWork(ApplicationDbContext db){
            _db=db;
        }
        public GenericRepository<Address> AddressRepository{
            get{
                if(_addressRepository==null){
                    this._addressRepository = new GenericRepository<Address>(_db);
                }
                return _addressRepository;
            }
            set{
                _addressRepository=value;
            }
        }
        public GenericRepository<CalculateCharges> CalculateChargesRepository{
            get{
                if(_calculateChargesRepository==null){
                    this._calculateChargesRepository = new GenericRepository<CalculateCharges>(_db);
                }
                return _calculateChargesRepository;
            }
            set{
                _calculateChargesRepository=value;
            }
        }
        public GenericRepository<Customer> CustomerRepository{
            get{
                if(_customerRepository==null){
                    this._customerRepository = new GenericRepository<Customer>(_db);
                }
                return _customerRepository;
            }
            set{
                _customerRepository=value;
            }
        }
        public GenericRepository<Delivery> DeliveryRepository{
            get{
                if(_deliveryRepository==null){
                    this._deliveryRepository = new GenericRepository<Delivery>(_db);
                }
                return _deliveryRepository;
            }
            set{
                _deliveryRepository=value;
            }
        }
        public GenericRepository<DeliveryAgent> DeliveryAgentRepository{
            get{
                if(_deliveryAgentRepository==null){
                    this._deliveryAgentRepository = new GenericRepository<DeliveryAgent>(_db);
                }
                return _deliveryAgentRepository;
            }
            set{
                _deliveryAgentRepository=value;
            }
        }
        public GenericRepository<DeliveryStatus> DeliveryStatusRepository{
            get{
                if(_deliveryStatusRepository==null){
                    this._deliveryStatusRepository = new GenericRepository<DeliveryStatus>(_db);
                }
                return _deliveryStatusRepository;
            }
            set{
                _deliveryStatusRepository=value;
            }
        }
        public GenericRepository<Order> OrderRepository{
            get{
                if(_orderRepository==null){
                    this._orderRepository = new GenericRepository<Order>(_db);
                }
                return _orderRepository;
            }
            set{
                _orderRepository=value;
            }
        }
        public GenericRepository<OrderDetail> OrderDetailRepository{
            get{
                if(_orderDetailRepository==null){
                    this._orderDetailRepository = new GenericRepository<OrderDetail>(_db);
                }
                return _orderDetailRepository;
            }
            set{
                _orderDetailRepository=value;
            }
        }
        public GenericRepository<OrderPayment> OrderPaymentRepository{
            get{
                if(_orderPaymentRepository==null){
                    this._orderPaymentRepository = new GenericRepository<OrderPayment>(_db);
                }
                return _orderPaymentRepository;
            }
            set{
                _orderPaymentRepository=value;
            }
        }
        public GenericRepository<OrderPaymentStatus> OrderPaymentStatusRepository{
            get{
                if(_orderPaymentStatusRepository==null){
                    this._orderPaymentStatusRepository = new GenericRepository<OrderPaymentStatus>(_db);
                }
                return _orderPaymentStatusRepository;
            }
            set{
                _orderPaymentStatusRepository=value;
            }
        }
        public GenericRepository<OrderStatus> OrderStatusRepository{
            get{
                if(_orderStatusRepository==null){
                    this._orderStatusRepository = new GenericRepository<OrderStatus>(_db);
                }
                return _orderStatusRepository;
            }
            set{
                _orderStatusRepository=value;
            }
        }
        public GenericRepository<Parcel> ParcelRepository{
            get{
                if(_parcelRepository==null){
                    this._parcelRepository = new GenericRepository<Parcel>(_db);
                }
                return _parcelRepository;
            }
            set{
                _parcelRepository=value;
            }
        }
        public GenericRepository<Service> ServiceRepository{
            get{
                if(_serviceRepository==null){
                    this._serviceRepository = new GenericRepository<Service>(_db);
                }
                return _serviceRepository;
            }
            set{
                _serviceRepository=value;
            }
        }
        public GenericRepository<ResetPassword> ResetPasswordRepository{
            get{
                if(_resetPasswordRepository==null){
                    this._resetPasswordRepository = new GenericRepository<ResetPassword>(_db);
                }
                return _resetPasswordRepository;
            }
            set{
                _resetPasswordRepository=value;
            }
        }
         public void Dispose()
        {
            _db.Dispose();
        }

        public void Save()
        {
            _db.SaveChanges();
        }


    }
}