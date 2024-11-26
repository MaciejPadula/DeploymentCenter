using System.Numerics;

namespace DeploymentCenter.SharedKernel.Extensions;

public static class IEnumerableExtensions
{
    public static TOutType SumOrDefault<TSource, TOutType>(this IEnumerable<TSource> source, Func<TSource, TOutType> selector, TOutType defaultValue)
        where TOutType : INumber<TOutType>
    {
        if (!source.Any())
        {
            return defaultValue;
        }

        TOutType result = default(TOutType) ?? defaultValue;

        foreach (var sourceItem in source)
        {
            result += selector(sourceItem);
        }

        return result;

    }

    public static TOutType MaxOrDefault<TSource, TOutType>(this IEnumerable<TSource> source, Func<TSource, TOutType> selector, TOutType defaultValue)
    {
        if (!source.Any())
        {
            return defaultValue;
        }

        return source.Max(selector)!;
    }
}
