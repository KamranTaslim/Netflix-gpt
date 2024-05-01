import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import SearchIcon from "@mui/icons-material/Search";
import { toggleGptSearchView } from "../utils/gptSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when component unmount
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-10 px-6 py-2 from-black">
      <img className="w-36 md:w-52" src={LOGO} alt="netflix logo" />
      {user && (
        <div className="flex items-center ml-auto">
          {/* Search Bar */}
          <div className="flex items-center ml-auto">
            {/* Search Bar */}
            <div className="relative mr-4">
              <button
                onClick={handleGptSearchClick}
                className="flex items-center text-white"
              >
                <p className="mr-4">Search Gpt</p>
                <SearchIcon className="text-white mt-2" />
              </button>
            </div>
          </div>

          {/* User Avatar */}
          <div className="relative">
            <img
              src={user?.photoURL}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-4"
              alt="user avatar"
            />
            <div className="absolute bg-gray-800 text-white p-2 rounded-md top-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {user?.displayName}
            </div>
          </div>
          {/* Sign Out Button */}
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
