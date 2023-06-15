import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./LoginPage.module.css";
import ApiCall from "../../../Common/Api/ApiCall";
import ENDPOINTS from "../../../Common/Api/ENDPOINTS";
import { UserActions } from "../../../Store/UserStore/user_reducer";
import { IPlaylist } from "../../../Pages/Song/types/IPlaylist";
import COOKIE from "../../../Common/Services/cookie.service";
import router from "../../../Router/router";

interface IUser {
 email: string;
 name: string;
 id: string;
}

interface IUserState {
 user: IUser | null;
 likedSongs: any;
 playlists: any;
}

const formatLikedSongs = (likedSongs: any) =>
 likedSongs.map((like: any) => ({
  songId: like.song.songId,
  name: like.song.name,
  releaseDate: like.song.releaseDate,
  length: like.song.length,
  path: like.song.path,
  imageUrl: like.song.imageUrl,
  isExplicit: like.song.isExplicite,
  hasFeatures: like.song.hasFeatures,
  releaseId: like.song.releaseId,
  likeDateTime: like.likeDateTime,
  release: {
   releaseId: like.song.release.releaseId,
   title: like.song.release.title,
  },
  features: like.song.features.map((feature: any) => ({
   artistId: feature.artist.artistId,
   name: feature.artist.name,
  })),
  genres: like.song.genres.map((genre: any) => ({
   genreId: genre.genre.genreId,
   name: genre.genre.name,
   description: genre.genre.description,
  })),
  isLiked: true,
  likedId: like.id,
 }));

function LoginPage() {
 const [uName, setUName] = useState("");
 const [password, setPassword] = useState("");
 const dispatch = useDispatch();
 const username = COOKIE.getCookie("username");
 const UT = COOKIE.getCookie("userToken");
 const user = {
  userName: uName,
  password: password,
 };
 const url = COOKIE.getCookie("desiredLocation")?.replace("%2F", "/");
 const Login = async () => {
  const res = await ApiCall.post(ENDPOINTS.USER.LOGIN(), user);
  if (res.data.isSuccess) {
   COOKIE.setCookie("userToken", res.data.result.token);
   COOKIE.setCookie("refreshToken", res.data.result.refreshToken);
   COOKIE.setCookie("role", res.data.result.role);
   COOKIE.setCookie("uid", res.data.result.id);
   login(res.data.result.token);
  }
 };
 const login = async (uToken: string) => {
  const res = await ApiCall.login(ENDPOINTS.USER.WHO_AM_I(uName), uToken);
  const user: IUser = {
   email: "test",
   name: res.data.result.userName,
   id: res.data.result.userId,
  };
  const playlist: IPlaylist = {
   playlistId: "",
   isPublic: false,
   title: "Liked Songs",
   ownerId: 0,
   description: "A list of liked songs",
   songs: formatLikedSongs(res.data.result.songLikes),
  };
  const userState: IUserState = {
   user,
   likedSongs: playlist,
   playlists: res.data.result.playlists,
  };
  dispatch(UserActions.setUser(userState));
  COOKIE.setCookie("username", user.name);
  COOKIE.setCookie("userId", user.id);
  if (url?.includes("login") || url?.includes("sign-in")) {
   const Irole = COOKIE.getCookie("role");
   if (Irole == "Artist") {
    router.navigate("/admin/artist/statistics/artist");
   } else if (Irole == "Admin") {
    router.navigate("/music");
   } else {
    router.navigate("/music");
   }
  } else if (url) {
   router.navigate(url);
  }
 };

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  Login();
 };

 if (username && UT) {
  setUName(username);
  login(UT);
 }

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
