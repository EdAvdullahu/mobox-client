import classes from "./SimpleLoader.module.css";

function SimpleLoader() {
 return (
  <div className={classes.loading}>
   <h1>
    <span className={classes.let1}>l</span>
    <span className={classes.let2}>o</span>
    <span className={classes.let3}>a</span>
    <span className={classes.let4}>d</span>
    <span className={classes.let5}>i</span>
    <span className={classes.let6}>n</span>
    <span className={classes.let7}>g</span>
   </h1>
  </div>
 );
}

export default SimpleLoader;
