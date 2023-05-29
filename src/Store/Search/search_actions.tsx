import { Data } from "../../Pages/Song/types/ISearch";

export const SET_SEARCH_PARAM = "SET_SEARCH_PARAM";
export const SET_SEARCH_RSULTS = "SET_SEARCH_RSULTS";

interface SetSearchParam {
 type: typeof SET_SEARCH_PARAM;
 payload: string;
}
interface SetSearchResult {
 type: typeof SET_SEARCH_RSULTS;
 payload: Data;
}

export type SearchType = SetSearchParam | SetSearchResult;
