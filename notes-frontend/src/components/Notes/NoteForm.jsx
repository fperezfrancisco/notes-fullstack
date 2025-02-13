import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GlobalContext } from "../../App";
import { auth, db } from "../../firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  where,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import axiosInstance from "../../utils/axiosInstance";

const NoteForm = ({
  formOpen,
  setFormOpen,
  notesList,
  setNotesList,
  noteEdit,
  setNoteEdit,
}) => {
  const [newNote, setNewNote] = useState();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDate, setNoteDate] = useState("12 Jan 2025");
  const [noteContent, setNoteContent] = useState("");
  const [noteTagList, setNoteTagList] = useState([]);
  const [noteTag, setNoteTag] = useState();
  const { currNote, setCurrNote, user } = useContext(GlobalContext);

  const handleCloseForm = () => {
    if (noteEdit) {
      setNoteEdit(false);
    }
    setFormOpen(false);
  };

  const handleTagAdding = () => {
    if (noteTag) {
      setNoteTagList([...noteTagList, noteTag]);
    }
  };

  const handleTagDelete = (tag) => {
    const newTagList = noteTagList.filter((noteTag) => noteTag !== tag);
    setNoteTagList(newTagList);
  };

  const updateUserNoteList = async (note) => {
    const userCollectionRef = await query(
      collection(db, "users"),
      where("uid", "==", user.uid)
    );
    await updateDoc(userCollectionRef, [...notesList, note]);
  };

  const addNoteDb = (note) => {
    const noteObj = {
      authorId: user.uid,
      authorEmail: user.email,
      date: note.date,
      title: note.title,
      content: note.content,
      tags: note.tags,
    };
    addDoc(collection(db, "notes"), noteObj);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(noteTitle);
    console.log(noteDate);
    console.log(noteContent);
    console.log(noteTagList);

    if (noteEdit && currNote) {
      const newList = notesList.map((note) => {
        if (note._id === currNote._id) {
          return {
            ...note,
            title: noteTitle,
            content: noteContent,
            tags: noteTagList,
          };
        } else {
          return note;
        }
      });
      setNotesList(newList);
      // edit note api
      try {
        const response = await axiosInstance.put(`/edit-note/${currNote._id}`, {
          title: noteTitle,
          content: noteContent,
          tags: noteTagList,
        });
        if (response.data && response.data.note) {
          console.log(response.data.note);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }

      setNoteEdit(false);
      setFormOpen(false);
    } else {
      //create this new note and add it to dashboard
      const newNote = {
        title: noteTitle,
        content: noteContent,
        tags: noteTagList,
      };
      //setNotesList([...notesList, newNote]);
      //updateUserNoteList(newNote);
      //addNoteDb(newNote);
      try {
        const response = await axiosInstance.post("/add-note", newNote);
        if (response.data && response.data.note) {
          console.log(response.data.note);
          setNotesList([...notesList, response.data.note]);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
      setFormOpen(false);
    }
  };

  useEffect(() => {
    if (noteEdit && currNote) {
      setNoteTitle(currNote.title);
      setNoteDate(currNote.date);
      setNoteContent(currNote.content);
      setNoteTagList(currNote.tags);
    }
  }, [currNote]);

  return (
    <div className="w-full h-fit max-w-[800px] shadow-2xl absolute m-auto top-0 bottom-0 right-0 left-0 bg-white p-4 py-8">
      <h2 className="font-semibold text-2xl mb-4">
        {noteEdit ? "Update Note" : "New Note"}
      </h2>
      <form action="" onSubmit={(e) => handleFormSubmit(e)}>
        <ul className="flex flex-col gap-3">
          <li className="flex flex-col items-start">
            <label htmlFor="">Note Title</label>
            <input
              type="text"
              className="p-2 border-neutral-200 border-2 w-full"
              onChange={(e) => setNoteTitle(e.target.value)}
              value={noteTitle}
            />
          </li>
          <li className="flex flex-col items-start">
            <label htmlFor="">Content</label>
            <textarea
              type="text"
              rows={8}
              value={noteContent}
              className="p-3 border-neutral-200 border-2 w-full"
              onChange={(e) => setNoteContent(e.target.value)}
            />
          </li>
          <li className="flex flex-col items-start">
            <label htmlFor="">Tags</label>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                className="p-3 h-fit border-neutral-200 border-2 w-full max-w-[250px]"
                onChange={(e) => setNoteTag(e.target.value)}
              />
              <button
                type="button"
                className="border-2 p-3 h-fit w-[200px] border-neutral-300 hover:bg-neutral-300 cursor-pointer"
                onClick={() => handleTagAdding()}
              >
                Add Tag
              </button>
              <div className="ml-4 flex flex-wrap items-center gap-2">
                {noteTagList &&
                  noteTagList.map((tag) => (
                    <span className="text-sm px-4 py-2 bg-neutral-400 text-white flex flex-col relative">
                      <span
                        className="text-white font-bold absolute top-[1px] right-[4px] cursor-pointer hover:text-red-500"
                        onClick={() => handleTagDelete(tag)}
                      >
                        x
                      </span>
                      <span>#{tag}</span>
                    </span>
                  ))}
              </div>
            </div>
          </li>
        </ul>
        <button className="p-4 bg-blue-500 w-full my-4 text-white cursor-pointer hover:bg-blue-700">
          {noteEdit ? "Update Note" : "Add This Note"}
        </button>
      </form>
      <IoMdClose
        onClick={handleCloseForm}
        className="text-2xl absolute top-4 right-4 cursor-pointer hover:text-blue-500"
      />
    </div>
  );
};

export default NoteForm;
