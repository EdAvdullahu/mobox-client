interface User {
 id: string;
 name: string;
 email: string;
 songs: any;
}

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const REMOVE_FROM_LIKES = "REMOVE_FROM_LIKES";

interface SetUserAction {
 type: typeof SET_USER;
 payload: User;
}

interface ClearUserAction {
 type: typeof CLEAR_USER;
}
interface removeLikedSong {
 type: typeof REMOVE_FROM_LIKES;
 payload: string;
}

export type UserActionTypes = SetUserAction | ClearUserAction | removeLikedSong;
