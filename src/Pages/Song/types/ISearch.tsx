export interface Artist {
 artistId: number;
 name: string;
 imageUrl: string;
}

export interface Song {
 songId: number;
 name: string;
 releaseDate: string;
 length: string;
 path: string;
 imageUrl: string;
 releaseId: number;
 isExplicite: boolean;
 features: Feature[];
}

export interface Feature {
 featureId: number;
 songId: number;
 artistId: number;
 featureRole: number;
 artist: Artist;
}

export interface Release {
 releaseId: number;
 title: string;
 description: string | null;
 artistId: number;
 imageUrl: string;
 releaseDate: string;
 songs: Song[] | null;
 releaseType: number;
}

export interface Advanced {
 artistId: number;
 name: string;
 imageUrl: string;
 song: Song;
}

export interface Data {
 artists: Artist[];
 advanced: Advanced[];
 releases: Release[];
}
