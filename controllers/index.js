const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');
const dashboardRoutes = require('./dashboard')


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashBoard', dashboardRoutes)



module.exports = router;