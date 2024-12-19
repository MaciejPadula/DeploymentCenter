using DeploymentCenter.Templates.Core.Exceptions;
using DeploymentCenter.Templates.Core.Models;
using DeploymentCenter.Templates.Core.Repositories;
using DeploymentCenter.Templates.Features.ApplyTemplate;
using DeploymentCenter.Templates.Features.ApplyTemplate.Contract;
using DeploymentCenter.Templates.Features.ApplyTemplate.ResourceFactory;
using FluentAssertions;
using MediatR;
using NSubstitute;

namespace DeploymentCenter.Templates.Tests.Features.ApplyTemplate;

internal class ApplyTemplateHandlerTests
{
    private ApplyTemplateHandler _sut;
    private IMediator _mediator;
    private IResourceFactory _deploymentFactory;
    private IResourceFactory _volumeFactory;
    private IResourceFactory _loadBalancerFactory;
    private IVariableReplacer _variableReplacer;
    private ITemplateRepository _templateRepository;

    [SetUp]
    public void Setup()
    {
        _mediator = Substitute.For<IMediator>();
        _deploymentFactory = Substitute.For<IResourceFactory>();
        _volumeFactory = Substitute.For<IResourceFactory>();
        _loadBalancerFactory = Substitute.For<IResourceFactory>();
        _variableReplacer = new VariableReplacer();
        _templateRepository = Substitute.For<ITemplateRepository>();

        _sut = new ApplyTemplateHandler(
            _mediator,
            _variableReplacer,
            [
                _deploymentFactory,
                _volumeFactory,
                _loadBalancerFactory
            ],
            _templateRepository);
    }

    [Test]
    public async Task Handle_WhenTemplateDoesNotExist_ShouldReturnError()
    {
        // Arrange
        var request = new ApplyTemplateCommand("non-existing-template", []);
        _templateRepository.GetTemplate(request.TemplateName).Returns((ResourceTemplate?)null);
        var expectedException = new TemplateNotFoundException(request.TemplateName);

        // Act
        var result = await _sut.Handle(request, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error?.Exception.Should().BeEquivalentTo(expectedException);
    }

    [Test]
    public async Task Handle_WhenTemplateExists_ShouldCreateResources()
    {
        // Arrange
        var guid = Guid.Parse("00000000-0000-0000-0000-000000000000");
        var request = new ApplyTemplateCommand("existing-template", new Dictionary<string, string>
        {
            { "namespace", "default" },
            { "appName", "test-app" }
        });
        var template = new ResourceTemplate(
            guid,
            "existing-template",
            [
                new("namespace", "Namespace", string.Empty),
                new("appName", "ApplicationName", string.Empty)
            ],
            [
                new("BasicDeploy", ResourceType.Deployment, [new("Namespace", "{namespace}"), new("Name", "{appName}-deploy")]),
                new("BasicVolume", ResourceType.Volume, [new("Name", "{appName}-vol")]),
                new("BasicLB", ResourceType.LoadBalancer, [new("Namespace", "{namespace}"), new("Name", "{appName}-lb")])
            ]);

        _templateRepository.GetTemplate(request.TemplateName).Returns(template);
        var expectedDeployCall = new Dictionary<string, string>
        {
            { "Namespace", "default" },
            { "Name", "test-app-deploy" }
        };
        var expectedLbCall = new Dictionary<string, string>
        {
            { "Namespace", "default" },
            { "Name", "test-app-lb" }
        };
        var expectedVolumeCall = new Dictionary<string, string>
        {
            { "Name", "test-app-vol" }
        };
        _deploymentFactory.CanCreate(Arg.Is(ResourceType.Deployment)).Returns(true);
        _volumeFactory.CanCreate(Arg.Is(ResourceType.Volume)).Returns(true);
        _loadBalancerFactory.CanCreate(Arg.Is(ResourceType.LoadBalancer)).Returns(true);

        // Act
        var result = await _sut.Handle(request, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        _loadBalancerFactory.Received(1).Create(
            Arg.Is<Dictionary<string, string>>(x => x.SequenceEqual(expectedLbCall)));
        _deploymentFactory.Received(1).Create(
            Arg.Is<Dictionary<string, string>>(x => x.SequenceEqual(expectedDeployCall)));
        _volumeFactory.Received(1).Create(
            Arg.Is<Dictionary<string, string>>(x => x.SequenceEqual(expectedVolumeCall)));

    }
}
