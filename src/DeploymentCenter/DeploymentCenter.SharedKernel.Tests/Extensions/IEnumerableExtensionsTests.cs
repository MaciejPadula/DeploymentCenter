using DeploymentCenter.SharedKernel.Extensions;
using FluentAssertions;

namespace DeploymentCenter.SharedKernel.Tests.Extensions;

public class IEnumerableExtensionsTests
{
    [Test]
    [TestCase(0)]
    [TestCase(10)]
    public void SumOrDefault_WhenCollectionIsEmpty_ShouldReturnDefaultValue(int defaultValue)
    {
        // Arrange
        var collection = Enumerable.Empty<int>();

        // Act
        var result = collection.SumOrDefault(x => x, defaultValue);

        // Assert
        result.Should().Be(defaultValue);
    }

    [Test]
    [TestCase(0, 0, 0, 0)]
    [TestCase(0, 10, 10, 20)]
    [TestCase(10, 0, 10, 10)]
    [TestCase(10, 10, 20, 30)]
    public void SumOrDefault_WhenCollectionIsNotEmpty_ShouldReturnSum(int defaultValue, int summand1, int summand2, int expectedResult)
    {
        // Arrange
        var collection = new[] { summand1, summand2 };

        // Act
        var result = collection.SumOrDefault(x => x, defaultValue);

        // Assert
        result.Should().Be(expectedResult);
    }

    [Test]
    [TestCase(0)]
    [TestCase(10)]
    public void MaxOrDefault_WhenCollectionIsEmpty_ShouldReturnDefaultValue(int defaultValue)
    {
        // Arrange
        var collection = Enumerable.Empty<int>();

        // Act
        var result = collection.MaxOrDefault(x => x, defaultValue);

        // Assert
        result.Should().Be(defaultValue);
    }

    [Test]
    [TestCase(0, 0, 0, 0)]
    [TestCase(0, 10, 10, 10)]
    [TestCase(10, 0, 10, 10)]
    [TestCase(10, 10, 20, 20)]
    public void MaxOrDefault_WhenCollectionIsNotEmpty_ShouldReturnMax(int defaultValue, int value1, int value2, int expectedResult)
    {
        // Arrange
        var collection = new[] { value1, value2 };

        // Act
        var result = collection.MaxOrDefault(x => x, defaultValue);

        // Assert
        result.Should().Be(expectedResult);
    }
}