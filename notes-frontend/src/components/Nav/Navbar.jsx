import React, { useState } from "react";
import Searchbar from "./Searchbar";
import UserInfoBox from "./UserInfoBox";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";

const Navbar = ({ dashboard }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  return (
    <header className="w-full p-4 max-w-[2000px] border-b-2 border-neutral-300 flex flex-row items-center justify-between gap-4-">
      <span
        className="mr-2 py-2 font-semibold leading-4 cursor-pointer hover:font-bold"
        onClick={() => navigate("/dashboard")}
      >
        Notes App
      </span>
      {dashboard && <Searchbar />}
      {dashboard && (
        <UserInfoBox menuOpen={openMenu} setMenuOpen={setOpenMenu} />
      )}
      {dashboard && (
        <MobileMenu menuOpen={openMenu} setMenuOpen={setOpenMenu} />
      )}
    </header>
  );
};

export default Navbar;
