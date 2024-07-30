export function sumArray<T>(arr: T[], mapper: (val: T) => number): number {
  return arr.map(mapper).reduce((acc, x) => acc + x, 0);
}

export function lastElements<T>(arr: T[], n: number): T[] {
  return arr.slice(-n);
}