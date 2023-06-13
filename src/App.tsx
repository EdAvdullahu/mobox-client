import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/UserStore/user_state";
import COOKIE from "./Common/Services/cookie.service";
import ApiCall from "./Common/Api/ApiCall";
import ENDPOINTS from "./Common/Api/ENDPOINTS";
import { IPlaylist } from "./Pages/Song/types/IPlaylist";
import { UserActions } from "./Store/UserStore/user_reducer";
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
function App() {
 const user = useSelector((state: RootState) => state.user.user);
 const userI = COOKIE.getCookie("userId");
 const dispatch = useDispatch();
 const username = COOKIE.getCookie("username");
 if (!userI) {
  COOKIE.setCookie("desiredLocation", router.state.location.pathname);
 }
 const login = async (username: string) => {
  const res = await ApiCall.getNoAuth(ENDPOINTS.USER.WHO_AM_I(username), null);

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
 };

 useEffect(() => {
  if (username && !user?.email) {
   login(username);
  }
 }, [userI]);
 useEffect(() => {
  if (!user?.email && !userI) {
   const currentPath = router.state.location.pathname;
   if (!currentPath.includes("verify")) {
    router.navigate("/user/login");
   }
  }
 }, [user]);

 return <RouterProvider router={router}></RouterProvider>;
}

export default App;
