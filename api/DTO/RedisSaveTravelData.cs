namespace api.DTO{
    public class RedisSaveTravelData{
        public string orderId { get; set; }
        public string startAddress { get; set; }
        public string endAddress { get; set; }
        public string Distance { get; set; }
        public string DurationByMinutes { get; set; }
        public RedisSaveTravelData(){}
        public RedisSaveTravelData(string id){
            orderId=id;
        }
    }
}