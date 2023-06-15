import { useState, useEffect } from "react";
import ENDPOINTS from "../../../../../Common/Api/ENDPOINTS";
import COOKIE from "../../../../../Common/Services/cookie.service";
import Order from "../../../../../Assets/Svg/Order";
import ApiCall from "../../../../../Common/Api/ApiCall";
import OrderActive from "../../../../../Assets/Svg/OrderActive";
import classes from "./ReleaseStatistics.module.css";
import ReleaseChart from "./ReleaseChart";
interface statistic {
 releaseId: number;
 releaseName: string;
 noStreams: number;
 lmnoStreams: number;
 lwnoStreams: number;
 noShares: number;
}
const ReleaseStatistics = () => {
 // const artistId = COOKIE.getCookie("userId");
 const [artistStats, setArtistStats] = useState<statistic[] | null>(null);
 const [ordered, setOrdered] = useState<statistic[] | null>(null);
 const [sortBy, setSortBy] = useState<string>("noStreams");
 const [order, setOrder] = useState<string>("desc");
 const [chart, setChart] = useState<boolean>(false);
 const [selectedRelease, setSR] = useState<number | null>(null);
 const artistId = 1;
 useEffect(() => {
  const fetchData = async () => {
   try {
    const res = await ApiCall.get(
     ENDPOINTS.ARTIST.STATISTICS.ALL_RELEASES(artistId)
    );
    if (res.data.isSuccess) {
     setArtistStats(res.data.result.releases);
    }
   } catch (error) {
    console.error(error);
   }
  };
  fetchData();
 }, [artistId]);
 useEffect(() => {
  if (!ordered && artistStats) {
   setOrdered(artistStats);
  } else if (artistStats?.length === 1) {
   setOrdered(artistStats);
  } else {
   const temp = ordered?.sort((a: statistic, b: statistic) => {
    if (a[sortBy as keyof statistic] < b[sortBy as keyof statistic]) {
     return order === "asc" ? -1 : 1; // a should be sorted before b
    }
    if (a[sortBy as keyof statistic] > b[sortBy as keyof statistic]) {
     return order === "asc" ? 1 : -1; // a should be sorted after b
    }
    return 0;
   });
   if (temp) {
    setOrdered([...temp]);
   }
  }
 }, [order, sortBy, artistStats]);

 const handleSoort = (sort: string) => {
  if (sort === sortBy) {
   setOrder(order === "asc" ? "desc" : "asc");
  } else {
   setOrder("desc");
   setSortBy(sort);
  }
 };

 const handleChart = (id: number) => {
  setChart(true);
  setSR(id);
 };
 const handleChartClose = () => {
  setChart(false);
  setSR(null);
 };
 return (
  <div className={classes.main}>
   {chart && selectedRelease && (
    <ReleaseChart handleClose={handleChartClose} songId={selectedRelease} />
   )}
   <div className={classes.top_listeners}>
    <div className={classes.top_listeners_title}>List of Songs</div>
    <div className={classes.table}>
     <table>
      <thead>
       <tr>
        <th>#</th>
        <th>
         <div className={classes.th}>
          Release Name
          <div onClick={() => handleSoort("releaseName")}>
           {sortBy === "releaseName" && (
            <div
             className={`${classes.icon} ${
              order === "desc" ? classes.spin : ""
             }`}
            >
             <OrderActive />
            </div>
           )}
           {sortBy !== "releaseName" && (
            <div className={classes.spin}>
             <Order />
            </div>
           )}
          </div>
         </div>
        </th>
        <th>
         <div className={classes.th}>
          Number of Streams
          <div onClick={() => handleSoort("noStreams")}>
           {sortBy === "noStreams" && (
            <div
             className={`${classes.icon} ${
              order === "desc" ? classes.spin : ""
             }`}
            >
             <OrderActive />
            </div>
           )}
           {sortBy !== "noStreams" && (
            <div className={classes.spin}>
             <Order />
            </div>
           )}
          </div>
         </div>
        </th>
        <th>
         <div className={classes.th}>
          NoS From Last Week
          <div onClick={() => handleSoort("lwnoStreams")}>
           {sortBy === "lwnoStreams" && (
            <div
             className={`${classes.icon} ${
              order === "desc" ? classes.spin : ""
             }`}
            >
             <OrderActive />
            </div>
           )}
           {sortBy !== "lwnoStreams" && (
            <div className={classes.spin}>
             <Order />
            </div>
           )}
          </div>
         </div>
        </th>
        <th>
         <div className={classes.th}>
          NoS From Last Month
          <div onClick={() => handleSoort("lmnoStreams")}>
           {sortBy === "lmnoStreams" && (
            <div
             className={`${classes.icon} ${
              order === "desc" ? classes.spin : ""
             }`}
            >
             <OrderActive />
            </div>
           )}
           {sortBy !== "lmnoStreams" && (
            <div className={classes.spin}>
             <Order />
            </div>
           )}
          </div>
         </div>
        </th>
        <th>
         <div className={classes.th}>
          Number of Shares
          <div onClick={() => handleSoort("noShares")}>
           {sortBy === "noShares" && (
            <div
             className={`${classes.icon} ${
              order === "desc" ? classes.spin : ""
             }`}
            >
             <OrderActive />
            </div>
           )}
           {sortBy !== "noShares" && (
            <div className={classes.spin}>
             <Order />
            </div>
           )}
          </div>
         </div>
        </th>
        <th></th>
       </tr>
      </thead>
      <tbody>
       {ordered &&
        ordered.map((item: statistic, index: number) => (
         <tr>
          <td>{index}</td>
          <td>{item.releaseName}</td>
          <td>{item.noStreams}</td>
          <td>{item.lwnoStreams}</td>
          <td>{item.lmnoStreams}</td>
          <td>{item.noShares}</td>
          <td onClick={() => handleChart(item.releaseId)}>more</td>
         </tr>
        ))}
      </tbody>
     </table>
    </div>
   </div>
  </div>
 );
};
export default ReleaseStatistics;
