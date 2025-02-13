import React from "react";

const AddNoteBtn = ({ formOpen, setFormOpen }) => {
  return (
    <button
      onClick={() => setFormOpen(true)}
      className="bg-blue-500 text-white font-semibold px-8 py-4 w-[300px] fixed z-10 bottom-4 right-4 cursor-pointer hover:bg-blue-700"
    >
      Add Note
    </button>
  );
};

export default AddNoteBtn;
