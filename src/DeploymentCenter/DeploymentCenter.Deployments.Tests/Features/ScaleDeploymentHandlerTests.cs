using DeploymentCenter.Deployments.Core.Exceptions;
using DeploymentCenter.Deployments.Core.Helpers;
using DeploymentCenter.Deployments.Features;
using DeploymentCenter.Deployments.Features.ScaleDeployment;
using DeploymentCenter.Deployments.Features.ScaleDeployment.Contract;
using FluentAssertions;
using NSubstitute;

namespace DeploymentCenter.Deployments.Tests.Features;

public class ScaleDeploymentHandlerTests
{
    private ScaleDeploymentHandler _sut;
    private IDeploymentClient _deploymentClient;
    private IReplicasCountValidator _replicasCountValidator;

    [SetUp]
    public void Setup()
    {
        _deploymentClient = Substitute.For<IDeploymentClient>();
        _replicasCountValidator = Substitute.For<IReplicasCountValidator>();
        _sut = new ScaleDeploymentHandler(_deploymentClient, _replicasCountValidator);
    }

    [Test]
    public async Task Handle_WhenReplicasCountIsInvalid_ThrowsReplicasInvalidException()
    {
        // Arrange
        var command = new ScaleDeploymentCommand("namespace", "deploymentName", -1);

        _replicasCountValidator.Validate(command.ReplicasCount).Returns(false);

        // Act
        Func<Task> act = async () => await _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ReplicasInvalidException>();
    }

    [Test]
    public async Task Handle_WhenReplicasCountIsValid_CallsScaleDeployment()
    {
        // Arrange
        var command = new ScaleDeploymentCommand("namespace", "deploymentName", 2);

        _replicasCountValidator.Validate(command.ReplicasCount).Returns(true);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        await _deploymentClient.Received(1).ScaleDeployment(command.Namespace, command.DeploymentName, command.ReplicasCount);
    }
}
