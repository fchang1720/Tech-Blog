const router = require('express').Router();
const loginRoutes = require("./login.js");
const dashBoardRoutes = require("./dashboard.js")
const registerRoutes = require("./register.js")
const Post = require('../../models/Post')

router.use("/login",loginRoutes)
router.use("/dashBoard",dashBoardRoutes)
router.use("/register", registerRoutes)

router.get('/', async (req,res) => {
    const postData = await Post.findAll().catch((err) => {
        res.json(err);
    });
    const posts = postData.map((postInfo) => postInfo.get({ plain: true }));
    console.log(posts)
    res.render('homepage', {posts})
});

router.get('/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id);
    return res.json(postData);
});

router.post('/', async (req, res) => {
    const postData = await Post.create(req.body);
    return res.json(postData);
});

router.put('/:id', async (req, res) => {
    const postData = await Post.update(
       {
           title: req.body.title,
           content: req.body.content,

       },
       {
           where: {
               id: req.params.id,
           },
       } 
    );

    return res.json(postData);
})

router.delete('/:id', async (req, res) => {
    const postData = await Post.destroy({
        where: {
            id: req.params.id,
        },
    });

    return res.json(postData);
});

module.exports = router;