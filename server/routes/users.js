const express = require("express")
const { getUserAuth, createUser, getUser, patchFriends } = require("../controllers/users")
const router = express.Router()

router.route("/auth").get(getUserAuth).post(createUser)
router.route("/").get(getUser)
router.route("/friends").patch(patchFriends)
module.exports = router