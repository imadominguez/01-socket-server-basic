// controllers/messages.js
const pool = require("../db");

const getMessages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages");
    res.json(result.rows);
  } catch (err) {
    console.error("Error ejecutando la consulta", err.stack);
    res.status(500).send("Error en el servidor");
  }
};

const addMessage = async (req, res) => {
  const { text, user } = req.body;
  try {
    const result = await pool.query("INSERT INTO messages (text, user) VALUES ($1, $2) RETURNING *", [text, user]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error ejecutando la consulta", err.stack);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  getMessages,
  addMessage,
};
