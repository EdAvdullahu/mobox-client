import { createBrowserRouter } from "react-router-dom";
import BasePage from "../Pages/Base/BasePage";
import SongBasePage from "../Pages/Song/Base/SongBasePage";
import PodcastBasePage from "../Pages/Base/PodcastBase/PodcastBasePage";
import Explore from "../Pages/Song/Explore";
import UserBasePage from "../Pages/Auth/Base/BasePage";
import LoginPage from "../Pages/Auth/Login/LoginPage";
import Playlist from "../Pages/Song/Playlist/Playlist";
import LikedSong from "../Pages/Song/Library/Liked/LikedSong";
import LibraryBase from "../Pages/Song/Library/LibraryBase";
import Artist from "../Pages/Song/Artist/Artist";
import ArtistInfo from "../Pages/Song/Artist/BasicInfo/ArtistInfo";
import AllArtistInfo from "../Pages/Song/Artist/AllInfo/AllArtistInfo";
import ReleaseBase from "../Pages/Song/Release/Release";
import Search from "../Pages/Song/Search/Search";
import VerifyEmail from "../Pages/Auth/Verify/VeriyEmail";

const router = createBrowserRouter([
 {
  path: "",
  element: <BasePage />,
  children: [
   {
    index: false,
    path: "/user",
    element: <UserBasePage />,
    children: [
     { path: "/user/login", element: <LoginPage></LoginPage> },
     { path: "/user/verify/:token", element: <VerifyEmail /> },
    ],
   },
   {
    index: false,
    path: "/music",
    element: <SongBasePage />,
    children: [
     { index: true, element: <Explore /> },
     { path: "/music/playlist/:playlistId", element: <Playlist /> },
     {
      path: "/music/library",
      element: <LibraryBase />,
      children: [{ path: "/music/library/liked", element: <LikedSong /> }],
     },
     {
      path: "/music/artist/:artistId",
      element: <Artist />,
      children: [
       { index: true, element: <ArtistInfo /> },
       { path: "/music/artist/:artistId/view-all", element: <AllArtistInfo /> },
      ],
     },
     {
      path: "/music/release/:releaseId",
      element: <ReleaseBase />,
     },
     { path: "/music/search", element: <Search /> },
    ],
   },
   { path: "/podcast", element: <PodcastBasePage /> },
  ],
 },
]);
export default router;
