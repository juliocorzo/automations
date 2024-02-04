export function slugify(str: string): string {
  return str.trim()
    .replace(/ +/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '');
}

export function removeRepeatedChar(str: string, char: string): string {
  return str.replace(new RegExp(`${char}+`, 'g'), char);
}
