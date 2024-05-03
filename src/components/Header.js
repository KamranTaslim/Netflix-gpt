import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";

import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-10 px-6 py-2 from-black">
      <img className="w-36 md:w-52" src={LOGO} alt="netflix logo" />
      {user && (
        <div className="flex items-center ml-auto">
          {/* Search Bar */}
          <div className="flex items-center ml-auto">
            {/* Search Bar */}
            <div className="flex mr-4">
              {showGptSearch && (
                <select
                  className="p-2 m-4 bg-gray-900 text-white"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={handleGptSearchClick}
                className="py-2 px-4 mx-2 my-4 bg-purple-800 text-white rounded-lg"
              >
                {showGptSearch ? "Home Page" : "Gpt Search"}
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
