import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Calltoaction from "./Calltoaction";

const Navbar = () => {
  return (
    <div className="bg-white sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center max-w-screen-xl flex-wrap mx-auto p-3">
        <Logo />
        <Menu />
        <Calltoaction />
      </div>
    </div>
  );
};

export default Navbar;
