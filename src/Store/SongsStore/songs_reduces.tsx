import { ISong } from "../../Pages/Song/types/ISong";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lyric } from "../../Pages/Song/types/ILyrics";
import { Genre } from "./songs_actions";

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

interface CurrentSongState {
 currentlyPlayingFrom: any;
 orderBy: string | null;
 asc: boolean;
 type: string | null;
}
interface controllState {
 isShuffle: boolean;
 isRepeatingSong: boolean;
 isRepeatingPlaylist: boolean;
}
interface InnerSongState {
 InnerPlayer: any;
}
interface LyricsState {
 lyrics: Lyric | null;
}
interface GenreState {
 genres: Genre[] | null;
}

const initialState: SongState &
 PlayingState &
 CurrentSongState &
 controllState &
 InnerSongState &
 LyricsState &
 GenreState = {
 CurrentSong: null,
 isPlaying: false,
 currentlyPlayingFrom: null,
 InnerPlayer: null,
 orderBy: null,
 asc: false,
 type: null,
 isShuffle: false,
 isRepeatingSong: false,
 isRepeatingPlaylist: true,
 lyrics: null,
 genres: null,
};

export const songSlice = createSlice({
 name: "song",
 initialState: initialState,
 reducers: {
  setCurrentPlayingSong: (
   state,
   action: PayloadAction<SongState & CurrentSongState>
  ) => {
   if (state.CurrentSong?.songId === action.payload.CurrentSong?.songId) {
    if (
     state.type === action.payload.type &&
     state.currentlyPlayingFrom?.playlistId ===
      action.payload.currentlyPlayingFrom?.playlistId
    ) {
     state.isPlaying = !state.isPlaying;
    } else if (
     state.currentlyPlayingFrom?.playlistId !==
     action.payload.currentlyPlayingFrom?.playlistId
    ) {
     state.currentlyPlayingFrom = action.payload.currentlyPlayingFrom;
     state.asc = action.payload.asc;
     state.type = action.payload.type;
     state.orderBy = action.payload.type;
     state.CurrentSong = action.payload.CurrentSong;
     if (!state.isShuffle) {
      state.InnerPlayer = action.payload.currentlyPlayingFrom;
     } else {
      state.InnerPlayer = shufflePlaylist(action.payload.currentlyPlayingFrom);
     }
    }
   } else {
    if (
     state.currentlyPlayingFrom?.playlistId ===
     action.payload.currentlyPlayingFrom.playlistId
    ) {
     state.CurrentSong = action.payload.CurrentSong;
    } else {
     state.currentlyPlayingFrom = action.payload.currentlyPlayingFrom;
     state.asc = action.payload.asc;
     state.type = action.payload.type;
     state.orderBy = action.payload.type;
     state.CurrentSong = action.payload.CurrentSong;
     if (!state.isShuffle) {
      state.InnerPlayer = action.payload.currentlyPlayingFrom;
     } else {
      state.InnerPlayer = shufflePlaylist(action.payload.currentlyPlayingFrom);
     }
    }
    state.isPlaying = true;
   }
  },
  togglePlay: (state) => {
   state.isPlaying = !state.isPlaying;
  },
  PlayNextSong: (state) => {
   state.isPlaying = false;
   let currentId = state.CurrentSong?.songId;
   let index = state.InnerPlayer.songs.findIndex((item: ISong) => {
    return item.songId == currentId;
   });
   if (index >= state.InnerPlayer.songs.length - 1) {
    state.CurrentSong = state.InnerPlayer.songs[0];
   } else {
    state.CurrentSong = state.InnerPlayer.songs[index + 1];
   }
   state.isPlaying = true;
  },
  PlayNextEvent: (state) => {
   let currentId = state.CurrentSong?.songId;
   let index = state.InnerPlayer.songs.findIndex((item: ISong) => {
    return item.songId == currentId;
   });
   if (!state.isRepeatingPlaylist && !state.isRepeatingSong) {
    state.isPlaying = false;
    if (index < state.InnerPlayer.songs.length - 1) {
     state.CurrentSong = state.InnerPlayer.songs[index + 1];
     state.isPlaying = true;
    }
   } else if (state.isRepeatingPlaylist) {
    if (index >= state.InnerPlayer.songs.length - 1) {
     state.CurrentSong = state.InnerPlayer.songs[0];
    } else {
     state.CurrentSong = state.InnerPlayer.songs[index + 1];
    }
   } else if (state.isRepeatingSong) {
    state.isPlaying = false;
    state.CurrentSong = null;
    state.CurrentSong = state.InnerPlayer.songs[index];
    state.isPlaying = true;
   }
  },
  PlayPreviousSong: (state) => {
   state.isPlaying = false;
   let currentId = state.CurrentSong?.songId;
   let index = state.InnerPlayer.songs.findIndex((item: ISong) => {
    return item.songId == currentId;
   });
   if (index <= 0) {
    state.CurrentSong =
     state.InnerPlayer.songs[state.InnerPlayer.songs.length - 1];
   } else {
    state.CurrentSong = state.InnerPlayer.songs[index - 1];
   }
   state.isPlaying = true;
  },
  ToggleRepeat: (state) => {
   if (state.isRepeatingPlaylist) {
    state.isRepeatingPlaylist = false;
    state.isRepeatingSong = true;
   } else if (state.isRepeatingSong) {
    state.isRepeatingSong = false;
    state.isRepeatingPlaylist = false;
   } else if (!state.isRepeatingPlaylist && !state.isRepeatingSong) {
    state.isRepeatingPlaylist = true;
   }
  },
  ToggleShuffeling: (state) => {
   if (state.isShuffle) {
    state.isShuffle = false;
    state.InnerPlayer = state.currentlyPlayingFrom;
   } else {
    state.isShuffle = true;
    state.InnerPlayer = shufflePlaylist(state.currentlyPlayingFrom);
   }
  },
  SetLyrics: (state, action: PayloadAction<LyricsState>) => {
   state.lyrics = action.payload.lyrics;
  },
  SetGenres: (state, action: PayloadAction<GenreState>) => {
   state.genres = action.payload.genres;
  },
 },
});

export const SongActions = songSlice.actions;

export default songSlice.reducer;

const shufflePlaylist = (playlist: any) => {
 const shuffledPlaylist = [...playlist.songs];

 // Use Fisher-Yates shuffle algorithm to shuffle the playlist
 for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffledPlaylist[i], shuffledPlaylist[j]] = [
   shuffledPlaylist[j],
   shuffledPlaylist[i],
  ];
 }

 return { ...playlist, songs: shuffledPlaylist };
};
