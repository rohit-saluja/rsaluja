/**
 * Tiny className combiner — joins truthy class strings with a space.
 * Keeps the project dependency-free for the small amount of conditional
 * styling we need.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
