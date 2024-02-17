import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { USER_AVATAR } from "../utils/constants";
//Firebase Config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [IsSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    //SignIn and Signup Logic

    if (!IsSignInForm) {
      //Signup Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "  " + errorMessage);
          console.log(error);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          console.log(error);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!IsSignInForm);
  };
  return (
    <>
      <Header />
      <div className="w-full h-screen">
        <img
          className="sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="netflix logo"
        />
        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen">
          <div className="fixed w-full px-4 py-24 z-20">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
              <div className="max-w-[320px] mx-auto py-16">
                <h1 className="font-semibold text-4xl py-4 text-white">
                  {IsSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className=" w-full flex flex-col gy-4"
                >
                  {!IsSignInForm && (
                    <input
                      ref={name}
                      type="text"
                      placeholder="name"
                      className="p-3 my-2 bg-gray-700 rounded text-white text-lg"
                      autoComplete="name"
                      required
                    />
                  )}
                  <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="p-3 my-3 bg-gray-700 rounded text-white text-lg"
                    autoComplete="email"
                  />

                  <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-3 my-3 bg-gray-700 rounded text-white text-lg"
                    autoComplete="current-password"
                  />
                  <p className="text-red-600 text-lg font-bold ">
                    {errorMessage}
                  </p>
                  <button
                    className="py-3 my-6 bg-red-600 rounded font-bold text-white cursor-pointer"
                    onClick={handleButtonClick}
                  >
                    {IsSignInForm ? "Sign In" : "Sign Up"}
                  </button>
                  <div className="flex justify-between items-center text-gray-600">
                    <p>
                      <input type="checkbox" className="mr-2 cursor-pointer" />
                      Remember me
                    </p>
                    <p>Need Help ?</p>
                  </div>
                  <p className="my-8 text-gray-600">
                    New to Netflix ?
                    <span
                      onClick={toggleSignInForm}
                      className="text-white mx-2 cursor-pointer"
                    >
                      {IsSignInForm ? "Sign Up Now" : "Sign In Now"}
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
