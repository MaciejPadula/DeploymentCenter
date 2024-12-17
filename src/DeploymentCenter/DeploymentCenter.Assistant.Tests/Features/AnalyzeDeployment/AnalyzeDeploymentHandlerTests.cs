using DeploymentCenter.AIChat.Features.CompleteChat.Contract;
using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.AnalyzeDeployment;
using DeploymentCenter.Deployments.Features.AnalyzeDeployment.Contract;
using DeploymentCenter.Deployments.Features.GetDeploymentContainers.Contract;
using DeploymentCenter.Deployments.Features.GetDeploymentDetails.Contract;
using DeploymentCenter.Deployments.Features.GetDeploymentPods.Contract;
using DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;
using DeploymentCenter.SharedKernel;
using FluentAssertions;
using MediatR;
using NSubstitute;

namespace DeploymentCenter.Assistant.Tests.Features.AnalyzeDeployment;

internal class AnalyzeDeploymentHandlerTests
{
    private AnalyzeDeploymentHandler _sut;
    private IMediator _mediator;

    [SetUp]
    public void Setup()
    {
        _mediator = Substitute.For<IMediator>();
        _sut = new AnalyzeDeploymentHandler(_mediator);
    }

    [Test]
    public async Task Handle_WhenAnalyzeDeploymentQueryIsSent_ReturnsChatHistory()
    {
        // Arrange
        var ct = CancellationToken.None;
        var analyzeDeploymentQuery = new AnalyzeDeploymentQuery("testNamespace", "testDeploymentName", "testUserQuestion");
        var deploymentDetails = new DeploymentDetails();
        var containers = new List<Container>();
        var deploymentPods = new List<Pod>();
        var deploymentVolumes = new List<DeploymentVolume>();
        var chatHistory = "testChatHistory";
        _mediator.Send(Arg.Any<GetDeploymentDetailsQuery>(), ct).Returns(deploymentDetails);
        _mediator.Send(Arg.Any<GetDeploymentContainersQuery>(), ct).Returns(containers);
        _mediator.Send(Arg.Any<GetDeploymentPodsQuery>(), ct).Returns(deploymentPods);
        _mediator.Send(Arg.Any<GetDeploymentVolumesQuery>(), ct).Returns(deploymentVolumes);
        _mediator.Send(Arg.Any<CompleteChatQuery>(), ct).Returns(Result<string>.OnSuccess(chatHistory));

        // Act
        var result = await _sut.Handle(analyzeDeploymentQuery, ct);

        // Assert
        Received.InOrder(() =>
        {
            _mediator.Send(Arg.Any<GetDeploymentDetailsQuery>(), ct);
            _mediator.Send(Arg.Any<GetDeploymentContainersQuery>(), ct);
            _mediator.Send(Arg.Any<GetDeploymentPodsQuery>(), ct);
            _mediator.Send(Arg.Any<GetDeploymentVolumesQuery>(), ct);
            _mediator.Send(Arg.Any<CompleteChatQuery>(), ct);
        });
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(chatHistory);
    }

    [Test]
    public async Task Handle_WhenChatIsNotInitialized_ReturnsFailure()
    {
        // Arrange
        var ct = CancellationToken.None;
        var analyzeDeploymentQuery = new AnalyzeDeploymentQuery("testNamespace", "testDeploymentName", "testUserQuestion");
        _mediator.Send(Arg.Any<CompleteChatQuery>(), ct).Returns(Result<string>.OnError(new Exception()));

        // Act
        var result = await _sut.Handle(analyzeDeploymentQuery, ct);

        // Assert
        result.IsSuccess.Should().BeFalse();
    }
}
