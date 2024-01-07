namespace api.DTO{
    public class SubmitAddress{
        public string Id { get; set; }
        public string startAddress { get; set; }
        public string endAddress { get; set; }
        public SubmitAddress(){}
        public SubmitAddress(string id){
            Id=id;
        }
    }
}