import React, { useContext, useState } from "react";
import { GlobalContext } from "../../App";
import axiosInstance from "../../utils/axiosInstance";

const Searchbar = () => {
  const [searchText, setSearchText] = useState();
  const { setIsSearching, setNotesList } = useContext(GlobalContext);

  const handleSearch = () => {
    setIsSearching(true);
    console.log(searchText);
    onSearchNote(searchText);
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes/", {
        params: { query },
      });
      if (response.data && response.data.matchingNotes) {
        console.log(response.data.matchingNotes);
        setNotesList(response.data.matchingNotes);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-[600px] flex relative">
        <input
          type="text"
          className="w-full p-2 px-4 border-2 border-neutral-200"
          placeholder="Search notes..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="p-2 px-6 h-full bg-blue-500 font-semibold text-white absolute right-0 border-none cursor-pointer hover:bg-blue-800"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Searchbar;
