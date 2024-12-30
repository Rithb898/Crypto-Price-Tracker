import React, { useState } from "react";

function ViewToggel({ view, setView }) {
  return (
    <div className="mb-3 grid grid-cols-2 text-xl font-semibold md:mb-7">
      <div
        className={`flex cursor-pointer items-center justify-center border-b-2 ${view === "grid" ? "border-[#3a80e9]" : "border-none"}`}
        onClick={() => setView("grid")}
      >
        Grid
      </div>
      <div
        className={`flex cursor-pointer items-center justify-center border-b-2 ${view === "list" ? "border-[#3a80e9]" : "border-none"} `}
        onClick={() => setView("list")}
      >
        List
      </div>
    </div>
  );
}

export default ViewToggel;
