const router = require('express').Router();
const loginRoutes = require("./login.js");
const dashBoardRoutes = require("./dashboard.js")

router.use("/login",loginRoutes)
router.use("/dashBoard",dashBoardRoutes)

router.get("/",(req,res)=>{

    res.render('homepage');
})

module.exports = router;