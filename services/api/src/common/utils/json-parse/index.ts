export const jsonParse = <T>(jsonString: string | null): T | null => {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return {} as T;
  }
};
