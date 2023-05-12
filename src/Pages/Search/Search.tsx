import { useEffect } from "react";
import { useSelector } from "react-redux";
import ApiCall from "../../Common/Api/ApiCall";
import ENDPOINTS from "../../Common/Api/ENDPOINTS";
import { SearchState } from "../../Store/Search/search_state";

function Search() {
 const searchParam = useSelector(
  (state: SearchState) => state.search.searchParam
 );

 useEffect(() => {
  console.log("SEARCH", searchParam);
  if (searchParam !== "") {
   const searchUrl = ENDPOINTS.SONG_API.SEARCH(searchParam);
   ApiCall.getNoAuth(searchUrl, null)
    .then((res) => {
     console.log(res.data.result);
    })
    .catch((error) => {
     console.error("Search API error:", error);
    });
  }
 }, [searchParam]);

 return <div></div>;
}

export default Search;
