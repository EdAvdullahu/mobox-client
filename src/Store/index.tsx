import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserStore/user_reducer";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
