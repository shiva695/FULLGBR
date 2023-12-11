/* eslint-disable react/prop-types */
import { useState } from "react";

function SearchBar(countries) {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    // eslint-disable-next-line react/prop-types
    // countries.filter((country) => {
    //   return country.match(searchInput);
    // });
  }
  return (
    <div>
      <input
        className="border-black"
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
}

export default SearchBar;
