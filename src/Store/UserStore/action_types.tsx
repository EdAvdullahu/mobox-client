interface User {
  id: string;
  name: string;
  email: string;
}

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface ClearUserAction {
  type: typeof CLEAR_USER;
}

export type UserActionTypes = SetUserAction | ClearUserAction;
