const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const logged = require('../utils/logged');

router.get('/', logged, async(req, res) => {
    try {
    const dbPostData = await Post.findAll({
            where: {user_id: req.session.user_id},
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
        if(req.session.loggedIn) {
            res.render('dashboard', {
                posts,
            })
        }

    } catch (err) {
        res.status(500).json(err);
    }
        //     where: {
        //         user_id: req.session.user_id
        //     },
        //     attributes: ['id','title','content','created_at'],
        //     include: [{
        //             model: Comment,
        //             attributes: ['id', 'comment_content', 'post_id', 'user_id'],
        //             include: {
        //                 model: User,
        //                 attributes: ['username']
        //             }
        //         },
        //         {
        //             model: User,
        //             attributes: ['username']
        //         }
        //     ]
        // })
        // .then(dbPostData => {
        //     const posts = dbPostData.map(post => post.get({ plain: true }));
        //     res.render('dashboard', { posts, loggedIn: true });
        // })
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        });

router.get('/edit/:id', logged, (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
router.get('/newPost', logged, (req, res) => {
    res.render('newPost');
});



module.exports = router;