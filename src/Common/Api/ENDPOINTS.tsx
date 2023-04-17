const BASE_URL: string = "https://localhost:7203/api";
const useBasePath = (path: string) => `${BASE_URL}/${path}`;
interface Endpoints {
  USER: {
    NULL: () => string;
    USER_LOGIN: () => string;
    USER_SIGNIN: () => string;
  };
}

const ENDPOINTS: Endpoints = {
  USER: {
    NULL: () => useBasePath("User"),
    USER_LOGIN: () => useBasePath("User/login"),
    USER_SIGNIN: () => useBasePath("User/register"),
  },
};

export default ENDPOINTS;