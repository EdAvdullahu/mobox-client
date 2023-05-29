import { IPlaylist } from "../../Pages/Song/types/IPlaylist";
import { ISong } from "../../Pages/Song/types/ISong";

export const formatDate = (dateString: string): string => {
 const date = new Date(dateString);
 const month = date.toLocaleString("default", { month: "long" });
 const day = date.getDate();
 const ordinalSuffix = getOrdinalSuffix(day);
 const year = date.getFullYear();

 return `${month} ${day}${ordinalSuffix} ${year}`;
};

const getOrdinalSuffix = (day: number): string => {
 if (day >= 11 && day <= 13) {
  return "th";
 }
 const lastDigit = day % 10;
 switch (lastDigit) {
  case 1:
   return "st";
  case 2:
   return "nd";
  case 3:
   return "rd";
  default:
   return "th";
 }
};

export const formatLikedSongs = (likedSongs: any) => {
 return likedSongs.map((like: any) => ({
  songId: like.song.songId,
  name: like.song.name,
  releaseDate: like.song.releaseDate,
  length: like.song.length,
  path: like.song.path,
  imageUrl: like.song.imageUrl,
  isExplicit: like.song.isExplicite,
  hasFeatures: like.song.hasFeatures,
  releaseId: like.song.releaseId,
  likeDateTime: like.likeDateTime,
  release: {
   releaseId: like.song.release.releaseId,
   title: like.song.release.title,
  },
  features: like.song.features.map((feature: any) => ({
   artistId: feature.artist.artistId,
   name: feature.artist.name,
  })),
  genres: like.song.genres.map((genre: any) => ({
   genreId: genre.genre.genreId,
   name: genre.genre.name,
   description: genre.genre.description,
  })),
  isLiked: true,
  likedId: like.id,
 }));
};

export const addLikeData = (
 playlist: IPlaylist,
 likedSongs: any
): IPlaylist => {
 const playlistWithLikes = playlist.songs?.map((item: ISong) => ({
  ...item,
  isLiked: likedSongs?.songs?.some(
   (lSong: any) => lSong?.songId === item.songId
  ),
 }));
 playlistWithLikes?.forEach((element: ISong) => {
  if (element.isLiked) {
   likedSongs?.songs?.forEach((song: any) => {
    if (song.songId === element.songId) {
     element.likedId = song.likedId;
    }
   });
  }
 });
 return { ...playlist, songs: playlistWithLikes };
};

export const formatDuration = (duration: string): string => {
 const [hours, minutes, seconds] = duration.split(":").map(Number);
 const formattedMinutes = minutes.toString().padStart(2, "0");
 const formattedSeconds = seconds.toString().padStart(2, "0");
 return `${
  hours > 0 ? hours + ":" : ""
 }${formattedMinutes}:${formattedSeconds}`;
};
