const factorial = (n) => {
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

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const grabStoredCookie = (cookieKey) => {
  const cookies = document.cookie.split("; ").reduce((prev, current) => {
    const [key, ...value] = current.split("=");
    prev[key] = value.join("=");
    return prev;
  }, {});
  const cookieVal = cookieKey in cookies ? cookies[cookieKey] : undefined;
  return cookieVal;
};
