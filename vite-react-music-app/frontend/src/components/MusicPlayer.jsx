import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import axios from "axios";

export default function MusicPlayer({
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  playlist,
}) {
  const audioRef = useRef(new Audio(currentSong.file_url));

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState("00:00");

  useEffect(() => {
    if (currentSong) {
      if (currentSong.file_url.includes("uploads")) {
        audioRef.current.src = `http://localhost:5000${currentSong.file_url}`;
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [currentSong]);

  const playNext = () => {
    if (!playlist.length) return;
    const currentIndex = playlist.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  };

  const playPrev = () => {
    if (!playlist.length) return;
    const currentIndex = playlist.findIndex(
      (song) => song.id === currentSong.id
    );
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[prevIndex]);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying && audio) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const setAudioData = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const updateTime = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        const remaining = audio.duration - audio.currentTime;
        const minutes = Math.floor(remaining / 60)
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor(remaining % 60)
          .toString()
          .padStart(2, "0");
        setRemainingTime(`${minutes}:${seconds}`);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = async () => {
      if (!playlist.length) return;

      const currentIndex = playlist.findIndex(
        (song) => song.id === currentSong.id
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      const nextSong = playlist[nextIndex];

      if (nextSong) {
        audio.pause();
        audio.currentTime = 0;

        setCurrentSong(nextSong);

        await axios.get(`/api/songs/${nextSong.id}/play-count`);
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, playlist]);

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newProgress = e.target.value;
    setProgress(newProgress);
    audio.currentTime = (newProgress / 100) * duration;
  };

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 flex flex-col">
      <div className="w-full h-[1px] bg-[#00FFFF]"></div>
      <div className="flex items-center justify-center h-15 mr-50">
        {/* Nút điều khiển */}
        <div className="flex items-center space-x-7 mx-auto mr-15">
          <motion.button
            onClick={playPrev}
            whileTap={{ scale: 0.85 }}
            whileHover={{ color: "#9CA3AF" }}
            className="text-white text-xl cursor-pointer"
          >
            <FaStepBackward />
          </motion.button>

          <motion.button
            onClick={togglePlayPause}
            whileTap={{ scale: 0.85 }}
            whileHover={{ color: "#9CA3AF" }}
            className="text-white text-xl cursor-pointer"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </motion.button>

          <motion.button
            onClick={playNext}
            whileTap={{ scale: 0.85 }}
            whileHover={{ color: "#9CA3AF" }}
            className="text-white text-xl cursor-pointer"
          >
            <FaStepForward />
          </motion.button>
        </div>

        {/* Thanh progress */}
        <div className="w-[60%] mx-auto ml-0 mr-10">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer  accent-[#00FFFF]"
            style={{
              background: `linear-gradient(to right, #00b3b3 ${progress}%, #374151 ${progress}%)`,
            }}
          />
        </div>
        {/* Thời gian còn lại */}
        <div className="text-lg text-gray-500 pl-0 mr-10">
          {remainingTime ? remainingTime : "00:00"}
        </div>
      </div>
    </div>
  );
}
