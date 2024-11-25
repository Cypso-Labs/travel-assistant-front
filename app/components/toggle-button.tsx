"use client";

import React, { useState } from "react";

function ToggleButton({ name }: Readonly<{ name: string }>) {
  const [clicked, setClick] = useState(false);

  return (
    <button
      onClick={() => setClick(!clicked)}
      type="button"
      className={`${
        clicked
          ? "text-white bg-[#63AB45] border-[#63AB45] shadow-custom"
          : "bg-transparent border-black"
      } border font-medium rounded-[10px] text-sm px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
    >
      {name}
    </button>
  );
}

export default ToggleButton;
