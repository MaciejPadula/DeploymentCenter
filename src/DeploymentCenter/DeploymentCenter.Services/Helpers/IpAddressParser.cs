using System.Net;

namespace DeploymentCenter.Services.Helpers;

internal interface IIpAddressParser
{
    IPAddress Parse(string ipAddress);
}

internal class IpAddressParser : IIpAddressParser
{
    private const char IpAddressSplitCharacter = '.';

    public IPAddress Parse(string ipAddress) =>
        new(ipAddress
            .Split(IpAddressSplitCharacter)
            .Select(byte.Parse)
            .ToArray());
}
