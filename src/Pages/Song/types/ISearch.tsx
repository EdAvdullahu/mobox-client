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

export interface UserApi {
 id: string;
 username: string;
 image: string;
}

export interface UsersSearchResult {
 users: UserApi[] | null;
}

export interface Playlist {
 playlitId: string;
 tittle: string;
 description: string;
 isPublic: boolean;
 ownerId: number;
 collaborations: [];
 songs: null;
 playlistLikes: null;
}

export interface PlaylistSearchObj {
 playlist: Playlist;
 isCollaborator: boolean;
 isOwner: boolean;
}

export interface PlaylistSearchResults {
 playlists: PlaylistSearchObj[] | null;
}
