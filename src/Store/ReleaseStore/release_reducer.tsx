import { Release } from "../../Pages/Song/types/IArtist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface release {
 release: Release | null;
}
const initialState: release = {
 release: null,
};

export const releaseSlice = createSlice({
 name: "release",
 initialState: initialState,
 reducers: {
  SetRelease: (state, action: PayloadAction<release>) => {
   state.release = action.payload.release;
  },
 },
});

export const ReleaseActions = releaseSlice.actions;

export default releaseSlice.reducer;
