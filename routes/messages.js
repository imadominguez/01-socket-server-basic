// routes/messages.js
const express = require("express");
const { getMessages, addMessage } = require("../controllers/messages");

const router = express.Router();

router.get("/messages", getMessages);
router.post("/messages", addMessage);

module.exports = router;
