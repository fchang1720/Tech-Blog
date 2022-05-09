const sequelize = require('../config/connection');
const seedUser = require('./user_seeds');
const seedPost = require('./post_seeds');
const seedComment = require('./comment_seeds')

const seedAll = async () => {

    await sequelize.sync({force: true});

    await seedUser();

    await seedPost();

    await seedComment();

    process.exit(0);
}

seedAll();