export const SET_SEARCH_PARAM = "SET_SEARCH_PARAM";

interface SetSearchParam {
 type: typeof SET_SEARCH_PARAM;
 payload: string;
}

export type SearchType = SetSearchParam;
