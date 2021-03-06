const router = require('express').Router();
const {User, Post, Comment} = require('../models')
const logged = require('../utils/logged')






// router.get("/dashBoard", logged, (req,res)=>{
//     if (req.session.loggedIn){
//         res.render('dashboard')
//     }
//     else{
//         res.redirect("/login")
//     }
// });


router.get('/', async (req,res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
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
            loggedIn: req.session.loggedIn
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
                    attributes: ['username'],
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


router.post('/', logged, async (req, res) => {
    if (req.session.loggedIn){
    const postData = await Post.create(req.body);
    return res.json(postData);
    }
});

router.put('/:id', logged, async (req, res) => {
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

router.delete('/:id', logged, async (req, res) => {
    const postData = await Post.destroy({
        where: {
            id: req.params.id,
        },
    });

    return res.json(postData);
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
  
});

module.exports = router;