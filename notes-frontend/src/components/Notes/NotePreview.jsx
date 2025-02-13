import React, { useContext, useEffect, useState } from "react";
import NoteTagBoxPreview from "./NoteTagBoxPreview";
import NoteEditDeleteBoxPreview from "./NoteEditDeleteBoxPreview";
import { GlobalContext } from "../../App";
import axiosInstance from "../../utils/axiosInstance";

const NotePreview = ({ noteInfo, setNoteEdit, noteEdit }) => {
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [noteChanged, setNoteChanged] = useState(false);
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const { notesList, setNotesList, currNote, setCurrNote } =
    useContext(GlobalContext);

  const deleteNoteApiCall = async () => {
    try {
      const response = await axiosInstance.delete(
        `/delete-note/${noteInfo._id}`
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    if (noteInfo && noteInfo.createdOn) {
      const date = new Date(noteInfo.createdOn);
      setMonth(date.getMonth() + 1);
      setDay(date.getDate());
      setYear(date.getFullYear());
    }
  }, []);

  useEffect(() => {
    //identify which note this is and delete it from notes list
    if (noteDeleted) {
      const updatedList = notesList.filter((note) => note._id !== noteInfo._id);
      deleteNoteApiCall();
      console.log(updatedList);
      setNotesList(updatedList);
      setNoteDeleted(false);
    }
  }, [noteDeleted]);

  useEffect(() => {
    if (noteChanged) {
      setCurrNote(noteInfo);
      setNoteEdit(true);
      setNoteChanged(false);
    }
  }, [noteChanged]);

  return (
    <div className="w-full  max-w-[400px] p-2 h-[150px] border-2 border-neutral-200 flex flex-col gap-[5px] relative">
      <h2 className="font-semibold">{noteInfo.title}</h2>
      <p className="text-sm text-neutral-400">{`${month}/${day}/${year}`}</p>
      <p className="text-sm truncate text-neutral-400">{noteInfo.content}</p>
      <NoteTagBoxPreview tagList={noteInfo.tags} />
      <NoteEditDeleteBoxPreview
        setNoteDeleted={setNoteDeleted}
        setNoteEdit={setNoteChanged}
      />
    </div>
  );
};

export default NotePreview;
