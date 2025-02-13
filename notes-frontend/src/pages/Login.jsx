import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import { auth } from "../firebase/init";
import { signInWithEmailAndPassword } from "firebase/auth";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const { setUser, user, setSignedIn } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (userEmail && userPassword) {
      //signIn(userEmail, userPassword);

      //login API Call

      try {
        const response = await axiosInstance.post("/login", {
          email: userEmail,
          password: userPassword,
        });

        if (response.data && response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
          setSignedIn(true);
          navigate("/dashboard");
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  };

  const signIn = (email, password) => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setUser(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          if (error.message === "Firebase: Error (auth/invalid-credential).") {
            alert("Invalid password & email combination");
          }
        });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className="w-full h-full min-h-screen flex flex-col ">
      <Navbar dashboard={false} />
      <div className="w-full flex flex-col items-center p-4 py-10">
        <form
          className="w-full max-w-[600px] border-2 border-neutral-200 p-4 flex flex-col"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <h1 className="text-xl font-semibold">Log in</h1>
          <ul className="w-full flex flex-col items-start gap-4 my-6">
            <li className="flex flex-col gap-2 w-full">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="px-4 py-2 border-2 border-neutral-200 w-full"
                required
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </li>
            <li className="flex flex-col gap-2 w-full">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="px-4 py-2 border-2 border-neutral-200 w-full"
                required
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </li>
          </ul>
          <p className="text-sm text-neutral-700">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="underline cursor-pointer hover:text-blue-500"
            >
              Create one
            </Link>{" "}
          </p>
          <button
            type="submit"
            className="my-8 w-full px-6 py-4 bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-semibold"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
