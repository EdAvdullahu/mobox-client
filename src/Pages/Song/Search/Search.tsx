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

 const dispatch = useDispatch();

 useEffect(() => {
  if (searchType === "SEARCH" && searchParam !== "") {
   const searchUrl = ENDPOINTS.FILTER.CUSTOM(searchParam);
   ApiCall.getNoAuth(searchUrl, null)
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
   ApiCall.getNoAuth(ENDPOINTS.FILTER.GENRE(), {
    genres: searchUrl,
   })
    .then((res) => {
     console.log(res.data.result);
    })
    .catch((error) => {
     console.error("Genre API error:", error);
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
      Name
     </div>
     <div
      onClick={() => setSearchType("GENRE")}
      className={searchType === "GENRE" ? classes.active_search : ""}
     >
      Genre
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
    </div>
   )}
  </div>
 );
}

export default Search;
