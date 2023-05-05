import { IArtist } from "../../Pages/Song/types/IArtist";

export const SET_ARTIST = "SET_ARTIST";

interface SetArtist {
 type: typeof SET_ARTIST;
 payload: IArtist;
}

export type ArtistTypes = SetArtist;
