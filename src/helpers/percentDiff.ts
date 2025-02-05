export const percentDiff = (start: number, end: number): number => {
  return 100 * Math.abs((start - end) / ((start + end) / 2));
};
