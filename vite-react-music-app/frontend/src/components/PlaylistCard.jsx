import React, { useState, useEffect } from "react";

const images = [
  "/cards/bgDanhDoi.png",
  "/cards/hieuthuhai.png",
  "/cards/voicenote.jpg",
];

export default function PlaylistCard({ isMenuOpen }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImage(currentImage);
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div
      className={`relative w-4/5 h-48 mx-auto bg-gray-700 rounded-lg p-6 mb-4 hidden md:block overflow-visible
  ${isMenuOpen ? "" : "ml-0"} `}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>

      {/* Ảnh cũ (fade out) */}
      <img
        src={images[prevImage]}
        alt="Previous Background"
        className="absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500"
        style={{ opacity: 0, animation: "fadeOut 1s ease-in-out" }}
      />

      {/* Ảnh mới (fade in) */}
      <img
        key={currentImage}
        src={images[currentImage]}
        alt="Playlist Background"
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
        style={{ animation: "fadeIn 1s ease-in-out" }}
      />

      {/* Ảnh nhân vật chỉ hiển thị khi là bgDanhDoi */}
      {images[currentImage] === "/cards/bgDanhDoi.png" && (
        <img
          src="/cards/obito.png"
          alt="Character"
          className="absolute -top-20 right-2 w-[40%] h-auto object-contain scale-115"
          style={{ animation: "fadeIn 1s ease-in-out" }}
        />
      )}
    </div>
  );
}
