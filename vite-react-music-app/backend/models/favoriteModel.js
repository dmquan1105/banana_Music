const db = require("../db");

const Favorite = {
  add: (userId, songId, callback) => {
    const sql = "INSERT INTO favorites (user_id, song_id) VALUES (?, ?)";
    db.query(sql, [userId, songId], callback);
  },

  remove: (userId, songId, callback) => {
    const sql = "DELETE FROM favorites WHERE user_id = ? AND song_id = ?";
    db.query(sql, [userId, songId], callback);
  },

  getUserFavorites: (userId, callback) => {
    const sql = `
      SELECT s.* FROM songs s 
      JOIN favorites f ON s.id = f.song_id 
      WHERE f.user_id = ?
    `;
    db.query(sql, [userId], callback);
  },
};

module.exports = Favorite;
