import ApiCall from "../../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../../Common/Api/ENDPOINTS";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import classes from "./ReleaseStatistics.module.css";
import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
 ResponsiveContainer,
} from "recharts";
import Cancel from "../../../../../Assets/Svg/Cancel";
import chroma from "chroma-js";

function generateSimilarColor(baseColor: string): string {
 const deviation = 0.5; // Adjust this value to control the similarity

 const color = chroma(baseColor);
 const similarColor = color
  .luminance(Math.random() * deviation)
  .darken(Math.random() * deviation)
  .saturate(Math.random() * deviation)
  .hex();

 return similarColor;
}
interface Props {
 songId: number;
 handleClose: () => void;
}

interface ReleaseStreams {
 release: Stream[];
 songs: Song[];
}

interface Song {
 songID: number;
 songName: string;
 releaseStats: Stream[];
}

interface Stream {
 noStreams: number;
 date: string;
}

const ReleaseChart: React.FC<Props> = ({ songId, handleClose }) => {
 const [streams, setStreams] = useState<ReleaseStreams | null>(null);
 const [chartData, setChartData] = useState<any>();
 const [isLoading, setIL] = useState<boolean>(false);
 const [startDate, setStartDate] = useState<Date>(
  dayjs(new Date()).subtract(7, "day").toDate()
 );
 const [endDate, setEndDate] = useState<Date>(new Date());

 useEffect(() => {
  const fetchData = async () => {
   try {
    if (songId && startDate && endDate) {
     setIL(true);
     const res = await ApiCall.getNoAuth(
      ENDPOINTS.ARTIST.STATISTICS.RELEASE_BY_DATES(
       songId,
       dayjs(startDate).format("YYYY-MM-DD"),
       dayjs(endDate).format("YYYY-MM-DD") + "T23:59:59.00"
      ),
      null
     );
     if (res.data.isSuccess) {
      console.log("RES>DATA", res.data.result);
      setStreams(res.data.result);
     }
    }
   } catch (error) {
    console.error(error);
    setIL(false);
   }
  };
  fetchData();
 }, [songId, startDate, endDate]);

 useEffect(() => {
  console.log("STREAM", streams);
  if (streams?.release && streams.songs) {
   const mapped = streams.release.map((item: Stream) => {
    return {
     name: item.date,
     release: item.noStreams,
    };
   });
   console.log("MAPPED", mapped);
   const newMapped = mapped?.map((item: any) => {
    const newObj: any = {
     name: item.name,
     release: item.release,
    };
    streams.songs.forEach((song: Song) => {
     const tempObj = song.releaseStats.find((stat: Stream) => {
      return stat.date === item?.name;
     });
     newObj[song.songName] = tempObj?.noStreams || 0;
    });
    return newObj;
   });
   console.log("WHAT DID I DO", newMapped);
   setChartData(newMapped);
   setIL(false);
  }
 }, [streams]);

 useEffect(() => {
  console.log("AFTER", chartData);
 }, [chartData]);

 const handleStartChange = (value: string) => {
  setStartDate(dayjs(value).toDate());
  console.log("START DATE", startDate);
 };
 const handleEndChange = (value: string) => {
  setEndDate(dayjs(value).toDate());
 };
 const existingColors = ["fa2870", "00b2ff", "6483f3ec", "gray-font"];
 return (
  <div className={classes.chart}>
   <div className={classes.chart_inner}>
    <div className={classes.inputs}>
     <div className={classes.input_wrapper}>
      <label htmlFor="startDate">Start Date</label>
      <input
       type="date"
       id="startDate"
       value={dayjs(startDate).format("YYYY-MM-DD")}
       onChange={(e) => handleStartChange(e.target.value)}
      />
     </div>
     <div className={classes.input_wrapper}>
      <label htmlFor="startDate">End Date</label>
      <input
       type="date"
       value={dayjs(endDate).format("YYYY-MM-DD")}
       onChange={(e) => handleEndChange(e.target.value)}
      />
     </div>
    </div>
    <div className={classes.close}>
     <div onClick={handleClose}>
      <Cancel />
     </div>
    </div>
    {chartData && !isLoading && (
     <ResponsiveContainer width="100%" height="100%">
      <LineChart
       width={500}
       height={300}
       data={chartData}
       margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
       }}
      >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Legend />
       {Object.keys(chartData[0]).map(
        (item: any) =>
         item !== "name" && (
          <Line
           type="monotone"
           stroke={generateSimilarColor(
            existingColors[0 % existingColors.length]
           )}
           dataKey={item}
          />
         )
       )}
      </LineChart>
     </ResponsiveContainer>
    )}
   </div>
  </div>
 );
};

export default ReleaseChart;
