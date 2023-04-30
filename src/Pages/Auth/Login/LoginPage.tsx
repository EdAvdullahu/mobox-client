import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./LoginPage.module.css";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import { UserActions } from "../../../Store/UserStore/user_reducer";

interface IUser {
 email: string;
 name: string;
 id: string;
}

interface IUserState {
 user: IUser;
 songs: any;
 playlists: any;
}

function LoginPage() {
 const [uName, setUName] = useState("");
 const [password, setPassword] = useState("");
 const dispatch = useDispatch();

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const res = await ApiCall.getNoAuth(ENDPOINTS.USER.WHO_AM_I(uName), null);

  const user: IUser = {
   email: "test",
   name: res.data.result.userName,
   id: res.data.result.userId,
  };

  const userState: IUserState = {
   user: user,
   playlists: res.data.result.playlists,
   songs: "s",
  };

  dispatch(UserActions.setUser(userState));
 };

 return (
  <form className={classes.main} onSubmit={handleLogin}>
   <h1>Login</h1>
   <div>
    <input
     type="text"
     value={uName}
     onChange={(e) => setUName(e.target.value)}
     placeholder="Username"
    />
    <input
     type="password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     placeholder="Password"
    />
   </div>
   <div>
    <button type="submit">Login</button>
   </div>
  </form>
 );
}

export default LoginPage;
