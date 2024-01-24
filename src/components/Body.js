// import React, { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import Login from "./Login";
// import Browse from "./Browse";
// import { createBrowserRouter } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
// import { auth } from "../utils/firebase";
// import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "../utils/userSlice";

// const Body = () => {
//   const dispatch = useDispatch();

//   const appRouter = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />,
//     },
//     {
//       path: "/browse",
//       element: <Browse />,
//     },
//   ]);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const { uid, email, displayName, photoURL } = user;
//         dispatch(
//           addUser({
//             uid: uid,
//             email: email,
//             displayName: displayName,
//             photoURL: photoURL,
//           })
//         );
//       } else {
//         dispatch(removeUser());
//       }
//     });
//   }, []);
//   return (
//     <div>
//       <RouterProvider router={appRouter} />
//     </div>
//   );
// };

// export default Body;

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    const handleAuthChange = (user) => {
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
      } else {
        dispatch(removeUser());
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    return () => {
      // Cleanup: unsubscribe from the auth state changes when the component unmounts
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
