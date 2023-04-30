import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./UserStore/user_reducer";
import { songSlice } from "./SongsStore/songs_reduces";

const store = configureStore({
 reducer: {
  user: userSlice.reducer,
  song: songSlice.reducer,
 },
});

export default store;
