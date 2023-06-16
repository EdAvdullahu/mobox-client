import { createBrowserRouter } from "react-router-dom";
import BasePage from "../Pages/Base/BasePage";
import SongBasePage from "../Pages/Song/Base/SongBasePage";
import PodcastBasePage from "../Pages/Base/PodcastBase/PodcastBasePage";
import Explore from "../Pages/Song/Menu/Explore";
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
import AdminBasePage from "../Pages/Admin/Base/AdminBasePage";
import ArtistBasePage from "../Pages/Admin/Artist/Base/ArtistBasePage";
import NewBasePage from "../Pages/Admin/Artist/New/Base/NewBasePage";
import NewRelease from "../Pages/Admin/Artist/New/Release/NewRelease";
import NewLyrics from "../Pages/Admin/Artist/New/Lyrics/NewLyrics";
import StatisticsBase from "../Pages/Admin/Artist/Statistics/Base/StatisticsBase";
import ArtistStatistics from "../Pages/Admin/Artist/Statistics/Artist/ArtistStatistics";
import SongStatistics from "../Pages/Admin/Artist/Statistics/Song/SongsStatistics";
import ReleaseStatistics from "../Pages/Admin/Artist/Statistics/Release/ReleaseStatistics";
import ResetPasswordBase from "../Pages/Auth/ResetPassword/ResetPasswordBase";
import ResetPasswordToken from "../Pages/Auth/ResetPassword/ResetPasswordToken";

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
     { path: "/user/reset-password", element: <ResetPasswordBase /> },
     { path: "/user/reset-password/:token", element: <ResetPasswordToken /> },
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
 {
  path: "/admin",
  element: <AdminBasePage />,
  children: [
   {
    path: "/admin/artist",
    element: <ArtistBasePage />,
    children: [
     {
      path: "/admin/artist/new",
      element: <NewBasePage />,
      children: [
       { path: "/admin/artist/new/release", element: <NewRelease /> },
       { path: "/admin/artist/new/lyrics", element: <NewLyrics /> },
      ],
     },
     {
      path: "/admin/artist/statistics",
      element: <StatisticsBase />,
      children: [
       {
        path: "/admin/artist/statistics/artist",
        element: <ArtistStatistics />,
       },
       { path: "/admin/artist/statistics/songs", element: <SongStatistics /> },
       {
        path: "/admin/artist/statistics/releases",
        element: <ReleaseStatistics />,
       },
      ],
     },
    ],
   },
  ],
 },
]);
export default router;
