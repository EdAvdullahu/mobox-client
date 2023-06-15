import ApiCall from "../../../../../Common/Api/ApiCall";
import COOKIE from "../../../../../Common/Services/cookie.service";
import { useState, useEffect } from "react";
import ENDPOINTS from "../../../../../Common/Api/ENDPOINTS";
import classes from "./ArtistStatistics.module.css";
import Card from "../../../../../Components/Base/Card/Card";
import Order from "../../../../../Assets/Svg/Order";
import OrderActive from "../../../../../Assets/Svg/OrderActive";
interface ArtistStatistics {
 mainStats: mainStats; // Adjust the type to match your API response
 topListenersStats: topListeners; // Adjust the type to match your API response
}
interface topListeners {
 artistId: number;
 artistName: string;
 topListeners: listener[];
}
interface listener {
 userId: number;
 userName: string;
 noStreams: number;
 noLikes: number;
}
interface mainStats {
 artistId: number;
 artistName: string;
 noStreams: number;
 allStreams: number;
 moListeners: number;
 alListeners: number;
 noLikes: number;
 allLikes: number;
}
const ArtistStatistics = () => {
 // const artistId = COOKIE.getCookie("userId");
 const [artistStats, setArtistStats] = useState<ArtistStatistics | null>(null);
 const [topTen, setTopTen] = useState<listener[] | null>(null);
 const [sortBy, setSortBy] = useState<string>("noStreams");
 const [order, setOrder] = useState<string>("desc");
 const artistId = 1;
 useEffect(() => {
  const fetchData = async () => {
   try {
    const mainStatsPromise = ApiCall.get(
     ENDPOINTS.ARTIST.STATISTICS.MAIN(artistId)
    );
    const topListenersStatsPromise = ApiCall.get(
     ENDPOINTS.ARTIST.STATISTICS.TOP_LISTENERS(artistId)
    );

    const [mainStatsResponse, topListenersStatsResponse] = await Promise.all([
     mainStatsPromise,
     topListenersStatsPromise,
    ]);

    if (
     mainStatsResponse.data.isSuccess &&
     topListenersStatsResponse.data.isSuccess
    ) {
     const mainStats = mainStatsResponse.data.result;
     const topListenersStats = topListenersStatsResponse.data.result;

     setArtistStats({ mainStats, topListenersStats });
    } else {
     // Handle API error if needed
    }
   } catch (error) {
    console.error(error);
   }
  };

  fetchData();
 }, [artistId]);

 useEffect(() => {
  if (artistStats?.topListenersStats.topListeners) {
   const temp = [...artistStats.topListenersStats.topListeners].sort(
    (a: listener, b: listener) => {
     if (a[sortBy as keyof listener] < b[sortBy as keyof listener]) {
      return order === "asc" ? -1 : 1; // a should be sorted before b
     }
     if (a[sortBy as keyof listener] > b[sortBy as keyof listener]) {
      return order === "asc" ? 1 : -1; // a should be sorted after b
     }
     return 0;
    }
   );

   setTopTen(temp);
  }
 }, [artistStats, order, sortBy]);

 const handleSoort = (sort: string) => {
  if (sort === sortBy) {
   setOrder(order === "asc" ? "desc" : "asc");
  } else {
   setOrder("desc");
   setSortBy(sort);
  }
 };
 return (
  <div className={classes.main}>
   <div className={classes.artit_info}>
    <Card>
     <div className={classes.card}>
      <div className={classes.card_title}>Number of Streams</div>
      <div className={classes.card_number}>
       {artistStats?.mainStats.noStreams}
      </div>
     </div>
    </Card>
    <Card>
     <div className={classes.card}>
      <div className={classes.card_title}>Number of Total Streams</div>
      <div className={classes.card_number}>
       {artistStats?.mainStats.allStreams}
      </div>
     </div>
    </Card>
    <Card>
     <div className={classes.card}>
      <div className={classes.card_title}>Number of Likes </div>
      <div className={classes.card_number}>
       {artistStats?.mainStats.noLikes}
      </div>
     </div>
    </Card>
    <Card>
     <div className={classes.card}>
      <div className={classes.card_title}>Number of Total Likes</div>
      <div className={classes.card_number}>
       {artistStats?.mainStats.allLikes}
      </div>
     </div>
    </Card>
    <Card>
     <div className={classes.card}>
      <div className={classes.card_title}>Monthly Listeners</div>
      <div className={classes.card_number}>
       {artistStats?.mainStats.moListeners}
      </div>
     </div>
    </Card>
    <Card>
     <div className={classes.card}>
      <div className={classes.card_title}>Total Monthly Listeners</div>
      <div className={classes.card_number}>
       {artistStats?.mainStats.alListeners}
      </div>
     </div>
    </Card>
   </div>
   <div className={classes.top_listeners}>
    <div className={classes.top_listeners_title}>Top 10 Listeners</div>
    <div className={classes.table}>
     <table>
      <thead>
       <tr>
        <th>
         <div className={classes.th}>
          Name{" "}
          <div onClick={() => handleSoort("userName")}>
           {sortBy === "userName" && (
            <div
             className={`${classes.icon} ${
              order === "desc" ? classes.spin : ""
             }`}
            >
             <OrderActive />
            </div>
           )}
           {sortBy !== "userName" && (
            <div className={classes.spin}>
             <Order />
            </div>
           )}
          </div>
         </div>
        </th>
        <th>
         <div className={classes.th}>
          Number of Strems
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
          Number of Liked Songs{" "}
          <div onClick={() => handleSoort("noLikes")}>
           {sortBy === "noLikes" && (
            <div
             className={`${classes.icon} ${
              order === "desc" ? classes.spin : ""
             }`}
            >
             <OrderActive />
            </div>
           )}
           {sortBy !== "noLikes" && (
            <div className={classes.spin}>
             <Order />
            </div>
           )}
          </div>
         </div>
        </th>
       </tr>
      </thead>
      <tbody>
       {topTen &&
        topTen.map((item: listener, index: number) => (
         <tr key={index}>
          <td>{item.userName}</td>
          <td>{item.noStreams}</td>
          <td>{item.noLikes}</td>
         </tr>
        ))}
      </tbody>
     </table>
    </div>
   </div>
  </div>
 );
};
export default ArtistStatistics;
