import { ISong } from "./ISong";
export interface IPlaylist {
 playlistId: string;
 isPublic: boolean;
 title: string;
 ownerId: number;
 description: string;
 songs: ISong[];
}
export interface permissions {
 canDelete: boolean;
 canAdd: boolean;
}
