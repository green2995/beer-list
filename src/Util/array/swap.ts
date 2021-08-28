export function swap<T extends any[]>(arr: T, src: number, dest: number) {
  const tempSrc = arr[src];
  const tempDest = arr[dest];
  const copy = [...arr];
  copy[dest] = tempSrc;
  copy[src] = tempDest;
  return copy;
}