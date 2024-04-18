const router = require('express').Router();
const userRoutes = require('./usesr-routes');

router.use('/users', userRoutes);

module.exports = router;