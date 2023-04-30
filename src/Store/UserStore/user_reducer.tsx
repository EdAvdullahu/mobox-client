import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
 id: string;
 name: string;
 email: string;
}

interface UserState {
 user: User | null;
 songs: any;
 playlists: any;
}

const initialState: UserState = {
 user: null,
 songs: null,
 playlists: null,
};

export const userSlice = createSlice({
 name: "user",
 initialState: initialState,
 reducers: {
  setUser: (state, action: PayloadAction<UserState>) => {
   state.user = action.payload.user;
   state.playlists = action.payload.playlists;
  },
  clearUser: (state) => {
   state.user = null;
  },
 },
});

export const UserActions = userSlice.actions;

export default userSlice.reducer;
