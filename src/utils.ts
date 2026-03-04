export const getRandomInteger = (min: number, max: number) => {
  const left = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const right = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const random = Math.random() * (right - left + 1) + left;
  return Math.floor(random);
};

export const getRandomFactor = () => Math.random() - 0.5 > 0 ? 1 : -1;

export const getRange = (coord: number, length: number) => getRandomFactor() > 0 ? [0, coord] : [coord, length];

export const buildReverseLookup = <T extends string | number>(obj: Record<string, T>): { [key: string]: string } => {
  const reverseLookup: { [key: string]: string } = {};
  Object.entries(obj).forEach(([key, value]) => {
    reverseLookup[String(value)] = key;
  });
  return reverseLookup;
}