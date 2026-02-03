export function validate(data: Record<string, string>) {
  if (!data.name || !data.description || !data.url) {
    return false;
  }
  return true;
}
