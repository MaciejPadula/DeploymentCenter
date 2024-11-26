using DeploymentCenter.Infrastructure.Http;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using NSubstitute;

namespace DeploymentCenter.Infrastructure.Tests.Http;

internal class HttpContextKubeConfigProviderTests
{
    private IHttpContextAccessor _httpContextAccessor;
    private IKubeConfigDecoder _kubeConfigDecoder;
    private HttpContextKubeConfigProvider _sut;

    [SetUp]
    public void Setup()
    {
        _httpContextAccessor = Substitute.For<IHttpContextAccessor>();
        _kubeConfigDecoder = Substitute.For<IKubeConfigDecoder>();
        _sut = new HttpContextKubeConfigProvider(_httpContextAccessor, _kubeConfigDecoder);
    }

    [Test]
    public void GetKubeConfig_WhenCalled_ReturnsDecodedKubeConfig()
    {
        // Arrange
        var kubeConfig = "kubeConfig";
        var encodedKubeConfig = "encodedKubeConfig";
        _httpContextAccessor.HttpContext?.Request.Headers["Auth"].Returns(new StringValues(encodedKubeConfig));
        _kubeConfigDecoder.DecodeKubeConfig(encodedKubeConfig).Returns(kubeConfig);

        // Act
        var result = _sut.GetKubeConfig();

        // Assert
        result.Should().Be(kubeConfig);
    }

    [Test]
    public void GetKubeConfig_WhenCalledWithNullHeader_ReturnsEmptyString()
    {
        // Arrange
        _httpContextAccessor.HttpContext?.Request.Headers["Auth"].Returns(StringValues.Empty);

        // Act
        var result = _sut.GetKubeConfig();

        // Assert
        result.Should().BeEmpty();
    }
}
