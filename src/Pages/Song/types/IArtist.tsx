export interface IArtist {
 artistId: number;
 name: string;
 imgUrl: string;
 features: Array<any>;
 releases: Release[];
}

export interface Release {
 releaseId: number;
 releaseType: ReleaseType;
 title: string;
 releaseDate: string;
 imageUrl: string;
 description: string;
 songs: Song[];
}

export interface Song {
 songId: number;
 name: string;
 imageUrl: string;
 length: string;
 path: string;
 releaseDate: string;
 isExplicit: boolean;
 hasFeatures: boolean;
 features: Feature[];
 genres: Genre[];
 isLiked: boolean;
 likedId: any;
}

export interface Feature {
 artistId: number;
 name: string;
}

export interface Genre {
 genreId: number;
 name: string;
 description: string;
}

export enum ReleaseType {
 SINGLE = 0,
 EP = 1,
 ALBUM = 2,
}
