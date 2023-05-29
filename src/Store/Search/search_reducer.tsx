import { Data } from "../../Pages/Song/types/ISearch";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface search {
 searchParam: string;
}
interface SearchResult {
 searchResult: Data | null;
}
const initialState: search & SearchResult = {
 searchParam: "",
 searchResult: null,
};

export const searchSlice = createSlice({
 name: "search",
 initialState: initialState,
 reducers: {
  SetSearchParam: (state, action: PayloadAction<search>) => {
   state.searchParam = action.payload.searchParam;
  },
  SetSearchResult: (state, action: PayloadAction<SearchResult>) => {
   state.searchResult = action.payload.searchResult;
  },
 },
});

export const SearchActions = searchSlice.actions;

export default searchSlice.reducer;
