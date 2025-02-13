import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Nav/Navbar";
import NotePreview from "../components/Notes/NotePreview";
import AddNoteBtn from "../components/Notes/AddNoteBtn";
import NoteForm from "../components/Notes/NoteForm";
import { GlobalContext } from "../App";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [noteFormOpen, setNoteFormOpen] = useState(false);
  const [noteEdit, setNoteEdit] = useState(false);
  const { notesList, setNotesList, setUser } = useContext(GlobalContext);
  const { currNote, setCurrNote } = useContext(GlobalContext);

  const navigate = useNavigate();

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
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes/");
      if (response.data && response.data.notes) {
        setNotesList(response.data.notes);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  useEffect(() => {
    if (noteEdit) {
      setNoteFormOpen(true);
    }
  }, [noteEdit]);

  return (
    <div className="w-full h-full min-h-screen flex flex-col ">
      <Navbar dashboard={true} />
      <div className="notesContainer w-full flex flex-wrap gap-4 p-4">
        {notesList && notesList.length > 0 ? (
          notesList.map((note) => (
            <NotePreview
              noteInfo={note}
              key={note.id}
              setNoteEdit={setNoteEdit}
              noteEdit={noteEdit}
            />
          ))
        ) : (
          <div>No notes. Add one now!</div>
        )}
      </div>
      {noteFormOpen && (
        <NoteForm
          formOpen={noteFormOpen}
          setFormOpen={setNoteFormOpen}
          notesList={notesList}
          setNotesList={setNotesList}
          noteEdit={noteEdit}
          setNoteEdit={setNoteEdit}
        />
      )}
      <AddNoteBtn formOpen={noteFormOpen} setFormOpen={setNoteFormOpen} />
    </div>
  );
};

export default Dashboard;
