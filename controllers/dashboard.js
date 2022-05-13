const router = require('express').Router();
const {User, Post, Comment} = require('../models');


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

        res.render('dashboard', {
            posts,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})
router.get('/edit/:id', (req, res) => {
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
router.get('/new', (req, res) => {
    res.render('new-post');
});

// router.get('/dashBoard/:id', async (req,res)=>{
//     // if (!req.session.logged_in){
//     //     res.redirect('/login');
//     // } else{
//         try{
//             const dbUserData = await User.findByPk(req.params.id, {
//                 include: [
//                     {
//                         model: Post,
//                         attributes: [
//                             'id',
//                             'title',
//                             'content',
//                         ]
//                     }
//                 ]
//             });
//             const user = dbUserData.get({ plain: true });
//             res.render('dashboard', { user, loggedIn: req.session.loggedIn });
//           } catch (err) {
//             console.log(err);
//             res.status(500).json(err);
//         //   }
//         }
    
// })

module.exports = router;