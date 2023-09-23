"use client";
import React, { useState } from "react";
import languages from "../Services/languages.json";

const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredLanguages = Object.entries(languages).filter(([key, value]) =>
    value.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search language..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {filteredLanguages.map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <div>Selected language: {selectedLanguage}</div>
    </div>
  );
};

export default LanguageSelect;
