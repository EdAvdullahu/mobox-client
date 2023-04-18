import { createBrowserRouter } from "react-router-dom";
import BasePage from "../Pages/Base/BasePage";
import SongBasePage from "../Pages/Base/SongBase/SongBasePage";
import PodcastBasePage from "../Pages/Base/PodcastBase/PodcastBasePage";
import Explore from "../Pages/Song/Explore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    children: [
      {
        path: "/music",
        element: <SongBasePage />,
        children: [{ index: true, element: <Explore /> }],
      },
      { path: "/podcast", element: <PodcastBasePage /> },
    ],
  },
]);
export default router;
