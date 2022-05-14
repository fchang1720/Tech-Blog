const {Post} = require('../models');

const postData = [
    {
        title: 'Best Console Ever?',
        content: "I think pc games are much better than consoles.",
        user_id: 1
    },
    {
        title: 'Thoughts about the Razer blade 15 laptop?',
        content: "So far, I'm liking this laptop a lot. Have you guys encountered any issues?",
        user_id: 2
    },
    {
        title: 'Iphone memory Storage.',
        content: 'New phone, but so much memory is already being used!',
        user_id: 2
    },

]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;