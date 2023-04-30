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

export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const TOGGLE_PLAYING = "TOGGLE_PLAYING";

interface SetCurrentPlayingSong {
 type: typeof SET_CURRENT_SONG;
 payload: Song;
}
interface TogglePlay {
 type: typeof TOGGLE_PLAYING;
}

export type SongsSctionTypes = SetCurrentPlayingSong | TogglePlay;
