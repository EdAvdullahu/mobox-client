interface User {
 id: string;
 name: string;
 email: string;
 songs: any;
}

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const RESET_LIKED_SONGS = "RESET_LIKED_SONGS";
export const REMOVE_LIKED_SONG = "REMOVE_LIKED_SONG";

interface SetUserAction {
 type: typeof SET_USER;
 payload: User;
}

interface ClearUserAction {
 type: typeof CLEAR_USER;
}
interface resetLikedSongs {
 type: typeof RESET_LIKED_SONGS;
 payload: any;
}
interface removeLikedSongs {
 type: typeof REMOVE_LIKED_SONG;
 payload: string;
}

export type UserActionTypes =
 | SetUserAction
 | ClearUserAction
 | resetLikedSongs
 | removeLikedSongs;
