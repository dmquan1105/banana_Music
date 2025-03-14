const express = require("express");
const multer = require("multer");
const Song = require("../models/songModel");

const router = express.Router();

// Cấu hình lưu file nhạc và ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "./images/");
    } else {
      cb(null, "./uploads/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload nhạc + ảnh
router.post(
  "/upload",
  upload.fields([{ name: "file" }, { name: "image" }]),
  (req, res) => {
    const { title, artist } = req.body;
    const fileUrl = `/uploads/${req.files["file"][0].filename}`;
    const imageUrl = req.files["image"]
      ? `/images/${req.files["image"][0].filename}`
      : null;

    Song.create(
      title,
      artist || "Unknown",
      fileUrl,
      imageUrl,
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Tải lên thành công!", fileUrl, imageUrl });
      }
    );
  }
);

// Lấy danh sách bài hát
router.get("/", (req, res) => {
  Song.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Lấy ra bài hát
router.get("/:id", (req, res) => {
  Song.findById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Xoá bài hát
router.delete("/:id", (req, res) => {
  Song.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Success!" });
  });
});

module.exports = router;
