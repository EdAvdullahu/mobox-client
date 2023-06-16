import { NavLink } from "react-router-dom";
import Card from "../../../../Components/Base/Card/Card";
import { GenreResult } from "../../types/GenreResult";
import classes from "./GenreResultPage.module.css";
import ScrollElement from "../../../../Components/ScrollElement";
import { CSSProperties } from "react";
interface Props {
 results: GenreResult[];
}
const innerContent: CSSProperties = {
 height: "calc(100vh - 175px)",
 display: "flex",
 flexDirection: "column",
 overflow: "auto",
};
const GenreResultPage: React.FC<Props> = ({ results }) => {
 return (
  <div className={classes.main}>
   <div className={classes.container}>
    <ScrollElement divStyle={innerContent} shadow={"rgb(250 40 112 / 0.3)"}>
     <div className={classes.results}>
      {results.map((item: GenreResult, index: number) => (
       <div key={index} className={classes.card_wrapper}>
        <Card>
         <NavLink
          className={classes.link}
          to={`/music/release/${item.releaseId}`}
         >
          <div className={classes.inner_link}>
           <div className={classes.img}>
            <img src={item.imageUrl} alt={item.name} />
           </div>
           <div className={classes.name}>
            <div className={classes.name_inner}>{item.name}</div>
           </div>
          </div>
         </NavLink>
        </Card>
       </div>
      ))}
     </div>
    </ScrollElement>
   </div>
  </div>
 );
};

export default GenreResultPage;
