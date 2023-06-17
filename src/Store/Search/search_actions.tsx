import {
 Data,
 PlaylistSearchResults,
 UsersSearchResult,
} from "../../Pages/Song/types/ISearch";

export const SET_SEARCH_PARAM = "SET_SEARCH_PARAM";
export const SET_SEARCH_RSULTS = "SET_SEARCH_RSULTS";
export const SET_USER_RESULT = "SET_USER_RESULT";
export const SET_PLAYLIST_RESULT = "SET_PLAYLIST_RESULT";

interface SetSearchParam {
 type: typeof SET_SEARCH_PARAM;
 payload: string;
}
interface SetSearchResult {
 type: typeof SET_SEARCH_RSULTS;
 payload: Data;
}
interface SetUserResult {
 type: typeof SET_USER_RESULT;
 payload: UsersSearchResult;
}

interface SetPlaylistResult {
 type: typeof SET_PLAYLIST_RESULT;
 payload: PlaylistSearchResults;
}

export type SearchType =
 | SetSearchParam
 | SetSearchResult
 | SetUserResult
 | SetPlaylistResult;
