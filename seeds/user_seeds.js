const {User} = require('../models');

const userData = [
    {
        username: 'JohnSmith',
        password: 'pass1234',
    },
    {
        username: 'JaneDoe',
        password: 'pass4321',
    }

]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;