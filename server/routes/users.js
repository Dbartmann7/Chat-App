const express = require("express")
const { getUserAuth, createUser, getUser, addFriend } = require("../controllers/users")
const router = express.Router()

router.route("/auth").get(getUserAuth).post(createUser)
router.route("/").get(getUser)
router.route("/friends").post(addFriend)
module.exports = router