using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Collections.Generic;

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
        public int securescore { get; set; }
        public Recommendation[] movers { get; set; }
        public Recommendation[] recommendations { get; set; }

    }

    public class Tax
    {
        public int index { get; set; }
        public string anticipatedtaxes { get; set; } = "0";
    }


    public class Recommendation
    {
        public int index { get; set; }
        public string item { get; set; }
        public string status { get; set; }
    }



    public static class Assess
    {
        public static int GetValue(string value)
        {
            return Convert.ToInt32(value.Trim() == String.Empty ? "0" : value);
        }

        public static Summary CalculateAssessment(Root root)
        {
            Summary summary = new Summary();
            summary.index = 4;
            summary.totalbenefits = GetValue(root.benefits.lifeinsurance) +
                                     GetValue(root.benefits.retirement401k) +
                                     GetValue(root.benefits.ira) +
                                     GetValue(root.benefits.savingsaccounts) +
                                     GetValue(root.benefits.brokerageaccounts) +
                                     GetValue(root.benefits.hsaaccounts) +
                                     GetValue(root.benefits.realestate) +
                                     GetValue(root.benefits.accidentaldeathanddismemberment) +
                                     GetValue(root.benefits.terminsurance) +
                                     GetValue(root.benefits.others);

            summary.totalliabilities = GetValue(root.liabilities.homemortgage) +
                                       GetValue(root.liabilities.carloans) +
                                       GetValue(root.liabilities.creditcardbills) +
                                       GetValue(root.liabilities.personalloans) +
                                       GetValue(root.liabilities.homeinsurance) +
                                       GetValue(root.liabilities.carinsurance) +
                                       GetValue(root.liabilities.funeralexpenses) +
                                       GetValue(root.liabilities.others);

            if (!root.benefits.mortgageprotection)
            {
                summary.totalliabilities += GetValue(root.liabilities.homemortgage);
            }

            summary.totaltaxes = GetValue(root.tax.anticipatedtaxes);

            summary.networth = summary.totalbenefits - summary.totalliabilities - summary.totaltaxes;

            summary.totalexpenses = GetValue(root.expenses.housing) +
                                    GetValue(root.expenses.transportation) +
                                    GetValue(root.expenses.utilities) +
                                    GetValue(root.expenses.survivorlifeinsurance) +
                                    GetValue(root.expenses.healthcare) +
                                    GetValue(root.expenses.recreation) +
                                    GetValue(root.expenses.others);

            summary.survivalYears = summary.networth / summary.totalexpenses;

            summary.securescore = summary.survivalYears*100/25;

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

            Summary result = CalculateAssessment(data);
            result.movers = AssessMovers(data, result);
            result.recommendations = AssessRecommendations(data, result);

            return new OkObjectResult(result);
        }


        private static Recommendation[] AssessRecommendations(Root data, Summary result)
        {
            List<Recommendation> recommendations = new List<Recommendation>();

            if (!data.benefits.mortgageprotection && GetValue(data.liabilities.homemortgage) > 0)
            {
                recommendations.Add(new Recommendation() { index = 1, item = "Consider adding a mortgage insurance to cover the mortgage liability." });
            }

            if ((GetValue(data.benefits.retirement401k) + GetValue(data.benefits.ira)) < (result.totalbenefits * 0.5))
            {
                recommendations.Add(new Recommendation() { index = 2, item = "While insurance helps protect your family, balance with portfolio which helps with retirement." });
            }

            if (data.expenses.education && !data.benefits.educationplans)
            {
                recommendations.Add(new Recommendation() { index = 3, item = "Consider planning for college education for your children." });
                recommendations.Add(new Recommendation() { index = 4, item = "While college savings plan may not have been funded fully, consider other options to cover it as a contingency." });
            }

            recommendations.Add(new Recommendation() { index = 5, item = "Setup beneficiary for all your accounts." });
            recommendations.Add(new Recommendation() { index = 6, item = "Get a will done and keep it updated." });
            recommendations.Add(new Recommendation() { index = 7, item = "Create a living trust to avoid probate court and associated legal fees." });
            recommendations.Add(new Recommendation() { index = 8, item = "Review Estate and inheritance tax laws and plan accordingly." });

            if (data.expenses.education & data.benefits.educationplans)
            {
                recommendations.Add(new Recommendation() { index = 9, item = "College savings plans may not have been funded fully, consider other options to cover it as a contingency." });
            }

            if (!data.expenses.education)
            {
                recommendations.Add(new Recommendation() { index = 10, item = "Social security benefits may not start until 67 years of age. Consider other options to cover the gap." });
            }
            else
            {
                recommendations.Add(new Recommendation() { index = 11, item = "Social security benefits may start early if caring for a child less than 16 years of age." });
            }

            return recommendations.ToArray();
        }

        private static Recommendation[] AssessMovers(Root data, Summary result)
        {
            List<Recommendation> recommendations = new List<Recommendation>();

            if (!data.benefits.mortgageprotection && GetValue(data.liabilities.homemortgage) > 0)
            {
                recommendations.Add(new Recommendation() { index = 1, item = "Home mortgage is impacting the payout due to lack of mortgage insurance.", status = "red" });
            }
            else if (data.benefits.mortgageprotection && GetValue(data.liabilities.homemortgage) > 0)
            {
                recommendations.Add(new Recommendation() { index = 1, item = "Mortgage insurance is covering the mortgage liability.", status = "green" });
            }


            if ((GetValue(data.benefits.lifeinsurance) + GetValue(data.benefits.terminsurance)) > (result.totalbenefits * .5))
            {
                recommendations.Add(new Recommendation() { index = 2, item = "Death benefits from life insurance is high.", status = "red" });
            }
            else
            {
                recommendations.Add(new Recommendation() { index = 2, item = "Death benefits from life insurance is low.", status = "green" });
            }

            if (GetValue(data.benefits.accidentaldeathanddismemberment) > result.totalbenefits * .25)
            {
                recommendations.Add(new Recommendation() { index = 3, item = "Accidental death and dismemberment is applicable only in certain cases. It makes more than 25% of your net worth.", status = "red" });
            }
            else if (GetValue(data.benefits.accidentaldeathanddismemberment) > result.totalbenefits * .1)
            {
                recommendations.Add(new Recommendation() { index = 3, item = "Accidental death and dismemberment is applicable only in certain cases. It is less than 25% of your net worth.", status = "green" });
            }

            if (data.expenses.education && !data.benefits.educationplans)
            {
                recommendations.Add(new Recommendation() { index = 4, item = "College education is not covered.", status = "red" });
            }
            else if (data.expenses.education && data.benefits.educationplans)
            {
                recommendations.Add(new Recommendation() { index = 4, item = "College education is covered.", status = "green" });
            }

            return recommendations.ToArray();

            //Annuities could be taxed
            //Mortgage insurance is covering the mortgage liability
            //Death benefits from life insurance is high / low

            //--Consider adding a mortgage insurance to cover the mortgage liability.
            //While insurance helps protect your family, balance with portfolio which helps with retirement.
            //--Consider planning for college education for your children.
            //--While college savings plan may not have been funded fully, consider other options to cover it as a contingency.
            //--Setup beneficiary for all your accounts.
            //--Get a will done and keep it updated.
            //--Create a living trust to avoid probate court and associated legal fees.

            //--College savings plans may not have been funded fully, consider other options to cover it as a contingency.
            //Review Estate and inheritance tax laws and plan accordingly.

            //Social security benefits may not start until 67 years of age. Consider other options to cover the gap.
            //Social security benefits may start early if caring for a child less than 16 years of age or a disabled child.
        }
    }
}
