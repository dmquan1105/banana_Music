const fs = require("fs");
const path = require("path");
const db = require("../db");

const Song = {
  create: (title, artist, fileUrl, imageUrl, callback) => {
    const sql =
      "INSERT INTO songs (user_id, title, artist, file_url, image_url) VALUES (1, ?, ?, ?, ?)";
    db.query(sql, [title, artist, fileUrl, imageUrl], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM songs ORDER BY uploaded_at DESC";
    db.query(sql, callback);
  },

  findById: (id, callback) => {
    const sql = "SELECT * FROM songs WHERE id = ?";
    db.query(sql, [id], callback);
  },

  delete: (id, callback) => {
    const sqlSelect = "SELECT file_url, image_url FROM songs WHERE id = ?";
    db.query(sqlSelect, [id], (err, results) => {
      if (err) return callback(err);

      if (results.length > 0) {
        const { file_url, image_url } = results[0];

        if (file_url) {
          const filePath = path.join(__dirname, "..", file_url);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        if (image_url) {
          const imagePath = path.join(__dirname, "..", image_url);
          if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        const sqlDelete = "DELETE FROM songs WHERE id = ?";
        db.query(sqlDelete, [id], callback);
      } else {
        callback(null, { affectedRows: 0 });
      }
    });
  },
};

module.exports = Song;
