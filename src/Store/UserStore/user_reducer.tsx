import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
 id: string;
 name: string;
 email: string;
}

interface UserState {
 user: User | null;
 likedSongs: any;
 playlists: any;
 likedPlaylists: any;
}

const initialState: UserState = {
 user: null,
 likedSongs: null,
 playlists: null,
 likedPlaylists: null,
};

interface newPlaylsit {
 playlist: any;
}

export const userSlice = createSlice({
 name: "user",
 initialState: initialState,
 reducers: {
  setUser: (state, action: PayloadAction<UserState>) => {
   state.user = action.payload.user;
   state.playlists = action.payload.playlists;
   state.likedSongs = action.payload.likedSongs;
   state.likedPlaylists = action.payload.likedPlaylists;
  },
  clearUser: (state) => {
   state.user = null;
  },
  resetLikedSongs: (state, action: PayloadAction<any>) => {
   state.likedSongs = action.payload;
  },
  removeLikedSongs: (state, action: PayloadAction<string>) => {
   state.likedSongs.songs = state.likedSongs.songs.filter(
    (item: any) => item?.likedId !== action.payload
   );
  },
  removeLikedPlaylist: (state, action: PayloadAction<number>) => {
   state.likedPlaylists = state.likedPlaylists.filter(
    (item: any) => item?.id !== action.payload
   );
  },
  resetLikedPlaylist: (state, action: PayloadAction<any>) => {
   console.log("called");
   if (Array.isArray(state.likedPlaylists)) {
    state.likedPlaylists.push(action.payload);
   }
  },
  addPlaylist: (state, action: PayloadAction<newPlaylsit>) => {
   if (Array.isArray(state.playlists)) {
    state.playlists.push(action.payload.playlist);
   }
  },
  removePlaylist: (state, action: PayloadAction<string>) => {
   if (Array.isArray(state.playlists)) {
    const index = state.playlists.findIndex((item: any) => {
     return item && item.playlistId !== action.payload;
    });
    state.playlists.splice(index, 1);
   }
  },
 },
});

export const UserActions = userSlice.actions;

export default userSlice.reducer;
