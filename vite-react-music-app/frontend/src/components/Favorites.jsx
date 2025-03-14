import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Favorites({ isMenuOpen, setCurrentSong, setPlaylist }) {
  const [favorites, setFavorites] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const menuRefs = useRef({});

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/favorites/1"
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách yêu thích:", error);
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedInside = false;
      Object.values(menuRefs.current).forEach((menu) => {
        if (menu && menu.contains(event.target)) {
          clickedInside = true;
        }
      });
      if (!clickedInside) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const removeFromFavorites = async (songId) => {
    try {
      await axios.post("http://localhost:5000/api/favorites/remove", {
        user_id: 1,
        song_id: songId,
      });
      setFavorites(favorites.filter((song) => song.id !== songId));
      alert("❌ Removed from Favorites!");
    } catch (error) {
      console.error("Lỗi khi xóa khỏi yêu thích:", error);
    }
  };

  const downloadSong = (fileUrl) => {
    const url = `http://localhost:5000${fileUrl}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`flex flex-col h-full p-10 pb-15 bg-gray-900 ${
        isMenuOpen ? "" : "pl-0 pr-20"
      }`}
    >
      <h1 className="text-2xl font-bold text-white mb-4">Favorite Songs</h1>

      <div className="overflow-y-auto h-[80vh] no-scrollbar">
        {favorites.map((song) => (
          <div
            key={song.id}
            className="relative bg-gray-800 p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between hover:bg-gray-700 transition-all cursor-pointer active:bg-gray-600"
            onClick={() => {
              setOpenMenu(null);
              setPlaylist(favorites);
              setCurrentSong(song);
            }}
          >
            {/* Ảnh bài hát */}
            <div className="flex items-center gap-4">
              <img
                src={song.image_url || "/default_music.jpg"}
                alt={song.title}
                className="w-16 h-16 rounded-md object-cover"
              />

              {/* Thông tin bài hát */}
              <div>
                <h2 className="text-white text-lg font-semibold">
                  {song.title}
                </h2>
                <p className="text-gray-400">
                  {song.artist || "Unknown Artist"}
                </p>
              </div>
            </div>

            {/* Icon 3 chấm mở menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu(openMenu === song.id ? null : song.id);
                }}
                className="text-gray-400 hover:text-white text-xl cursor-pointer p-3 rounded-full hover:bg-gray-700"
              >
                <BsThreeDotsVertical />
              </button>

              {/* Menu tùy chọn */}
              {openMenu === song.id && (
                <div
                  ref={(el) => (menuRefs.current[song.id] = el)}
                  className="absolute right-0 top-10 bg-gray-800 shadow-lg rounded-lg py-2 w-40 z-50"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(song.id);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 cursor-pointer"
                  >
                    ❌ Remove from Favorite
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadSong(song.file_url);
                    }}
                    className="block w-full text-left px-4 py-2 text-blue-400 hover:bg-gray-700 cursor-pointer"
                  >
                    ⬇️ Download
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
