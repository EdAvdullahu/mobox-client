const BASE_LYRICS_API: string = "https://localhost:7204/api";
const BASE_API: string = "https://localhost:7777/api";
const useApi = (path: string) => `${BASE_API}/${path}`;
const useLyicsPath = (path: string) => `${BASE_LYRICS_API}/${path}`;
interface Endpoints {
 USER: {
  NULL: () => string;
  LOGIN: () => string;
  SIGNIN: () => string;
  REFRESH_TOKEN: () => string;
  RESET_PASSWORD: () => string;
  FORGOT_PASSWORD: () => string;
  VERIFY_EMAIL: (token: string) => string;
  WHO_AM_I: (name: string) => string;
  LIKES: (id: number) => string;
  SONGS: {
   PLAYLISTS: {
    GET: (id: string) => string;
    COLLAB: () => string;
    ADD_SONG: () => string;
    LIKE: () => string;
    NEW: () => string;
    USER: (id: number | string) => string;
    GET_COLLABS: (id: string) => string;
   };
   LIKES: {
    LIKE: () => string;
    DISLIKE: (id: number) => string;
   };
  };
 };
 ARTIST: {
  GET: (id: string) => string;
  FEATURE: (name: string) => string;
 };
 FILTER: {
  GENRE: () => string;
  CUSTOM: (name: string) => string;
 };
 SONGS: {
  RELEASE: {
   NEW: () => string;
   GET: (id: number) => string;
  };
  SONG: {
   GET: () => string;
   NEW: () => string;
  };
  LYRICS: {
   GET: (id: string) => string;
  };
  GENRE: {
   GET: () => string;
  };
 };
}

const ENDPOINTS: Endpoints = {
 USER: {
  NULL: () => useApi("User/User"),
  LOGIN: () => useApi("User/User/login"),
  SIGNIN: () => useApi("User/User/register"),
  VERIFY_EMAIL: (token) => useApi(`User/User/verify-email/${token}`),
  FORGOT_PASSWORD: () => useApi(`User/User/forgot-password`),
  REFRESH_TOKEN: () => useApi(`User/User/refresh-token`),
  RESET_PASSWORD: () => useApi(`User/User/reset-password`),
  WHO_AM_I: (name) => useApi(`Songs/User/whoami/${name}`),
  LIKES: (id) => useApi(`Songs/User/likes/${id}`),
  SONGS: {
   PLAYLISTS: {
    GET: (id) => useApi(`Songs/Playlist/${id}`),
    COLLAB: () => useApi("Songs/Playlist/collab"),
    ADD_SONG: () => useApi("Songs/Playlist/song"),
    LIKE: () => useApi("Songs/Playlist/like"),
    NEW: () => useApi("Songs/Playlist/playlist"),
    USER: (id) => useApi(`Songs/Playlist/user/${id}`),
    GET_COLLABS: (id) => useApi(`Songs/Playlist/collab/${id}`),
   },
   LIKES: {
    LIKE: () => useApi("Songs/Song/like"),
    DISLIKE: (id) => useApi(`Songs/Song/like/${id}`),
   },
  },
 },
 ARTIST: {
  GET: (id) => useApi(`Songs/SongApi/artist/${id}`),
  FEATURE: (name) => useApi(`Songs/Artist/name/${name}`),
 },
 FILTER: {
  GENRE: () => useApi("Songs/SongApi/genre/filter"),
  CUSTOM: (name: string) => useApi(`Songs/SongApi/search/${name}`),
 },
 SONGS: {
  RELEASE: {
   NEW: () => useApi("Songs/SongApi/release"),
   GET: (id) => useApi(`Songs/SongApi/release/${id}`),
  },
  SONG: {
   GET: () => useApi("Songs/Song"),
   NEW: () => useApi(`Songs/SongApi/song`),
  },
  LYRICS: {
   GET: (id) => useLyicsPath(`Lyrics/Song/lyrics/song/${id}`),
  },
  GENRE: {
   GET: () => useApi("Songs/Genre"),
  },
 },
};

export default ENDPOINTS;
