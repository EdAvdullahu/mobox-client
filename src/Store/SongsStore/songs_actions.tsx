import { Lyric } from "../../Pages/Song/types/ILyrics";

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

export interface Genre {
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
export const PLAY_NEXT = "PLAY_NEXT";
export const PLAY_PREVIOUS = "PLAY_PREVIOUS";
export const TOGGLE_REPEAT = "TOGGLE_REPEAT";
export const PLAY_NEXT_EVENT = "PLAY_NEXT_EVENT";
export const TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE";
export const SET_LYRICS = "SET_LYRICS";
export const SET_GERNES = "SET_GENRES";

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
interface PlayNextSong {
 type: typeof PLAY_NEXT;
}
interface PlayPreviousSong {
 type: typeof PLAY_PREVIOUS;
}
interface ToggleRepeat {
 type: typeof TOGGLE_REPEAT;
}
interface PlayNextEvent {
 type: typeof PLAY_NEXT_EVENT;
}
interface ToggleShuffeling {
 type: typeof TOGGLE_SHUFFLE;
}
interface SetLyrics {
 type: typeof SET_LYRICS;
 payload: Lyric;
}
interface SetGenres {
 type: typeof SET_GERNES;
 payload: Genre[];
}

export type SongsSctionTypes =
 | SetCurrentPlayingSong
 | TogglePlay
 | PlayNextSong
 | PlayPreviousSong
 | ToggleRepeat
 | PlayNextEvent
 | ToggleShuffeling
 | SetLyrics
 | SetGenres;
