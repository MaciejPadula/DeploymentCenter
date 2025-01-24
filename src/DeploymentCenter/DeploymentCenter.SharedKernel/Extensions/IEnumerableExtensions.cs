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

    public static double Median(this IEnumerable<int> source)
    {
        var orderedArray = source.OrderBy(x => x).ToArray();
        var count = orderedArray.Length;

        if (count == 0)
        {
            throw new InvalidOperationException("Sequence contains no elements");
        }

        if (count % 2 == 0)
        {
            var x = (orderedArray[count / 2 - 1] + orderedArray[count / 2]);
            return x / 2.0;
        }

        return orderedArray[count / 2];
    }
}
