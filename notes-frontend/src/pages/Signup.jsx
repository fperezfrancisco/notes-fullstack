import React, { useContext, useState } from "react";
import Navbar from "../components/Nav/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import { auth, db } from "../firebase/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const { setUser, setSignedIn } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (userName && userEmail && userPassword) {
      const newUser = {
        name: userName,
        email: userEmail,
        password: userPassword,
      };
      //signUpWithEmail(newUser);
      try {
        const response = await axiosInstance.post("/create-account", {
          fullName: userName,
          email: userEmail,
          password: userPassword,
        });

        if (response.data && response.data.error) {
          alert(response.data.error);
          return;
        }

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

  const createUserDb = (name, user) => {
    const userObj = {
      name: name,
      email: user.email,
      uid: user.uid,
      notesList: [],
    };
    addDoc(collection(db, "users"), userObj);
  };

  const signUpWithEmail = (user) => {
    const name = user.name;
    if (user && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          //upload to database
          createUserDb(name, user);
          //upload to database
          setUser(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col ">
      <Navbar dashboard={false} />
      <div className="w-full flex flex-col items-center p-4 py-10">
        <form
          className="w-full max-w-[600px] border-2 border-neutral-200 p-4 flex flex-col"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <h1 className="text-xl font-semibold">Create an account</h1>
          <ul className="w-full flex flex-col items-start gap-4 my-6">
            <li className="flex flex-col gap-2 w-full">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="px-4 py-2 border-2 border-neutral-200 w-full"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </li>
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
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="underline cursor-pointer hover:text-blue-500"
            >
              Log in
            </Link>{" "}
          </p>
          <button
            type="submit"
            className="my-8 w-full px-6 py-4 bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-semibold"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
