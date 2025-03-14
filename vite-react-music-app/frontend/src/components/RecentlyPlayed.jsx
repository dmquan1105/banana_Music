import React, { useState, useEffect } from "react";
import axios from "axios";

// Should be Recently Uploaded
export default function RecentlyPlayed({ isMenuOpen }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/songs")
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách bài hát:", error);
      });
  }, []);

  return (
    <div className={`w-4/5 mx-auto ${isMenuOpen ? "" : "ml-0"}`}>
      <h3 className={`text-lg font-bold mb-2`}>Recently Uploaded</h3>

      <div className="recently-played max-h-60 overflow-y-scroll pb-2 mb-1 pr-2 no-scrollbar">
        {songs.map((song, index) => {
          const uploadedAt = new Date(song.uploaded_at);

          const formattedDate = uploadedAt.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          return (
            <div
              key={index}
              className={`flex justify-between text-gray-400 hover:text-white hover:cursor-pointer py-1 ${
                isMenuOpen ? "" : "ml-0"
              }`}
            >
              <p className="truncate">
                {song.title} - {song.artist}
              </p>
              <p>{formattedDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
