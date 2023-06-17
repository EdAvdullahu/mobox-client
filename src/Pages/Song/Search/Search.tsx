import { useEffect, useState } from "react";
import classes from "./Search.module.css";
import { useDispatch, useSelector } from "react-redux";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import { SearchState } from "../../../Store/Search/search_state";
import { SongState } from "../../../Store/SongsStore/songs_state";
import { Genre } from "../../../Store/SongsStore/songs_actions";
import { MultiSelect } from "react-multi-select-component";
import useDebounce from "../../../Hooks/useDebounce";
import { SearchActions } from "../../../Store/Search/search_reducer";
import SearchResults from "./SearchResults/SearchResults";
import GenreResultPage from "./GenreResult/GenreResultPage";
import { GenreResult } from "../types/GenreResult";
import PlaylistSearchResults from "./PlaylistSearchResults/PlaylistSearchResults";
import UserResults from "./UserResults/UserResults";
import COOKIE from "../../../Common/Services/cookie.service";

function Search() {
 const searchParam = useSelector(
  (state: SearchState) => state.search.searchParam
 );
 const [searchType, setSearchType] = useState("SEARCH");
 const genres = useSelector((state: SongState) => state.song.genres);
 const optinGenres = genres?.map((item: Genre) => ({
  value: item.genreId,
  label: item.name,
 }));
 const [selected, setSelected] = useState([]);
 const debouncedSelected = useDebounce(selected, 2000);
 const [genreResults, setGR] = useState<GenreResult[] | null>(null);

 const userId = COOKIE.getCookie("userId");

 const dispatch = useDispatch();

 useEffect(() => {
  if (searchType === "SEARCH" && searchParam !== "") {
   const searchUrl = ENDPOINTS.FILTER.CUSTOM(searchParam);
   ApiCall.get(searchUrl)
    .then((res) => {
     if (res.data.isSuccess) {
      dispatch(
       SearchActions.SetSearchResult({ searchResult: res.data.result })
      );
     }
    })
    .catch((error) => {
     console.error("Search API error:", error);
    });
  } else if (searchType === "GENRE" && selected.length > 0) {
   const searchUrl = selected.map((obj: any) => obj?.value).join(",");
   ApiCall.getObj(ENDPOINTS.FILTER.GENRE(), {
    genres: searchUrl,
   })
    .then((res) => {
     setGR(res.data.result);
    })
    .catch((error) => {
     console.error("Genre API error:", error);
    });
  } else if (searchType === "USER" && searchParam !== "") {
   ApiCall.get(ENDPOINTS.FILTER.USERS(searchParam)).then((res) => {
    if (res.data.isSuccess) {
     dispatch(SearchActions.SetUserResult({ users: res.data.result }));
    }
   });
  } else if (searchType === "PLAYLIST" && searchParam !== "" && userId) {
   ApiCall.get(ENDPOINTS.FILTER.PLAYLISTS(+userId, searchParam)).then((res) => {
    if (res.data.isSuccess) {
     dispatch(SearchActions.SetPlaylistResult({ playlists: res.data.result }));
    }
   });
  }
 }, [searchType, searchParam, debouncedSelected]);

 return (
  <div className={classes.main}>
   <div className={classes.search_by}>
    <div className={classes.search_params}>
     <div
      onClick={() => setSearchType("SEARCH")}
      className={searchType === "SEARCH" ? classes.active_search : ""}
     >
      Songs
     </div>
     <div
      onClick={() => setSearchType("GENRE")}
      className={searchType === "GENRE" ? classes.active_search : ""}
     >
      Genre
     </div>
     <div
      onClick={() => setSearchType("PLAYLIST")}
      className={searchType === "PLAYLIST" ? classes.active_search : ""}
     >
      Playlists
     </div>
     <div
      onClick={() => setSearchType("USER")}
      className={searchType === "USER" ? classes.active_search : ""}
     >
      Users
     </div>
    </div>
   </div>
   {searchType === "SEARCH" && (
    <div className={classes.result_wrapper}>
     <div>
      <SearchResults />
     </div>
    </div>
   )}
   {searchType === "GENRE" && optinGenres && (
    <div>
     <MultiSelect
      options={optinGenres}
      value={selected}
      onChange={setSelected}
      labelledBy="Select genres"
     />
     <div>{genreResults && <GenreResultPage results={genreResults} />}</div>
    </div>
   )}
   {searchType === "PLAYLIST" && (
    <div className={classes.result_wrapper}>
     <div>
      <PlaylistSearchResults />
     </div>
    </div>
   )}
   {searchType === "USER" && (
    <div className={classes.result_wrapper}>
     <div>
      <UserResults />
     </div>
    </div>
   )}
  </div>
 );
}

export default Search;
