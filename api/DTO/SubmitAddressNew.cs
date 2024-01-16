namespace api.DTO{
    public class SubmitAddressNew{
        public int LocationStartPlaceId { get; set; }
        public int LocationEndPlaceId { get; set; }
        public int LocationStartDistrictId { get; set; }
        public int LocationEndDistrictId { get; set; }
        public int LocationStartWardId { get; set; }
        public int LocationEndWardId { get; set; }
        public string LocationStartStreet { get; set; }
        public string LocationEndStreet { get; set; }
        public string ContactName { get; set; }
        public string ContactPhoneNumber { get; set; }
        public string SenderName { get; set; }
        public string SenderPhoneNumber { get; set; }

    }
}