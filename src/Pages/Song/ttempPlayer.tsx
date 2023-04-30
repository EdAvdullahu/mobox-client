import { useRef, useState } from "react";

function SongPlayer({ url }: { url: string }) {
 const audioRef = useRef<HTMLAudioElement | null>(null);

 const handlePlay = () => {
  if (audioRef.current) {
   audioRef.current.play();
  }
 };

 const handlePause = () => {
  if (audioRef.current) {
   audioRef.current.pause();
  }
 };

 return (
  <div>
   <audio ref={audioRef} src={url} onError={(e) => console.log(e)} />
   <button onClick={handlePlay}>Play</button>
   <button onClick={handlePause}>Pause</button>
  </div>
 );
}
export default SongPlayer;
