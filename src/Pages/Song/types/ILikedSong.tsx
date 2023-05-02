export interface ISongLike {
 id: number;
 userId: number;
 user: User;
 songId: number;
 song: Song;
 likeDateTime: string;
}

interface User {
 userId: number;
 userName: string;
 collaborations: null;
 playlistLikes: null;
 songLikes: ISongLike[];
}

interface Song {
 songId: number;
 name: string;
 length: string;
 imageUrl: string;
 hasFeatures: boolean;
 features: Feature[];
 genres: Genre[];
 releaseId: number;
 release: Release;
 isExplicite: boolean;
 path: string;
 releaseDate: string;
 songLikes: ISongLike[];
 playlists: null;
}

interface Feature {
 featureId: number;
 songId: number;
 artistID: number;
 artist: Artist;
 featureRole: number;
}

interface Artist {
 artistId: number;
 name: string;
 imageUrl: string;
 features: Feature[];
 releases: Release[];
}

interface Genre {
 songGenreId: number;
 songId: number;
 genreId: number;
 genre: {
  genreId: number;
  name: string;
  description: string;
  songs: Song[];
 };
}

interface Release {
 releaseId: number;
 title: string;
 description: string;
 artist: Artist;
 artistId: number;
 imageUrl: string;
 releaseDate: string;
 songs: Song[];
 releaseType: number;
}
