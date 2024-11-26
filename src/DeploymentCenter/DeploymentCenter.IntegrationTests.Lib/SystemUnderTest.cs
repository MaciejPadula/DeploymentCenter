using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Testcontainers.K3s;

namespace DeploymentCenter.IntegrationTests.Lib;

public class SystemUnderTestFactory
{
    public static async Task<SystemUnderTest> CreateAsync()
    {
        var kubernetes = new K3sBuilder()
          .WithImage("rancher/k3s:v1.26.2-k3s1")
          .Build();
        await kubernetes.StartAsync();
        var kubeconfig = await kubernetes.GetKubeconfigAsync();
        var factory = new WebApplicationFactory<Program>();
        return new SystemUnderTest(kubernetes, factory, kubeconfig);
    }
}

public class SystemUnderTest(K3sContainer kubernetes, WebApplicationFactory<Program> factory, string kubeconfig)
{
    public string KubeConfig => kubeconfig;

    public async Task<T?> PostAsync<T>(string url, object content, bool isAuth = true)
    {
        var result = await PostAsync(url, content, isAuth);
        return await result.Content.ReadFromJsonAsync<T>();
    }

    public async Task<T?> GetAsync<T>(string url, bool isAuth = true)
    {
        var result = await GetAsync(url, isAuth);
        return await result.Content.ReadFromJsonAsync<T>();
    }

    public async Task<HttpResponseMessage> GetAsync(string url, bool isAuth = true)
    {
        return await GetAsync(url, isAuth ? GetHashedHeader() : null);
    }

    public async Task<HttpResponseMessage> GetAsync(string url, string? auth = null)
    {
        var client = factory.CreateClient();

        using var requestMessage = new HttpRequestMessage(HttpMethod.Get, url);

        if (!string.IsNullOrEmpty(auth))
        {
            requestMessage.Headers.Add("Auth", auth);
        }

        return await client.SendAsync(requestMessage);
    }

    public async Task<HttpResponseMessage> PostAsync(string url, object content, bool isAuth = true)
    {
        var client = factory.CreateClient();

        using var requestMessage = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(
                JsonSerializer.Serialize(content),
                Encoding.UTF8,
                "application/json")
        };

        if (isAuth)
        {
            requestMessage.Headers.Add("Auth", GetHashedHeader());
        }

        return await client.SendAsync(requestMessage);
    }

    private string GetHashedHeader()
    {
        var plainTextBytes = Encoding.UTF8.GetBytes(kubeconfig);
        return Convert.ToBase64String(plainTextBytes);
    }

    public async Task TearDown()
    {
        if (kubernetes is not null)
        {
            await kubernetes.StopAsync();
        }
    }
}
