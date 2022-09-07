export function getKeys(object: object): string[] {
  const list: Array<string> = [];
  Object.keys(object).forEach((key) => list.push(key));
  return list;
}
