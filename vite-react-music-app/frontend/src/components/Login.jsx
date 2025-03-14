import { useState } from "react";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Giả lập kiểm tra tài khoản (ở backend sau này có thể dùng API)
    if (email === "" && password === "") {
      setIsLoggedIn(true);
    } else {
      alert("Sai thông tin đăng nhập! Hãy thử lại.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/banana_icon.png"
            alt="Banana Icon"
            className="w-[100px] h-[70px] object-contain mb-2 invert brightness-0"
          />
          <h2 className="text-2xl font-bold text-center mb-6">
            Banana Music 🍌
          </h2>
        </div>

        {/* Input Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded-lg border border-gray-700 focus:border-[#00FFFF] outline-none transition"
        />

        {/* Input Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded-lg border border-gray-700 focus:border-[#00FFFF] outline-none transition"
        />

        {/* Button Login */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 p-2 rounded-lg hover:bg-blue-400 cursor-pointer active:animate-ping transition-transform duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
