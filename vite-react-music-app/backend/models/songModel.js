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
    const sql = "SELECT * FROM songs WHERE id =?";
    db.query(sql, [id], callback);
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM songs WHERE id =?";
    db.query(sql, [id], callback);
  },
};

module.exports = Song;
