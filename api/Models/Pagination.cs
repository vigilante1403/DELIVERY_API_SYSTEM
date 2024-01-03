namespace api.Models{
    public class Pagination{
        public int Page {get;set;}=1;
        private int ItemsPerPage=10;
        private const int MaxSizePage = 20;
        public int PageSize{
            get=>ItemsPerPage;
            set=>ItemsPerPage = (value>MaxSizePage)?MaxSizePage:value;
        }
        
    }
}