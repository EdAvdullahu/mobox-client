import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface search {
 searchParam: string;
}
const initialState: search = {
 searchParam: "",
};

export const searchSlice = createSlice({
 name: "search",
 initialState: initialState,
 reducers: {
  SetSearchParam: (state, action: PayloadAction<search>) => {
   state.searchParam = action.payload.searchParam;
  },
 },
});

export const SearchActions = searchSlice.actions;

export default searchSlice.reducer;
