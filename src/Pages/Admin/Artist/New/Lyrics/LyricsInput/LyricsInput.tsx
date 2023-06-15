import { LyricsPost, Lyrics } from "../Types";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import classes from "./LyricsInput.module.css";
import Card from "../../../../../../Components/Base/Card/Card";
import Edit from "../../../../../../Assets/Svg/Edit";
import Delete from "../../../../../../Assets/Svg/Delete";
import Annotation from "../../../../../../Assets/Svg/Annotation";
import Save from "../../../../../../Assets/Svg/Save";
import Cancel from "../../../../../../Assets/Svg/Cancel";
import ApiCall from "../../../../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../../../../Common/Api/ENDPOINTS";
interface props {
 songId: number;
 songName?: string;
}
const LyricsInput: React.FC<props> = ({ songId, songName }) => {
 const [verses, setVerses] = useState<Lyrics[]>([]);
 const [selectedVerse, setSelectedVerse] = useState<number | null>();
 const [selectedType, setSelectedType] = useState<string>("");
 const [selectedText, setSelectedText] = useState<string>("");
 const [quillIsOpen, setQuillIsOpen] = useState<boolean>(false);
 const handleAdd = () => {
  const newVerse: Lyrics = {
   text: "<p>N/A</p>",
   order: verses.length,
   annotation: "N/A",
  };
  setVerses([...verses, newVerse]);
 };
 const removeLyrics = (index: number) => {
  verses.splice(index, 1);
  verses.forEach((item: Lyrics, index: number) => {
   item.order = index;
  });
  setVerses([...verses]);
 };
 const handleQuillChange = (value: string) => {
  setSelectedText(value);
 };
 const openQuill = (index: number, type: string) => {
  setSelectedType(type);
  setSelectedVerse(index);
  if (type === "annotation") {
   setSelectedText(verses[index].annotation);
  } else {
   setSelectedText(verses[index].text);
  }
  setQuillIsOpen(true);
 };
 const closeQuill = (save: boolean) => {
  if (save && selectedVerse != null) {
   if (selectedType === "annotation") {
    verses[selectedVerse].annotation = selectedText;
   } else {
    verses[selectedVerse].text = selectedText;
   }
   setVerses([...verses]);
  }
  setQuillIsOpen(false);
  setSelectedText("");
  setSelectedType("");
  setSelectedVerse(null);
 };

 const saveLyrics = async () => {
  try {
   if (songId && songName) {
    const newSong = {
     songApiId: songId,
     songName: songName,
    };
    const songRes = await ApiCall.post(
     ENDPOINTS.SONGS.LYRICS.SONG.POST(),
     newSong
    );
    if (songRes.data.isSuccess) {
     const lyrics: LyricsPost = {
      songId: songRes.data.result.songId,
      verses: verses,
     };
     const lyricsRes = await ApiCall.post(
      ENDPOINTS.SONGS.LYRICS.POST(),
      lyrics
     );
     console.log("LYRICS", lyricsRes.data);
    }
   }
  } catch (error) {
   console.error(error);
  }
 };
 return (
  <div className={classes.main}>
   <div className={classes.main_actions}>
    <div onClick={handleAdd} className={classes.add}>
     Add Lyrics
    </div>
    <div onClick={saveLyrics} className={classes.save_lyrics}>
     Save lyrics
    </div>
   </div>
   <div className={classes.lyric_holder}>
    {verses.map((item: Lyrics, index: number) => (
     <Card>
      <div className={classes.lyrics}>
       <div className={classes.lyrics_header}>
        <div>{"Verse " + (index + 1)}</div>
        <div className={classes.actions}>
         <div
          className={classes.edit}
          onClick={() => openQuill(index, "Verse")}
         >
          <Edit />
         </div>
         <div
          className={classes.ann}
          onClick={() => openQuill(index, "annotation")}
         >
          <Annotation />
         </div>
         <div
          className={classes.delete}
          onClick={() => {
           removeLyrics(index);
          }}
         >
          <Delete />
         </div>
        </div>
       </div>
       <div
        className={classes.lyrics_body}
        dangerouslySetInnerHTML={{ __html: item.text }}
       ></div>
      </div>
     </Card>
    ))}
   </div>
   {quillIsOpen && (
    <div className={classes.quill_container}>
     <div className={classes.quill}>
      <div className={classes.quill_header}>
       <div>{selectedType + " " + (selectedVerse ? selectedVerse + 1 : 1)}</div>
       <div className={classes.quill_actions}>
        <div className={classes.save} onClick={() => closeQuill(true)}>
         <Save />
        </div>
        <div className={classes.cancel} onClick={() => closeQuill(false)}>
         <Cancel />
        </div>
       </div>
      </div>
      <div>
       <ReactQuill value={selectedText} onChange={handleQuillChange} />
      </div>
     </div>
    </div>
   )}
  </div>
 );
};
export default LyricsInput;
