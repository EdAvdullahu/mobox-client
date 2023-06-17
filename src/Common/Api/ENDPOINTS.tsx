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
  FORGOT_PASSWORD: (email: string) => string;
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
    GET_PERMISSIONS: (id: number, playlist: string) => string;
    DELETE_SONG: (id: number) => string;
    DELETE: (id: number, playlist: string) => string;
    RECOMMEND: (id: string) => string;
    DISLIKE: (id: number) => string;
   };
   LIKES: {
    LIKE: () => string;
    DISLIKE: (id: number) => string;
   };
   STREAM: () => string;
  };
 };
 ARTIST: {
  GET: (id: string) => string;
  FEATURE: (name: string) => string;
  STATISTICS: {
   MAIN: (id: number) => string;
   TOP_LISTENERS: (id: number) => string;
   ALL_SONGS: (id: number) => string;
   SONG_BY_DATES: (id: number, startDate: string, endDate: string) => string;
   ALL_RELEASES: (id: number) => string;
   RELEASE_BY_DATES: (id: number, startDate: string, endDate: string) => string;
  };
 };
 FILTER: {
  GENRE: () => string;
  CUSTOM: (name: string) => string;
  USERS: (name: string) => string;
  USER: (id: string) => string;
  PLAYLISTS: (id: number, name: string) => string;
  SONGUSER: (name: string) => string;
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
   POST: () => string;
   SONG: {
    POST: () => string;
   };
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
  FORGOT_PASSWORD: (email) =>
   useApi(`User/User/forgot-password?email=${email}`),
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
    GET_PERMISSIONS: (id, playlist) =>
     useApi(`Songs/Playlist/playlist/authorize/${id}/${playlist}`),
    DELETE_SONG: (id) => useApi(`Songs/Playlist/song/${id}`),
    DELETE: (id, playlist) => useApi(`Songs/Playlist/${playlist}/${id}`),
    RECOMMEND: (id) => useApi(`Songs/Recommendation/${id}`),
    DISLIKE: (id) => useApi(`Songs/Playlist/like/${id}`),
   },
   LIKES: {
    LIKE: () => useApi("Songs/Song/like"),
    DISLIKE: (id) => useApi(`Songs/Song/like/${id}`),
   },
   STREAM: () => useApi(`Songs/SongApi/stream`),
  },
 },
 ARTIST: {
  GET: (id) => useApi(`Songs/SongApi/artist/${id}`),
  FEATURE: (name) => useApi(`Songs/Artist/name/${name}`),
  STATISTICS: {
   MAIN: (id) => useApi(`Songs/Statistics/artist/main/${id}`),
   TOP_LISTENERS: (id) => useApi(`Songs/Statistics/artist/top-listeners/${id}`),
   ALL_SONGS: (id) => useApi(`Songs/Statistics/artist/all-songs/${id}`),
   SONG_BY_DATES: (id, startDate, endDate) =>
    useApi(`Songs/Statistics/song/by-dates/${id}/${startDate}/${endDate}`),
   ALL_RELEASES: (id) => useApi(`Songs/Statistics/artist/all-releases/${id}`),
   RELEASE_BY_DATES: (id, startDate, endDate) =>
    useApi(`Songs/Statistics/release/by-dates/${id}/${startDate}/${endDate}`),
  },
 },
 FILTER: {
  GENRE: () => useApi("Songs/SongApi/genre/filter"),
  CUSTOM: (name) => useApi(`Songs/SongApi/search/${name}`),
  USERS: (name) => useApi(`User/User/search-users/${name}`),
  USER: (name) => useApi(`Songs/User/public-profile/${name}`),
  PLAYLISTS: (id, name) =>
   useApi(`Songs/SongAPI/playlist/search/${id}/${name}`),
  SONGUSER: (name) => useApi(`Songs/User/search/${name}`),
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
   GET: (id) => useLyicsPath(`Song/lyrics/song/${id}`),
   POST: () => useLyicsPath(`Song/lyrics`),
   SONG: {
    POST: () => useLyicsPath(`Song`),
   },
  },
  GENRE: {
   GET: () => useApi("Songs/Genre"),
  },
 },
};

export default ENDPOINTS;
