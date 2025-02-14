import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth, db } from "./firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";

export const GlobalContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [currNote, setCurrNote] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const sampleList = [
    {
      id: 1,
      date: "12 Jan 2025",
      title: "Improve Organization",
      content:
        "I want to improve my organization and cleaniness. I will start with my room and then my car.",
      tags: ["#clean", "#organization"],
    },
    {
      id: 2,
      date: "14 Jan 2025",
      title: "Read More",
      content:
        "I need to read more books. That is my goal for the new year and I will check in every time I can.",
      tags: ["#books", "#read"],
    },
  ];

  async function getUserByUid(uid) {
    const userCollectionRef = await query(
      collection(db, "users"),
      where("uid", "==", uid)
    );
    const data = await getDocs(userCollectionRef);
    const user = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(user[0]);
    setNotesList(user[0].notesList);
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        console.log(response.data.user);
        setUser(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    /*
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });*/
  }, []);

  return (
    <>
      <GlobalContext.Provider
        value={{
          notesList,
          setNotesList,
          currNote,
          setCurrNote,
          user,
          setUser,
          signedIn,
          setSignedIn,
          isSearching,
          setIsSearching,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/signup" index element={<Signup />} />
            <Route index path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
