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
