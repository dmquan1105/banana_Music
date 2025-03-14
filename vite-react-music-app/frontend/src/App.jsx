import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import NowPlaying from "./components/NowPlaying";
import MusicPlayer from "./components/MusicPlayer";
import Home from "./components/Home";
import Songs from "./components/Songs";
import Favorites from "./components/Favorites";
import Upload from "./components/Upload";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState({
    title: "",
    artist: "",
    image_url: "default_music.jpg",
    file_url: "default.mp3",
  });

  return (
    <Router>
      <div className="h-screen">
        {isLoggedIn ? (
          <div className="flex h-full bg-gray-900 text-white">
            {/* Sidebar */}
            <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4">
              <Routes>
                <Route path="/" element={<Home isMenuOpen={isMenuOpen} />} />
                <Route
                  path="/songs"
                  element={
                    <Songs
                      isMenuOpen={isMenuOpen}
                      setCurrentSong={setCurrentSong}
                      setPlaylist={setPlaylist}
                    />
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <Favorites
                      isMenuOpen={isMenuOpen}
                      setCurrentSong={setCurrentSong}
                      setPlaylist={setPlaylist}
                    />
                  }
                />
                <Route
                  path="/upload"
                  element={<Upload isMenuOpen={isMenuOpen} />}
                />
              </Routes>
            </div>

            {/* Now Playing Panel */}
            <NowPlaying isPlaying={isPlaying} currentSong={currentSong} />

            {/* Music Player */}
            <MusicPlayer
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              playlist={playlist}
            />
          </div>
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </Router>
  );
}
