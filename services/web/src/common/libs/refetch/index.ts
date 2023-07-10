export const refetch = <T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetch(input, init)
      .then(responseHandler)
      .then((response: Response) => response.json())
      .then((data: T) => resolve(data))
      .catch((error) => reject(error));
  });
};

const responseHandler = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};
