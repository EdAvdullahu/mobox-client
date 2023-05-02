import { createBrowserRouter } from "react-router-dom";
import BasePage from "../Pages/Base/BasePage";
import SongBasePage from "../Pages/Song/Base/SongBasePage";
import PodcastBasePage from "../Pages/Base/PodcastBase/PodcastBasePage";
import Explore from "../Pages/Song/Explore";
import SearchBasePage from "../Pages/Base/SearchBase/SearchBase";
import UserBasePage from "../Pages/Auth/Base/BasePage";
import LoginPage from "../Pages/Auth/Login/LoginPage";
import Playlist from "../Pages/Song/Playlist/Playlist";
import LikedSong from "../Pages/Song/Library/Liked/LikedSong";
import LibraryBase from "../Pages/Song/Library/LibraryBase";

const router = createBrowserRouter([
 {
  path: "",
  element: <BasePage />,
  children: [
   {
    index: false,
    path: "/user",
    element: <UserBasePage />,
    children: [{ path: "/user/login", element: <LoginPage></LoginPage> }],
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
    ],
   },
   { path: "/podcast", element: <PodcastBasePage /> },
   { path: "/search", element: <SearchBasePage /> },
  ],
 },
]);
export default router;
