export interface ISong {
 songId: number;
 name: string;
 releaseDate: string;
 length: string;
 path: string;
 imageUrl: string;
 release: {
  releaseId: number;
  title: string;
 };
 features: {
  artistId: number;
  name: string;
 }[];
 genres: {
  genreId: number;
  name: string;
  description: string;
 }[];
 isLiked: boolean;
 likedId: any;
}
