import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-10 px-6 py-2  from-black">
      <img
        className="w-52"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix logo"
      />
      {user && (
        <div className="flex">
          <img src={user?.photoURL} className="w-12 h-12 mx-5 rounded-full" />
          <button
            onClick={handleSignOut}
            className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
