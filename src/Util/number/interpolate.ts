export function interpolate(value: number, min: number, max: number, from: number, to: number) {
  if (value <= min) return from;
  if (value >= max) return to;
  const progress = (value - min) / (max - min);
  return from + progress * (to - from);
}

export function clamp(value: number, min: number, max: number) {
  return interpolate(value, min, max, min, max);
}