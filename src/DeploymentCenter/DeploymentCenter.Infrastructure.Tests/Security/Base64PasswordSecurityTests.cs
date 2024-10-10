using DeploymentCenter.Infrastructure.Security;
using FluentAssertions;

namespace DeploymentCenter.Infrastructure.Tests.Security;

internal class Base64PasswordSecurityTests
{
    private Base64PasswordSecurity _sut;

    [SetUp]
    public void Setup()
    {
        _sut = new Base64PasswordSecurity();
    }

    [Test]
    [TestCase("password", "cGFzc3dvcmQ=")]
    [TestCase("password123", "cGFzc3dvcmQxMjM=")]
    [TestCase("password@123", "cGFzc3dvcmRAMTIz")]
    [TestCase("password@123!@#", "cGFzc3dvcmRAMTIzIUAj")]
    [TestCase("some_text_in_base64", "c29tZV90ZXh0X2luX2Jhc2U2NA==")]
    [TestCase("", "")]
    public void SecurePassword_WhenCalled_ReturnsString(string plainText, string expectedBase64)
    {
        // Arrange
        // Act
        var result = _sut.SecurePassword(plainText);

        // Assert
        result.Should().Be(expectedBase64);
    }

    [Test]
    [TestCase("cGFzc3dvcmQ=", "password")]
    [TestCase("cGFzc3dvcmQxMjM=", "password123")]
    [TestCase("cGFzc3dvcmRAMTIz", "password@123")]
    [TestCase("cGFzc3dvcmRAMTIzIUAj", "password@123!@#")]
    [TestCase("c29tZV90ZXh0X2luX2Jhc2U2NA==", "some_text_in_base64")]
    [TestCase("", "")]
    public void DecodeKubeConfig_WhenCalled_ReturnsString(string base64, string expectedPlainText)
    {
        // Arrange
        // Act
        var result = _sut.DecodeKubeConfig(base64);

        // Assert
        result.Should().Be(expectedPlainText);
    }

    [Test]
    [TestCase("password")]
    [TestCase("password123")]
    [TestCase("password@123")]
    [TestCase("password@123!@#")]
    [TestCase("some_text_in_base64")]
    [TestCase("")]
    public void WhenEncodedAndDecoded_ShouldReturnOriginalString(string plainText)
    {
        // Arrange
        // Act
        var encoded = _sut.SecurePassword(plainText);
        var decoded = _sut.DecodeKubeConfig(encoded);

        // Assert
        decoded.Should().Be(plainText);
    }
}
