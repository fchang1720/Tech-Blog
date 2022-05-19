const router = require('express').Router()
const {Comment} = require("../../models")
const logged = require('../../utils/logged')

router.post("/", logged, async (req,res) => {
    try{
        
        const newRequest = await Comment.create({
    
        comment_content: req.body.comment_content
        })
        res.json(newRequest)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", logged, async (req,res) => {
    try{
        console.log(req.body);
        const requestData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!requestData[0]){
            res.status(404).json({message: 'No comment with this ID.'});
            return;
        }
        res.status(200).json(requestData);
    }catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;