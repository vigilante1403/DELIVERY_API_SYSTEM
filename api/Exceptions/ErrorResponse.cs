namespace api.Exceptions{
    public class ErrorResponse
    {
        public int StatusCode { get; set; }
        public string Message {get;set;} 
        private string getDefaultMessageFromStatusCode(int statusCode){
            return statusCode switch{
                400=>"A bad request from client",
                401=>"You are not authorized",
                404=>"Resource not found",
                500=>"Server error",
                _=>null
            };
        }
        public ErrorResponse(int statusCode, string message=null)
        {
            StatusCode=statusCode;
            Message=message??getDefaultMessageFromStatusCode(statusCode);
        }
    }
}