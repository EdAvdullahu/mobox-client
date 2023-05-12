import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./UserStore/user_reducer";
import { songSlice } from "./SongsStore/songs_reduces";
import { artistSlice } from "./ArtistStore/artist_reducer";
import { releaseSlice } from "./ReleaseStore/release_reducer";
import { searchSlice } from "./Search/search_reducer";

const store = configureStore({
 reducer: {
  user: userSlice.reducer,
  song: songSlice.reducer,
  artist: artistSlice.reducer,
  release: releaseSlice.reducer,
  search: searchSlice.reducer,
 },
});

export default store;
