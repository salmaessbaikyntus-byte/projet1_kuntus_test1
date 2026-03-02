export function cn(...inputs: (string | boolean | undefined)[]): string {
  return inputs.filter(Boolean).join(' ').trim();
}
