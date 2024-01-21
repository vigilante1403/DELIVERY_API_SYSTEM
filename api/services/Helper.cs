using System.Text;

namespace api.services{
    public class Helper : IHelper
    {
         private static Random random = new Random();
        public  string GenerateRandomString(int length)
        {
           const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder stringBuilder = new StringBuilder(length);

        for (int i = 0; i < length; i++)
        {
            int index = random.Next(chars.Length);
            stringBuilder.Append(chars[index]);
        }
        Console.WriteLine("Random string: ",stringBuilder.ToString());
        return stringBuilder.ToString();
        }
    }
}