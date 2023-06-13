export interface newRelease {
 Title: string;
 Description: string;
 NumberOfSongs: number;
 Artist: string;
 Image: File | null;
}
interface feature {
 songId: 0;
 artistID: number;
 featureRole: number;
}
export interface SongPostRequest {
 Name: string;
 Image: File | null;
 HasFeatures: boolean;
 ReleaseId: number;
 IsExplicit: boolean;
 Audio: File | null;
 Features: [];
 Genres: [];
 features?: feature[];
 genres?: genre[];
}

interface genre {
 songId: number;
 genreId: number;
}
