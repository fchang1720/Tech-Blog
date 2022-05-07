const {User} = require('../models');

const userData = [
    {
        user_name: 'JohnSmith',
        password: 'pass1234',
    },
    {
        user_name: 'JaneDoe',
        password: 'pass4321',
    }

]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;