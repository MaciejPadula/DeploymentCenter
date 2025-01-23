export function copyObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function groupObjects<TKey extends string | number | symbol, TObject>(
  objects: TObject[],
  keySelector: (obj: TObject) => TKey
): Record<TKey, TObject[]> {
  return objects.reduce<Record<TKey, TObject[]>>((acc, resource) => {
    const key = keySelector(resource);
    (acc[key] = acc[key] || []).push(resource);
    return acc;
  }, {} as Record<TKey, TObject[]>);
}
