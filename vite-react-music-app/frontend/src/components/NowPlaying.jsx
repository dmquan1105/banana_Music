import React from "react";
import "./css/nowPlaying.css";

export default function NowPlaying({ isPlaying, currentSong }) {
  return (
    <div className="w-72 bg-gray-800 p-4 border-l-1 border-[#00FFFF] hidden md:block text-center">
      <h3 className="text-lg font-bold">Now Playing</h3>
      <p className="text-gray-400">
        {currentSong.title} - {currentSong.artist}
      </p>
      <div className="cd">
        <div
          className={`cd-thumb ${isPlaying ? "playing" : ""}`}
          style={{
            backgroundImage: `url(${
              currentSong.image_url || "default_music.jpg"
            })`,
          }}
        ></div>
      </div>
      <div className="text-lg mt-10">Enjoy the music 🎧</div>
    </div>
  );
}
