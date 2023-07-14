const express = require("express")
const { postChat, getChats } = require("../controllers/chats")
const router = express.Router()

router.route("/").post(postChat).get(getChats)

module.exports = router