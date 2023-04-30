const BASE_URL: string = "https://localhost:7277/api";
const useBasePath = (path: string) => `${BASE_URL}/${path}`;
interface Endpoints {
 USER: {
  NULL: () => string;
  USER_LOGIN: () => string;
  USER_SIGNIN: () => string;
  WHO_AM_I: (name: string) => string;
 };
 PLAYLIST: {
  ID: (id: string) => string;
 };
}

const ENDPOINTS: Endpoints = {
 USER: {
  NULL: () => useBasePath("User"),
  USER_LOGIN: () => useBasePath("User/login"),
  USER_SIGNIN: () => useBasePath("User/register"),
  WHO_AM_I: (name) => useBasePath(`User/whoami/${name}`),
 },
 PLAYLIST: {
  ID: (id) => useBasePath(`Playlist/${id}`),
 },
};

export default ENDPOINTS;
