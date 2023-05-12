import { Release } from "../../Pages/Song/types/IArtist";

export const SET_RELEASE = "SET_RELEASE";

interface SetRelease {
 type: typeof SET_RELEASE;
 payload: Release;
}

export type ReleaseTypes = SetRelease;
