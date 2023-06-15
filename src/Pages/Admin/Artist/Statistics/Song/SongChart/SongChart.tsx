import ApiCall from "../../../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../../../Common/Api/ENDPOINTS";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import classes from "../SongStatitics.module.css";
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
import Cancel from "../../../../../../Assets/Svg/Cancel";

interface Props {
 songId: number;
 handleClose: () => void;
}

interface Stream {
 noStreams: number;
 date: string;
}

interface ChartData {
 name: string;
 streams: number;
}

const SongChart: React.FC<Props> = ({ songId, handleClose }) => {
 const [streams, setStreams] = useState<Stream[] | null>(null);
 const [chartData, setChartData] = useState<ChartData[] | null>(null);
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
     const res = await ApiCall.get(
      ENDPOINTS.ARTIST.STATISTICS.SONG_BY_DATES(
       songId,
       dayjs(startDate).format("YYYY-MM-DD"),
       dayjs(endDate).format("YYYY-MM-DD") + "T23:59:59.00"
      )
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
  console.log("CHANGE DATA");
  if (streams) {
   const mapped: ChartData[] = streams.map((item: Stream) => {
    return {
     name: item.date,
     streams: item.noStreams,
    };
   });
   setChartData(mapped);
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
    <div onClick={handleClose} className={classes.close}>
     <Cancel />
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
       <Line type="monotone" dataKey="streams" stroke="#fa2870" />
      </LineChart>
     </ResponsiveContainer>
    )}
   </div>
  </div>
 );
};

export default SongChart;
