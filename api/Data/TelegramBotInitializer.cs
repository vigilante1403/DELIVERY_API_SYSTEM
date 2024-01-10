using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types.Enums;

namespace api.Data{
    public class TelegramBotInitializer{
        private static ITelegramBotClient botClient;
        private static HttpClient _http;
        TelegramBotInitializer(HttpClient http){
            _http=http;
        }
        public static async Task BotStart()
        {

            botClient = new TelegramBotClient("6364574574:AAEAldnEyYDRHjV1H6VLqsXLiPk-EydmbRU");

            var me = await botClient.GetMeAsync();
            Console.WriteLine($"Hello! I am {me.FirstName}.");

            botClient.OnMessage += Bot_OnMessage;
            botClient.StartReceiving();

        
        Console.WriteLine("Running bot in non-interactive mode. Press Ctrl+C to exit.");
                while (true)
                {
                    // Do any additional work here
                    Thread.Sleep(1000);
                }
            // botClient.StopReceiving();
        }
        private static async void Bot_OnMessage(object sender, MessageEventArgs e)
        {
            var message = e.Message;

            if (message.Text != null)
            {
                Console.WriteLine($"Received a message from {message.Chat.Id}: {message.Text}");
                if(message.Text=="/start"){
                     await botClient.SendTextMessageAsync(
                    chatId: message.Chat.Id,
                    text: $"Your chat ID is: {message.Chat.Id}",
                    parseMode: ParseMode.Markdown
                );
                }
                else if(message.Text=="/otp"){
                    var client = new HttpClient();
                    var chatId = message.Chat.Id;
                    Console.WriteLine(chatId);
                    try
                    {
                        var response = await client.GetAsync($"https://localhost:7000/api/Service/send-telegram-code/{chatId}");
                    }
                    catch (System.Exception r)
                    {
                        
                         await botClient.SendTextMessageAsync(
                        chatId: message.Chat.Id,
                        text: $"Error!Please try again:Stack Trace {r.Message}",
                        parseMode: ParseMode.Markdown
                        );
                    }
                }else{
                     await botClient.SendTextMessageAsync(
                        chatId: message.Chat.Id,
                        text: "Okay I get what u said but I'm not programmed to answer another question :)",
                        parseMode: ParseMode.Markdown
                        );
                }

                // Respond with the chat ID when the user sends any message
               
                
            }
        }
    }
}