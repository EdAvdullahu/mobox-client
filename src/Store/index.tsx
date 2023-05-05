import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./UserStore/user_reducer";
import { songSlice } from "./SongsStore/songs_reduces";
import { artistSlice } from "./ArtistStore/artist_reducer";

const store = configureStore({
 reducer: {
  user: userSlice.reducer,
  song: songSlice.reducer,
  artist: artistSlice.reducer,
 },
});

export default store;
