import { combineReducers } from "redux";
import { songSlice } from "./songs_reduces";

export const rootReducer = combineReducers({
 song: songSlice.reducer,
 // Add more reducers here if needed
});

export type SongState = ReturnType<typeof rootReducer>;
