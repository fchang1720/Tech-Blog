const {Comment} = require('../models');

const commentData = [
    {
        comment_content: "No. It's much easier to set up local play with consoles.",
        user_id: 2,
        post_id: 1,
    },
    {
        comment_content: "Yeah, but who does local play these days anyways??",
        user_id: 1,
        post_id: 1,
    },
    {
        comment_content: "I agree. That's why I stick with android.",
        user_id: 1,
        post_id: 3,
    },
    {
        comment_content: "Good to know that I'm not alone in thinking this lol.",
        user_id: 2,
        post_id: 3,
    },

]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;