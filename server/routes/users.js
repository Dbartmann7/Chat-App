const express = require("express")
const { getUserAuth, createUser, getUser } = require("../controllers/users")
const router = express.Router()

router.route("/auth").get(getUserAuth).post(createUser)
router.route("/").get(getUser)
module.exports = router