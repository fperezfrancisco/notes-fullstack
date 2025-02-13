import React, { useCallback, useContext } from "react";
import UserInfoBox from "./UserInfoBox";
import { IoMdClose } from "react-icons/io";
import { GlobalContext } from "../../App";
import { auth } from "../../firebase/init";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const { user, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <div
      className={`w-full flex-col max-w-[300px] fixed h-screen p-4 top-0 bottom-0 right-0 z-30 bg-blue-500 py-12 ${
        menuOpen ? "flex lg:hidden" : "hidden"
      } `}
    >
      <div className="flex gap-2">
        <div className="w-[44px] uppercase h-[44px] rounded-full bg-neutral-200 font-semibold flex items-center justify-center">
          {user && user.email[0]}
        </div>
        <div className="flex flex-col items-start w-fit">
          <div className="">{user && user.email}</div>
          <div
            onClick={handleSignOut}
            className="text-sm hover:underline cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
      <IoMdClose
        onClick={() => setMenuOpen(false)}
        className="absolute top-2 right-4 text-3xl text-white cursor-pointer hover:text-black"
      />
    </div>
  );
};

export default MobileMenu;
