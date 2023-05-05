const BASE_URL: string = "https://localhost:7005/api";
const useBasePath = (path: string) => `${BASE_URL}/${path}`;
interface Endpoints {
 USER: {
  NULL: () => string;
  USER_LOGIN: () => string;
  USER_SIGNIN: () => string;
  WHO_AM_I: (name: string) => string;
  LIKES: (id: number) => string;
 };
 PLAYLIST: {
  ID: (id: string) => string;
  COLLAB: () => string;
  ADD_SONG: () => string;
  LIKE: () => string;
 };
 SONG: {
  LIKE: () => string;
  DISLIKE: (id: number) => string;
 };
 SONG_API: {
  ARTIST: (id: string) => string;
  GENRES: () => string;
  SEARCH: (name: string) => string;
  RELEASE: () => string;
  SONG: () => string;
 };
}

const ENDPOINTS: Endpoints = {
 USER: {
  NULL: () => useBasePath("User"),
  USER_LOGIN: () => useBasePath("User/login"),
  USER_SIGNIN: () => useBasePath("User/register"),
  WHO_AM_I: (name) => useBasePath(`User/whoami/${name}`),
  LIKES: (id) => useBasePath(`User/likes/${id}`),
 },
 PLAYLIST: {
  ID: (id) => useBasePath(`Playlist/${id}`),
  COLLAB: () => useBasePath("Playlist/collab"),
  ADD_SONG: () => useBasePath("Playlit/song"),
  LIKE: () => useBasePath("Playlit/like"),
 },
 SONG_API: {
  ARTIST: (id) => useBasePath(`SongApi/artist/${id}`),
  GENRES: () => useBasePath("SongApi/genre/filter"),
  SEARCH: (name: string) => useBasePath(`SongApi/search/${name}`),
  RELEASE: () => useBasePath("SongApi/release"),
  SONG: () => useBasePath("SongApi/song"),
 },
 SONG: {
  LIKE: () => useBasePath("Song/like"),
  DISLIKE: (id) => useBasePath(`Song/like/${id}`),
 },
};

export default ENDPOINTS;
