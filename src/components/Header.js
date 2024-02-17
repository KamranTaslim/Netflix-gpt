import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

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
  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-10 px-6 py-2  from-black">
      <img className="w-52" src={LOGO} alt="netflix logo" />
      {user && (
        <div className="flex">
          <div className="relative group">
            <img src={user?.photoURL} className="w-12 h-12 mx-5 rounded-full" />
            <div className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded-md top-full left-1/2 transform -translate-x-1/2">
              {user?.displayName}
            </div>
          </div>
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
