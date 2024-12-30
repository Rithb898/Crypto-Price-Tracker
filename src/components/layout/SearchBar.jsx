import { Search } from "lucide-react";
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };
  return (
    <label className="input input-bordered mx-5 mb-3 flex items-center gap-4 rounded-lg bg-[#c7c7c7] text-black dark:bg-inherit dark:text-inherit md:mx-96 md:mb-7">
      <Search size={17} />
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={query}
        onChange={handleSearch}
      />
    </label>
  );
}

export default SearchBar;
