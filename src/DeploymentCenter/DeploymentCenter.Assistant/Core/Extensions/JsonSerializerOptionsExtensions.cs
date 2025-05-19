using System.Text.Json;
using System.Text.Json.Serialization;

namespace DeploymentCenter.Assistant.Core.Extensions;

internal static class JsonSerializerOptionsExtensions
{
    private static JsonSerializerOptions? _options;

    public static JsonSerializerOptions JsonSerializerOptions
    {
        get
        {
            if (_options is null)
            {
                _options = new JsonSerializerOptions();
                _options.Converters.Add(new JsonStringEnumConverter());
            }

            return _options;
        }
    }
}
