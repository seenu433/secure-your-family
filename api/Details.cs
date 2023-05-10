using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.AI.OpenAI;
using Azure;
using System.Text;
using Azure.Storage.Blobs;
using System.Linq;
using System.Text.RegularExpressions;
using System.Collections.Generic;

namespace SecureYourFamily
{
    public class Completion
    {
        public string Id { get; set; } = Guid.NewGuid().ToString("n");
        public string Name { get; set; }
        public string Text { get; set; }
    }

    public static class Details
    {
        public static Response<ChatCompletions> GetCompletion(string key, string category)
        {
            var AOAI_ENDPOINT = Environment.GetEnvironmentVariable("SYF_AOAI_ENDPOINT");
            var AOAI_KEY = Environment.GetEnvironmentVariable("SYF_AOAI_KEY");
            var AOAI_DEPLOYMENTID = Environment.GetEnvironmentVariable("SYF_AOAI_DEPLOYMENTID");

            var endpoint = new Uri(AOAI_ENDPOINT);
            var credentials = new Azure.AzureKeyCredential(AOAI_KEY);
            var openAIClient = new OpenAIClient(endpoint, credentials);

            string systemPrompt = "";
            string userPrompt = "";
            if (category == "details")
            {
                systemPrompt = "You are an AI assistant that helps people find information related to " + key + ". The answers should be in the context of death.";
                userPrompt = "Write a paragraph about " + key + " benefit and how it helps survivors.";
            }
            else
            {
                systemPrompt = "You are an AI assistant that helps people find information related to " + key + ". The answers should be in the context of death. Let the format be just a list of products with heading followed by hyphen. Give up to 10 products. Do not include the question again.";
                userPrompt = "give me a list of related products to " + key + " with details.";
            }


            var chatCompletionsOptions = new ChatCompletionsOptions()
            {
                Messages =
                {
                    new ChatMessage(ChatRole.System, systemPrompt),
                    new ChatMessage(ChatRole.User, userPrompt)
                },
                MaxTokens = 800,
                Temperature = 0.7f,
                NucleusSamplingFactor = (float)0.95,
                FrequencyPenalty = 0,
                PresencePenalty = 0
            };

            Response<ChatCompletions> response = openAIClient.GetChatCompletions(
                deploymentOrModelName: AOAI_DEPLOYMENTID, //
                chatCompletionsOptions);

            return response;

        }

        public static string ReadFromBlob(string key, string category, string containerName, ILogger log)
        {
            var storageConnection = Environment.GetEnvironmentVariable("SYF_StorageConnection");

            BlobServiceClient blobServiceClient = new BlobServiceClient(storageConnection);
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);
            BlobClient blobClient = containerClient.GetBlobClient(key);

            string completion = "";

            if (blobClient.Exists())
            {
                var response = blobClient.Download();
                using (var streamReader = new StreamReader(response.Value.Content))
                {
                    while (!streamReader.EndOfStream)
                    {
                        completion = streamReader.ReadToEnd();
                    }
                }
            }
            else
            {
                var response = GetCompletion(key, category);
                completion = ProcessListResponse(response.Value.Choices[0].Message.Content, category, log);
                blobClient.Upload(new MemoryStream(Encoding.UTF8.GetBytes(completion)));
            }

            return completion;
        }

        public static string ProcessListResponse(string response, string category, ILogger log)
        {
            if (category == "details")
            {
                List<Completion> completions = new List<Completion>();
                completions.Add(new Completion { Name = "", Text = response });
                return JsonConvert.SerializeObject(completions);
            }
            else
            {
                var splits = response.Split("\n");
                splits = splits.Where(x => !string.IsNullOrEmpty(x)).ToArray();
                var completions = splits.Select(x => Extract(x)).ToList();

                return JsonConvert.SerializeObject(completions.Where(x => !string.IsNullOrEmpty(x.Text)).ToList());
            }

        }

        public static Completion Extract(string split)
        {
            string pattern = @"^\d*\. (.*?)-(.*)";
            MatchCollection matches = Regex.Matches(split, pattern, RegexOptions.IgnoreCase);
            if (matches.Count != 0)
            {
                Match match = matches[0];
                return new Completion { Name = match.Groups[1].Value, Text = match.Groups[2].Value };
            }
            else
            {
                return new Completion { Name = "", Text = "" };
            }
        }

        [FunctionName("Details")]
        [StorageAccount("StorageConnection")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "details")] HttpRequest req,
            ILogger log)
        {
            string key = req.Query["key"];
            string category = req.Query["category"];

            if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(category))
            {
                return new BadRequestObjectResult("Please pass a key and a category on the query string");
            }
            else if (category == "details")
            {
                return new OkObjectResult(ReadFromBlob(key, category, "details", log));
            }
            else if (category == "related")
            {
                return new OkObjectResult(ReadFromBlob(key, category, "related", log));
            }
            else
            {
                return new BadRequestObjectResult("Something went wrong");
            }
        }
    }
}
