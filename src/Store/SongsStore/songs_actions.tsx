export interface Song {
 songId: number;
 name: string;
 releaseDate: string;
 length: string;
 path: string;
 imageUrl: string;
 release: {
  releaseId: number;
  title: string;
 };
 features: {
  artistId: number;
  name: string;
 }[];
 genres: {
  genreId: number;
  name: string;
  description: string;
 }[];
}

interface LikedSong {
 songId: number;
 name: string;
 length: string;
 imageUrl: string;
 hasFeatures: boolean;
 features: Feature[];
 genres: SongGenre[];
 releaseId: number;
 release: Release;
 isExplicite: boolean;
 path: string;
 releaseDate: string;
 songLikes: Like[];
 playlists: any;
}

interface Feature {
 featureId: number;
 songId: number;
 artistID: number;
 artist: Artist;
 featureRole: number;
}

interface Artist {
 artistId: number;
 name: string;
 imageUrl: string;
 features: Feature[];
 releases: Release[];
}

interface Release {
 releaseId: number;
 title: string;
 description: string;
 artist: Artist;
 artistId: number;
 imageUrl: string;
 releaseDate: string;
 songs: any[];
 releaseType: number;
}

interface SongGenre {
 songGenreId: number;
 songId: number;
 genreId: number;
 genre: Genre;
}

interface Genre {
 genreId: number;
 name: string;
 description: string;
 songs: any[];
}

interface User {
 userId: number;
 userName: string;
 collaborations: any;
 playlistLikes: any;
 songLikes: any[];
}

interface Like {
 id: number;
 userId: number;
 user: User;
 songId: number;
 song: Song;
 likeDateTime: string;
}

export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const TOGGLE_PLAYING = "TOGGLE_PLAYING";
export const SET_LIKED_SONGS = "SET_LIKED_SONGS";

interface SetCurrentPlayingSong {
 type: typeof SET_CURRENT_SONG;
 payload: Song;
}
interface TogglePlay {
 type: typeof TOGGLE_PLAYING;
}
interface SetLikedSongs {
 type: typeof SET_LIKED_SONGS;
 paload: LikedSong[];
}

export type SongsSctionTypes = SetCurrentPlayingSong | TogglePlay;
