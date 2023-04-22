import { combineReducers } from "redux";
import { userSlice } from "./user_reducer";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  // Add more reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
