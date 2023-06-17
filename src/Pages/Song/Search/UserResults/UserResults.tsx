import { SearchState } from "../../../../Store/Search/search_state";
import { useSelector } from "react-redux";
import classes from "../SearchResults/SearchResults.module.css";
import ScrollElement from "../../../../Components/ScrollElement";
import { UserApi } from "../../types/ISearch";
import Card from "../../../../Components/Base/Card/Card";
import { NavLink } from "react-router-dom";

type CSSProperties = {
 [key: string]: string | number;
};

const resultStyle: CSSProperties = {
 height: "calc(100vh - 120px)",
 display: "flex",
 flexDirection: "column",
 gap: "20px",
 overflow: "scroll",
 paddingBottom: "150px",
};

const UserResults = () => {
 const results = useSelector((state: SearchState) => state.search.users);
 return (
  <div>
   <ScrollElement divStyle={resultStyle} shadow={"rgba(250, 40, 112, 0.678)"}>
    <div className={classes.main}>
     <div className={classes.result_wrapper}>
      <div className={classes.individual_result}>
       <Card>
        <div className={classes.innerCard}>
         <div> Users</div>
         <hr />
         <div className={classes.artists}>
          {results &&
           results.length > 0 &&
           results.map((item: UserApi) => (
            <NavLink
             to={`/music/user/${item.id}`}
             className={classes.artist}
             key={item.id}
            >
             <div className={classes.user_img}>
              <img src={item.image} alt={item.username} />
              {item.username}
             </div>
            </NavLink>
           ))}
          {results && results.length === 0 && (
           <div className={classes.nodata}>No Users Found</div>
          )}
         </div>
        </div>
       </Card>
      </div>
     </div>
    </div>
   </ScrollElement>
  </div>
 );
};

export default UserResults;
