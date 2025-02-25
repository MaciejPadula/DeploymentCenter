export function sumArray<T>(arr: T[], mapper: (val: T) => number): number {
  return arr.map(mapper).reduce((acc, x) => acc + x, 0);
}

export function lastElements<T>(arr: T[], n: number): T[] {
  return arr.slice(-n);
}

export function groupBy<K, T>(list: T[], keyGetter: (input: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const existingArray = map.get(key) || [];
    map.set(key, [...existingArray, item]);
  });
  return map;
}