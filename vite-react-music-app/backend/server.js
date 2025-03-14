const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Truy cập file nhạc
app.use("/images", express.static("images")); // Truy cập ảnh bài hát

const songRoutes = require("./routes/songs");
const favoriteRoutes = require("./routes/favorites");

app.use("/api/songs", songRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
  res.send("Server đang chạy!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server chạy tại http://localhost:${process.env.PORT}`);
});
