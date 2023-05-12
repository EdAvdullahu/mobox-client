import { combineReducers } from "redux";
import { searchSlice } from "./search_reducer";

export const rootReducer = combineReducers({
 search: searchSlice.reducer,
 // Add more reducers here if needed
});

export type SearchState = ReturnType<typeof rootReducer>;
