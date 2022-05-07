const router = require('express').Router();
const {User} = require('../../models');

router.get('/',(req,res)=>{
    // if (req.session.logged_in){
    //     res.redirect('/');
    //     return
    // }
    res.render('login')
})

module.exports = router;