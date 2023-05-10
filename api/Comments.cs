using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure;
using Azure.Data.Tables;
using System.Linq;



namespace SecureYourFamily
{
    public static class Mappings
    {
        public static CommentTableEntity ToTableEntity(this Comment comment)
        {
            return new CommentTableEntity()
            {
                PartitionKey = "COMMENT",
                RowKey = comment.Id,
                CreatedTime = comment.CreatedTime,
                FirstName = comment.FirstName,
                LastName = comment.LastName,
                Title = comment.Title,
                Text = comment.Text
            };
        }

        public static Comment ToComment(this CommentTableEntity comment)
        {
            return new Comment()
            {
                Id = comment.RowKey,
                CreatedTime = comment.CreatedTime,
                FirstName = comment.FirstName,
                LastName = comment.LastName,
                Title = comment.Title,
                Text = comment.Text
            };
        }

    }

    public class Comment
    {
        public string Id { get; set; } = Guid.NewGuid().ToString("n");
        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }

    public class CommentTableEntity : BaseTableEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime CreatedTime { get; set; }
    }

    public class BaseTableEntity : ITableEntity
    {
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }

    public static class Comments
    {
        private const string Route = "comments";
        private const string TableName = "comments";
        private const string PartitionKey = "COMMENT";

        public static string CleanInput(string strIn)
        {
            // Replace invalid characters with empty strings.
            try
            {
                return Regex.Replace(strIn, @"[^\w\s\r\n!,&.@-]", "",
                                     RegexOptions.None, TimeSpan.FromSeconds(1.5));
            }
            // If we timeout when replacing invalid characters,
            // we should return Empty.
            catch (RegexMatchTimeoutException)
            {
                return String.Empty;
            }
        }

        [FunctionName("CreateComment")]
        public static async Task<IActionResult> SubmitComment(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "comments")] HttpRequest req,
            [Table(TableName, Connection = "SYF_TableConnection")] IAsyncCollector<CommentTableEntity> commentTable,
            ILogger log)
        {
            log.LogInformation("Creating a new todo list item");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var input = JsonConvert.DeserializeObject<Comment>(requestBody);

            input.Text = CleanInput(input.Text);
            input.Title = CleanInput(input.Title);
            input.FirstName = CleanInput(input.FirstName);
            input.LastName = CleanInput(input.LastName);

            await commentTable.AddAsync(input.ToTableEntity());
            return new OkObjectResult(input);
        }

        [FunctionName("GetComments")]
        public static async Task<IActionResult> GetComments(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "comments")] HttpRequest req,
            [Table(TableName, Connection = "SYF_TableConnection")] TableClient commentTable,
            ILogger log)
        {
            // await todoTable.CreateIfNotExistsAsync();
            log.LogInformation("Getting todo list items");
            var page1 = await commentTable.QueryAsync<CommentTableEntity>().AsPages().FirstAsync();

            return new OkObjectResult(page1.Values.Select(Mappings.ToComment));
        }
    }


}
