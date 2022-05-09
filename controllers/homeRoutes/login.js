const router = require('express').Router();

router.get('/',(req,res)=>{
    if (req.session.logged_in){
        res.redirect('/');
        return
    }
    res.render('login',{onLogin:true})
})

module.exports = router;