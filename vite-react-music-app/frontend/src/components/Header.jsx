import React from "react";

export default function Header({ isMenuOpen }) {
  return (
    <div className={`flex justify-between items-center mb-9`}>
      <input
        type="text"
        placeholder="Search songs and artists..."
        className={`w-4/5 mx-auto p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 
             border border-gray-700 focus:border-[#00FFFF] outline-none transition ${
               isMenuOpen ? "" : "ml-0"
             }`}
      />
    </div>
  );
}
