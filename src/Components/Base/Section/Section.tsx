import classes from "./Section.module.css";
import COOKIE from "../../../Common/Services/cookie.service";
function Section() {
 const username = COOKIE.getCookie("username");
 return (
  <div className={classes.main}>
   <div className={classes.user_info}>
    <div className={classes.user_img}>
     <img src="" />
    </div>
    <div>{username}</div>
   </div>
   <div className={classes.friends}>
    <div>My friends</div>
   </div>
  </div>
 );
}
export default Section;
