using DeploymentCenter.Templates.Core.Models;
using System.Text.RegularExpressions;

namespace DeploymentCenter.Templates.Features.ApplyTemplate;

internal interface IVariableReplacer
{
    Dictionary<string, string> Replace(List<Variable> variableMap, Dictionary<string, string> variables);
}

internal class VariableReplacer : IVariableReplacer
{
    public Dictionary<string, string> Replace(List<Variable> variableMap, Dictionary<string, string> variables)
    {
        var result = new Dictionary<string, string>();
        foreach (var variable in variableMap)
        {
            var varTemp = variable.ValueTemplate;

            string pattern = @"\{(.*?)\}";

            var r = Regex.Replace(varTemp, pattern, match =>
            {
                string key = match.Groups[1].Value;
                return variables.TryGetValue(key, out var value) ? value : $"{{{key}}}";
            });

            result.Add(variable.Name, r);
        }

        return result;
    }
}
