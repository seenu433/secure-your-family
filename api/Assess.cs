using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace SecureYourFamily
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Benefits
    {
        public int index { get; set; }
        public string lifeinsurance { get; set; } = "0";
        public bool socialsecurity { get; set; } = false;
        public string retirement401k { get; set; } = "0";
        public string ira { get; set; } = "0";
        public string savingsaccounts { get; set; } = "0";
        public string brokerageaccounts { get; set; } = "0";
        public string hsaaccounts { get; set; } = "0";
        public bool educationplans { get; set; } = false;
        public string realestate { get; set; } = "0";
        public string accidentaldeathanddismemberment { get; set; } = "0";
        public string terminsurance { get; set; } = "0";
        public bool mortgageprotection { get; set; } = false;
        public string others { get; set; } = "0";
    }

    public class Expenses
    {
        public int index { get; set; }
        public string housing { get; set; } = "0";
        public string transportation { get; set; } = "0";
        public string utilities { get; set; } = "0";
        public string survivorlifeinsurance { get; set; } = "0";
        public string healthcare { get; set; } = "0";
        public bool education { get; set; } = false;
        public string recreation { get; set; } = "0";
        public string others { get; set; } = "0";
    }

    public class Liabilities
    {
        public int index { get; set; }
        public string homemortgage { get; set; } = "0";
        public string carloans { get; set; } = "0";
        public string creditcardbills { get; set; } = "0";
        public string personalloans { get; set; } = "0";
        public string homeinsurance { get; set; } = "0";
        public string carinsurance { get; set; } = "0";
        public string funeralexpenses { get; set; } = "0";
        public string others { get; set; } = "0";
    }

    public class Root
    {
        public Benefits benefits { get; set; }
        public Liabilities liabilities { get; set; }
        public Tax tax { get; set; }
        public Expenses expenses { get; set; }
        public Summary summary { get; set; }
    }

    public class Summary
    {
        public int index { get; set; }
        public string status { get; set; }
        public int totalbenefits { get; set; }
        public int totalliabilities { get; set; }
        public int totaltaxes { get; set; }
        public int networth { get; set; }
        public int totalexpenses { get; set; }
        public int survivalYears { get; set; }
        public string[] movers { get; set; }
        public string[] shakers { get; set; }
        public string[] recommendations { get; set; }

    }

    public class Tax
    {
        public int index { get; set; }
        public string anticipatedtaxes { get; set; } = "0";
    }

    public static class Assess
    {
        public static Summary CalculateAssessment(Root root)
        {
            Summary summary = new Summary();
            summary.index = 4;
            summary.totalbenefits = Convert.ToInt32(root.benefits.lifeinsurance) +
                                     Convert.ToInt32(root.benefits.retirement401k) +
                                     Convert.ToInt32(root.benefits.ira) +
                                     Convert.ToInt32(root.benefits.savingsaccounts) +
                                     Convert.ToInt32(root.benefits.brokerageaccounts) +
                                     Convert.ToInt32(root.benefits.hsaaccounts) +
                                     Convert.ToInt32(root.benefits.realestate) +
                                     Convert.ToInt32(root.benefits.accidentaldeathanddismemberment) +
                                     Convert.ToInt32(root.benefits.terminsurance) +
                                     Convert.ToInt32(root.benefits.others);

            summary.totalliabilities = Convert.ToInt32(root.liabilities.homemortgage) +
                                       Convert.ToInt32(root.liabilities.carloans) +
                                       Convert.ToInt32(root.liabilities.creditcardbills) +
                                       Convert.ToInt32(root.liabilities.personalloans) +
                                       Convert.ToInt32(root.liabilities.homeinsurance) +
                                       Convert.ToInt32(root.liabilities.carinsurance) +
                                       Convert.ToInt32(root.liabilities.funeralexpenses) +
                                       Convert.ToInt32(root.liabilities.others);

            if (!root.benefits.mortgageprotection)
            {
                summary.totalliabilities += Convert.ToInt32(root.liabilities.homemortgage);
            }

            summary.totaltaxes = Convert.ToInt32(root.tax.anticipatedtaxes);

            summary.networth = summary.totalbenefits - summary.totalliabilities - summary.totaltaxes;

            summary.totalexpenses = Convert.ToInt32(root.expenses.housing) +
                                    Convert.ToInt32(root.expenses.transportation) +
                                    Convert.ToInt32(root.expenses.utilities) +
                                    Convert.ToInt32(root.expenses.survivorlifeinsurance) +
                                    Convert.ToInt32(root.expenses.healthcare) +
                                    Convert.ToInt32(root.expenses.recreation) +
                                    Convert.ToInt32(root.expenses.others);

            summary.survivalYears = summary.networth / summary.totalexpenses;

            summary.status = GetStatus(summary.survivalYears);
            return summary;
        }

        public static string GetStatus(int survivalYears)
        {
            switch (survivalYears)
            {
                case < 5:
                    return "Needs Improvement!!! Your funds are not sufficient to secure your family for more than 5 years.";
                case < 10:
                    return "Fair!!! You have sufficient funds to secure your family for more than 5 years.";
                case < 20:
                    return "Good!!! You have sufficient funds to secure your family for more than 10 years.";
                case > 20:
                    return "Excellent!!! You have sufficient funds to secure your family for more than 20 years.";
                default:
                    return "I am sorry, I don't have enough information to assess your status.";
            }
        }

        [FunctionName("Assess")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "assess")] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            Root data = JsonSerializer.Deserialize<Root>(requestBody);

            log.LogInformation("data: " + requestBody);
            log.LogInformation("benefits: " + data.benefits.lifeinsurance);

            Summary result = CalculateAssessment(data);
            //result.movers= AssessMovers(data, result);
            //result.shakers = AssessShakers(data, result);
            //result.recommendations = AssessRecommendations(data, result);

            return new OkObjectResult(result);
        }

        private static string[] AssessShakers(Root data, Summary result)
        {
            throw new NotImplementedException();
        }

        private static string[] AssessRecommendations(Root data, Summary result)
        {
            throw new NotImplementedException();
        }

        private static string[] AssessMovers(Root data, Summary result)
        {
            throw new NotImplementedException();
        }
    }
}
