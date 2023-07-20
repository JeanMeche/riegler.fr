export const isEmpty = <T extends object>(test: T | Record<string, never>): test is Record<string, never> => {
  return Object.keys(test).length === 0;
}
