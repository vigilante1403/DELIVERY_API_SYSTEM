using Microsoft.AspNetCore.Mvc;

namespace api.Exceptions{
    public class ValidateInputErrorResponse:ErrorResponse{
        public ValidateInputErrorResponse(int statusCode,string message=null):base(statusCode,message){ // when receive, send to super class

        }
        public  IEnumerable<string> Errors {get;set;}


    }
}