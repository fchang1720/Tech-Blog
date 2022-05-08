const router = require('express').Router();
const userRoutes = require("./user")
const post = require("./postRoutes")
const commentRoutes = require("./comment")

router.use("/user", userRoutes)
router.use("/post", post)
// router.use("/comment", commentRoutes)

module.exports = router;