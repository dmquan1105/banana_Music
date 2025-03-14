import { useState } from "react";
import axios from "axios";

export default function Upload({ isMenuOpen }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title) {
      setMessage("Please choose a file and a title!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("artist", artist);

    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/songs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Success!");
      setFile(null);
      setTitle("");
      setArtist("");
    } catch (error) {
      setMessage("Upload failed: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div
      className={`p-10 w-2xl mx-auto   ${
        isMenuOpen ? "" : "pl-0 ml-0"
      } bg-gray-900 text-white h-full`}
    >
      <h1 className="text-3xl font-bold mb-6">🎵 Upload</h1>

      <div className="space-y-4">
        {/* Input Tên bài hát */}
        <input
          type="text"
          placeholder="🎼 Song's name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-600 focus:border-[#00FFFF] outline-none"
        />

        {/* Input Nghệ sĩ */}
        <input
          type="text"
          placeholder="🎤 Artists (if any)..."
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-md border border-gray-600 focus:border-[#00FFFF] outline-none"
        />

        {/* File chọn */}
        <label className="block p-3 bg-gray-700 rounded-md text-center cursor-pointer hover:bg-gray-600 transition">
          📂 Choose file
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Hiển thị file đã chọn */}
        {file && (
          <p className="text-sm text-gray-300">
            📝 Chosen: <span className="font-semibold">{file.name}</span>
          </p>
        )}

        {/* Nút Upload */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold transition cursor-pointer
                     ${
                       loading
                         ? "bg-gray-600 cursor-not-allowed"
                         : "bg-[#2a70a2] hover:bg-[#4997D0]"
                     }`}
        >
          {loading ? "⏳ Loading..." : "Upload"}
        </button>

        {/* Thông báo */}
        {message && (
          <p className="text-center text-lg font-medium mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
