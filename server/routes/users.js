const express = require("express")
const {createUser, getUser, patchFriends } = require("../controllers/users")
const router = express.Router()

router.route("/user").get(getUser).post(createUser)
router.route("/friends").patch(patchFriends)
module.exports = router