import { IArtist } from "../../Pages/Song/types/IArtist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface artist {
 artist: IArtist | null;
}
const initialState: artist = {
 artist: null,
};

export const artistSlice = createSlice({
 name: "artist",
 initialState: initialState,
 reducers: {
  SetArtist: (state, action: PayloadAction<artist>) => {
   state.artist = action.payload.artist;
  },
 },
});

export const ArtistActions = artistSlice.actions;

export default artistSlice.reducer;
