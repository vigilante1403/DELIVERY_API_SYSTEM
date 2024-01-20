namespace api.DTO{
    public class ReturnPayInfoParcel{
        public int OrderId { get; set; }
        public OrderDTO OrderDTO { get; set; }
        public List<ReturnParcel> ReturnParcels { get; set; }
        public ReturnPayment ReturnPayment { get; set; }
    }
}