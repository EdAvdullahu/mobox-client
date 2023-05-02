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
}

const initialState: UserState = {
 user: null,
 likedSongs: null,
 playlists: null,
};

export const userSlice = createSlice({
 name: "user",
 initialState: initialState,
 reducers: {
  setUser: (state, action: PayloadAction<UserState>) => {
   state.user = action.payload.user;
   state.playlists = action.payload.playlists;
   state.likedSongs = action.payload.likedSongs;
  },
  clearUser: (state) => {
   state.user = null;
  },
  removeLikedSong: (state, action: PayloadAction<string>) => {
   if (state.likedSongs) {
    state.likedSongs = state.likedSongs?.filter((item: any) => {
     item?.id !== action.payload;
    });
   }
  },
 },
});

export const UserActions = userSlice.actions;

export default userSlice.reducer;
