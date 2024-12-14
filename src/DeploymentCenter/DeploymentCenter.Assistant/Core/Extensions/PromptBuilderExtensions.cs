using DeploymentCenter.AIChat.Core.Helpers;

namespace DeploymentCenter.Assistant.Core.Extensions;

internal static class PromptBuilderExtensions
{
    public static PromptBuilder AsProfessionalDevopsEngineerYouAreSupposedTo(this PromptBuilder promptBuilder, string input)
    {
        return promptBuilder.WithBasePrompt(
            $"""
            You are professional DevOps Engineer and you are working on a deployment.
            Answer user question only if question is related to kubernetes cluster.
            If user asks any other question, provide the answer that you are not able to answer this question.
            As a professional DevOps Engineer, you are supposed to provide the answer to the user question.
            {input}
            """);
    }
}
