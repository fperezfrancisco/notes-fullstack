import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const NoteEditDeleteBoxPreview = ({ setNoteDeleted, setNoteEdit }) => {
  const handleDeleteNote = () => {
    setNoteDeleted(true);
  };

  const handleEditNote = () => {
    setNoteEdit(true);
  };

  return (
    <div className="absolute bottom-1 right-2 flex items-center justify-end gap-3 text-lg">
      <FaEdit
        className="cursor-pointer hover:text-blue-500"
        onClick={handleEditNote}
      />
      <FaTrash
        className="cursor-pointer hover:text-blue-500"
        onClick={handleDeleteNote}
      />
    </div>
  );
};

export default NoteEditDeleteBoxPreview;
