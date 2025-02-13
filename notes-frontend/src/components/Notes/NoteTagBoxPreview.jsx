import React from "react";

const NoteTagBoxPreview = ({ tagList }) => {
  return (
    <div className="flex gap-2 w-full overflow-clip">
      {tagList &&
        tagList.map((tag, index) => (
          <span
            key={index}
            className="tags text-[0.75rem] p-1 px-2 bg-neutral-200 font-semibold text-neutral-400"
          >
            #{tag}
          </span>
        ))}
    </div>
  );
};

export default NoteTagBoxPreview;
