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

 const login = async () => {
  const res = await ApiCall.getNoAuth(ENDPOINTS.USER.WHO_AM_I(uName), null);

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
  console.log("USERSTATE", userState);

  console.log("RES.DATA.RESULT.SONGLIKES", res.data.result.songLikes);
  dispatch(UserActions.setUser(userState));
  COOKIE.setCookie("username", user.name);
  COOKIE.setCookie("userId", user.id);
  router.navigate("/music");
 };

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  login();
 };

 if (username) {
  setUName(username);
  login();
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
