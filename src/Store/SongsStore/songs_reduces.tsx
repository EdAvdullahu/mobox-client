import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface SongState {
 CurrentSong: Song | null;
}
interface PlayingState {
 isPlaying: boolean;
}

const initialState: SongState & PlayingState = {
 CurrentSong: null,
 isPlaying: false,
};

// const initialState = {
//  currentSongs: [],
//  currentIndex: 0,
//  isActive: false,
//  isPlaying: false,
//  activeSong: {},
//  genreListId: "",
// };
export const songSlice = createSlice({
 name: "song",
 initialState: initialState,
 reducers: {
  setCurrentPlayingSong: (state, action: PayloadAction<SongState>) => {
   if (state.CurrentSong?.songId === action.payload.CurrentSong?.songId) {
    state.isPlaying = !state.isPlaying;
   } else {
    state.CurrentSong = action.payload.CurrentSong;
    state.isPlaying = true;
   }
  },
  togglePlay: (state) => {
   state.isPlaying = !state.isPlaying;
  },
 },
});

export const SongActions = songSlice.actions;

export default songSlice.reducer;
