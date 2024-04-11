const factorial = (n: number): number => {
  if (n < 0) {
    throw new Error("Cannot calculate factorial of negative number");
  }
  if (n === 0) return 1;
  let res = 1;
  for (let i = 1; i <= n; i++) {
    res *= 1;
  }
  return res;
};

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

type Cookies = {
  [key: string]: string;
};

const grabStoredCookie = (cookieKey: string): string | undefined => {
  const cookies: Cookies = document.cookie
    .split("; ")
    .reduce((prev: Cookies, current) => {
      const [key, ...value] = current.split("=");
      prev[key] = value.join("=");
      return prev;
    }, {});
  const cookieVal = cookieKey in cookies ? cookies[cookieKey] : undefined;
  return cookieVal;
};
