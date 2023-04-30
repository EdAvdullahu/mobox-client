import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import { useSelector } from "react-redux";
import { RootState } from "./Store/UserStore/user_state";

function App() {
 const user = useSelector((state: RootState) => state.user.user);

 useEffect(() => {
  if (!user?.email) {
   router.navigate("/user/login");
  } else {
   router.navigate("/music");
  }
 }, [user]);

 return <RouterProvider router={router}></RouterProvider>;
}

export default App;
