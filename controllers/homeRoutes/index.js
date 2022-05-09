const router = require('express').Router();
const loginRoutes = require("./login.js");
const dashBoardRoutes = require("./dashboard.js")
const registerRoutes = require("./register.js")
const {User, Post, Comment} = require('../../models')

router.use("/login",loginRoutes)
router.use("/dashBoard",dashBoardRoutes)
router.use("/register", registerRoutes)


router.get('/', async (req,res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'user_id', 'post_id'],
                },
            ],
        });

        const posts = dbPostData.map((post) => 
        post.get({ plain: true})
        );

        res.render('homepage', {
            posts,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post/:id', async (req, res) => {
    try{
    const dbPostData = await Post.findOne({
            where: {
                id: req.params.id
            },

            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'user_id', 'post_id'],
                },
            ]
        })
        const post =  dbPostData.get({ plain: true})

        console.log(post)
        res.render('single', {
            post,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post('/', async (req, res) => {
    if (req.session.loggedIn){
    const postData = await Post.create(req.body);
    return res.json(postData);
    }
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