import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Calltoaction from "./Calltoaction";

const Navbar = () => {
  return (
    <div className="bg-white py-1">
      <div className="flex justify-between items-center max-w-screen-xl flex-wrap mx-auto p-4">
        <Logo />
        <Menu />
        <Calltoaction />
      </div>
    </div>
  );
};

export default Navbar;
