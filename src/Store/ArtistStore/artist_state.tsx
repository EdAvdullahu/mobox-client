import { combineReducers } from "redux";
import { artistSlice } from "./artist_reducer";

export const rootReducer = combineReducers({
 artist: artistSlice.reducer,
 // Add more reducers here if needed
});

export type ArtistState = ReturnType<typeof rootReducer>;
