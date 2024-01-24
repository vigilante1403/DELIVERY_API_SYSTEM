namespace api.DTO{
    public class ReturnParcel{
         public int Id { get; set; }
        public string ParcelName { get; set; }
        public decimal Weight { get; set; }
        public string ImageUrl { get; set; }
        public int? Quantity { get; set; }

    }
}