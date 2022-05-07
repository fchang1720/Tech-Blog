const router = require('express').Router();
const loginRoutes = require("./login.js");
const dashBoardRoutes = require("./dashboard.js")
const registerRoutes = require("./register.js")

router.use("/login",loginRoutes)
router.use("/dashBoard",dashBoardRoutes)
router.use("/register", registerRoutes)

router.get("/",(req,res)=>{

    res.render('homepage');
})

module.exports = router;