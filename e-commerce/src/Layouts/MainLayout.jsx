import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useState } from "react";
import Login from "../Components/Login/Login";

const MainLayout = () => {

  const [showlogin, setshowlogin] = useState(false)

  return (
    <>
      {showlogin ? <Login setshowlogin={setshowlogin} /> : <></>}
      <Navbar setshowlogin={setshowlogin} />
      <Outlet />
    </>
  );
};

export default MainLayout;