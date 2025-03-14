import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ isMenuOpen, setIsMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: "home", text: "Home", path: "/" },
    { icon: "songs", text: "Songs", path: "/songs" },
    { icon: "playlists", text: "Favorite", path: "/favorites" },
    { icon: "upload", text: "Upload", path: "/upload" },
  ];

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-full border border-white hover:border-[#00FFFF] hover:cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img src="/icons/menu.png" alt="Menu" className="w-6 h-6 invert" />
      </button>

      {/* Sidebar chính */}
      <div
        className={`top-0 left-0 h-full bg-gray-800 p-6 border-r border-[#00FFFF] w-64 transition-transform duration-300 ease-in-out 
        ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-64"
        } md:relative`}
      >
        {/* Logo */}
        <h2 className="flex items-center justify-center space-x-2 scale-125 mb-5">
          <img
            src="/banana_icon.png"
            alt="Banana Icon"
            className="w-[30px] h-[21px] invert brightness-0"
          />
          <span className="text-lg font-bold text-white">Music</span>
        </h2>

        {/* Danh sách menu */}
        <ul className="text-center">
          <li className="border-b-2 border-[#00FFFF] pb-2"></li>

          {menuItems.map((item, index) => (
            <div
              key={index}
              className="group hover:scale-110 transition duration-300 ease-in-out"
              onClick={() => navigate(item.path)}
            >
              <li className="flex items-center space-x-3 text-gray-400 hover:text-white active:scale-90 cursor-pointer transition duration-300 ease-in-out py-2 border-b border-gray-600 group-hover:border-[#00FFFF] px-4">
                <img
                  src={`/icons/${item.icon}.png`}
                  alt={item.text}
                  className="w-5 h-5 invert"
                />
                <span className="">{item.text}</span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
