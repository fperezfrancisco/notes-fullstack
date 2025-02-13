import React, { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { GlobalContext } from "../../App";
import { auth } from "../../firebase/init";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const UserInfoBox = ({ menuOpen, setMenuOpen }) => {
  const { user, setUser, setSignedIn } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    //signOut(auth);
    setUser(null);
    setSignedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-fit ml-2">
      <div className="hidden lg:flex gap-2">
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
      <IoMenu
        onClick={() => setMenuOpen(true)}
        className="flex lg:hidden text-3xl cursor-pointer hover:text-blue-500"
      />
    </div>
  );
};

export default UserInfoBox;
