using DeploymentCenter.AIChat.Core.Helpers;
using DeploymentCenter.AIChat.Features.CompleteChat.Contract;
using DeploymentCenter.Assistant.Core.Extensions;
using DeploymentCenter.Assistant.Features.AnalyzeDeployment.Contract;
using DeploymentCenter.Deployments.Features.GetDeploymentContainers.Contract;
using DeploymentCenter.Deployments.Features.GetDeploymentDetails.Contract;
using DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;
using DeploymentCenter.Pods.Features.GetPods.Contract;
using DeploymentCenter.SharedKernel;
using MediatR;
using System.Text.Json;

namespace DeploymentCenter.Assistant.Features.AnalyzeDeployment;

internal class AnalyzeDeploymentHandler(IMediator mediator) : IRequestHandler<AnalyzeDeploymentQuery, Result<string>>
{
    private static JsonSerializerOptions SerializerOptions => JsonSerializerOptionsExtensions.JsonSerializerOptions;

    public async Task<Result<string>> Handle(AnalyzeDeploymentQuery request, CancellationToken cancellationToken)
    {
        var deploymentDetails = mediator.Send(new GetDeploymentDetailsQuery(request.Namespace, request.DeploymentName), cancellationToken);
        var containers = mediator.Send(new GetDeploymentContainersQuery(request.Namespace, request.DeploymentName), cancellationToken);
        var deploymentPods = mediator.Send(new GetPodsQuery(request.Namespace, request.DeploymentName), cancellationToken);
        var deploymentVolumes = mediator.Send(new GetDeploymentVolumesQuery(request.Namespace, request.DeploymentName), cancellationToken);

        var deploymentJson = JsonSerializer.Serialize(await deploymentDetails, SerializerOptions);
        var podsJson = JsonSerializer.Serialize(await deploymentPods, SerializerOptions);
        var containersJson = JsonSerializer.Serialize(await containers, SerializerOptions);
        var volumesJson = JsonSerializer.Serialize(await deploymentVolumes, SerializerOptions);

        var chatHistory = new PromptBuilder()
            .WithResultFormat("MARKDOWN")
            .WithUserLanguage("provided from user")
            .AsProfessionalDevopsEngineerYouAreSupposedTo(
                """
                Answer user question about deployment provided in system data.
                """)
            .WithParameter("Deployment Details", deploymentJson)
            .WithParameter("Pods Details", podsJson)
            .WithParameter("Containers Details", containersJson)
            .WithParameter("Volumes Details", volumesJson)
            .Build(request.UserQuestion);

        var queryKey = $"{nameof(AnalyzeDeploymentHandler)}_{request.Namespace}_{request.DeploymentName}_{request.UserQuestion}";

        return await mediator.Send(new CompleteChatQuery(queryKey, chatHistory), cancellationToken);
    }
}
