export function assertDefined<T>(value: T | undefined, instruction: string, field: string): T {
  if (value === undefined) {
    throw new Error(`${instruction}: ${field} is undefined`);
  }
  return value;
}