import { combineReducers } from "redux";
import { releaseSlice } from "./release_reducer";

export const rootReducer = combineReducers({
 release: releaseSlice.reducer,
 // Add more reducers here if needed
});

export type ReleaseState = ReturnType<typeof rootReducer>;
