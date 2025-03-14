const express = require("express");
const Favorite = require("../models/favoriteModel");

const router = express.Router();

// Thêm bài hát vào yêu thích
router.post("/add", (req, res) => {
  const { user_id, song_id } = req.body;
  Favorite.add(user_id, song_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Đã thêm vào yêu thích!" });
  });
});

// Xóa bài hát khỏi yêu thích
router.post("/remove", (req, res) => {
  const { user_id, song_id } = req.body;
  Favorite.remove(user_id, song_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Đã xóa khỏi yêu thích!" });
  });
});

// Lấy danh sách bài hát yêu thích của người dùng
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  Favorite.getUserFavorites(user_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
