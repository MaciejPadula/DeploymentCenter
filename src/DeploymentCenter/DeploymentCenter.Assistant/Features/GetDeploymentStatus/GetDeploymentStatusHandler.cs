using DeploymentCenter.AIChat.Core.Helpers;
using DeploymentCenter.AIChat.Features.CompleteChat.Contract;
using DeploymentCenter.Assistant.Core.Extensions;
using DeploymentCenter.Assistant.Features.GetDeploymentStatus.Contract;
using DeploymentCenter.Deployments.Features.GetDeploymentDetails.Contract;
using DeploymentCenter.Pods.Features.GetPods.Contract;
using DeploymentCenter.SharedKernel;
using MediatR;
using System.Text.Json;

namespace DeploymentCenter.Assistant.Features.GetDeploymentStatus;

internal class GetDeploymentStatusHandler(IMediator mediator) : IRequestHandler<GetDeploymentStatusQuery, Result<string>>
{
    private static JsonSerializerOptions SerializerOptions => JsonSerializerOptionsExtensions.JsonSerializerOptions;

    public async Task<Result<string>> Handle(GetDeploymentStatusQuery request, CancellationToken cancellationToken)
    {
        var deploymentDetailsTask = mediator.Send(new GetDeploymentDetailsQuery(request.Namespace, request.DeploymentName));
        var deploymentPodsTask = mediator.Send(new GetPodsQuery(request.Namespace, request.DeploymentName));

        var deploymentJson = JsonSerializer.Serialize(await deploymentDetailsTask, SerializerOptions);
        var podsJson = JsonSerializer.Serialize(await deploymentPodsTask, SerializerOptions);

        var chatHistory = new PromptBuilder()
            .WithResultFormat("MARKDOWN")
            .WithUserLanguage("provided from user")
            .WithBasePrompt(
                """
                You are provided with data about kubernetes deployment of some application.
                You will receive basic informations and pods with statuses.
                Try to determine if everything is allright with this deployment and if something is not right notify user about it.
                """)
            .WithParameter("Deployment Details", deploymentJson)
            .WithParameter("Pods Details", podsJson)
            .Build();

        var queryKey = $"{nameof(GetDeploymentStatusHandler)}_{request.Namespace}_{request.DeploymentName}";

        return await mediator.Send(new CompleteChatQuery(queryKey, chatHistory), cancellationToken);
    }
}
