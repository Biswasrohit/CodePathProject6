import React from "react";
import "../App.css";

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search characters..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  );
};

export default SearchFilter;
