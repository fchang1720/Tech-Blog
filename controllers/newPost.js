const router = require('express').Router();

router.get("/",(req,res)=>{
    // if (req.session.loggedIn){
        res.render('newPost')
    // }
    // else{
    //     res.redirect("/login")
    // }
});

module.exports = router;