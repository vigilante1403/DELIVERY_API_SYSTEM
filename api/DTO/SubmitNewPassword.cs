namespace api.DTO{
    public class SubmitNewPassword {
        public string email {get;set;}
        public string oldPassword {get; set;}
        public string newPassword { get; set; }
    }
}