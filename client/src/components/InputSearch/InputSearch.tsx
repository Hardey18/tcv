import React from "react";

import "./inputsearch.css";

function InputSearch({ handleChange, placeholder, type }) {
  return (
    <input
      className="input-search"
      placeholder={placeholder}
      type={type}
      onChange={handleChange}
    />
  );
}

export default InputSearch;
