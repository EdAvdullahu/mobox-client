import { ISong } from "./ISong";
export interface IPlaylist {
 playlistId: string;
 isPublic: boolean;
 title: string;
 ownerId: number;
 description: string;
 songs: ISong[];
 likeCount?: number;
}
export interface permissions {
 canDelete: boolean;
 canAdd: boolean;
}
