const router = require('express').Router();
const logged = require('../utils/logged')

router.get("/", logged, (req,res)=>{
    if (req.session.loggedIn){
        res.render('newPost')
    }
    else{
        res.redirect("/login")
    }
});

module.exports = router;