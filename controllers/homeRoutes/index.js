const router = require('express').Router();

router.get("/",(req,res)=>{
    const local = true;
    res.render('homepage');
})

module.exports = router;