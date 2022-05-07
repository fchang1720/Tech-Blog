const router = require('express').Router()
// const { DataTypes } = require('sequelize/types');
const {User,Pantry} = require("../../models")


router.post('/login',async (req,res)=>{
    try{
        const userData = await User.findOne({
            where:{
                username: req.body.user_name,
            }
        });

        if(!userData){
            res.status(400).json({message:"Incorrect username"});
            return;
        }
        const validPassword = userData.checkPassword(req.body.password)
        if (!validPassword){
            res.status(400).json({message:'Incorrect password'});
            return;
        }
        // const pantryData = await Pantry.findOne({
        //     where:{
        //         user_id:userData.getDataValue("id")
        //     }
        // });
        req.session.save( ()=>{
            req.session.loggedIn = true;
            req.session.userId = userData.getDataValue("id");
            // req.session.pantryId = ppostData.getDataValue("id")
            res.status(200).json({user:userData, message: 'You are now logged in'})
            
        })
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;