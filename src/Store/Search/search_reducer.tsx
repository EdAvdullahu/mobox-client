import {
 Data,
 PlaylistSearchResults,
 UsersSearchResult,
} from "../../Pages/Song/types/ISearch";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface search {
 searchParam: string;
}
interface SearchResult {
 searchResult: Data | null;
}
const initialState: search &
 SearchResult &
 UsersSearchResult &
 PlaylistSearchResults = {
 searchParam: "",
 searchResult: null,
 users: null,
 playlists: null,
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
  SetUserResult: (state, action: PayloadAction<UsersSearchResult>) => {
   state.users = action.payload.users;
  },
  SetPlaylistResult: (state, action: PayloadAction<PlaylistSearchResults>) => {
   state.playlists = action.payload.playlists;
  },
 },
});

export const SearchActions = searchSlice.actions;

export default searchSlice.reducer;
