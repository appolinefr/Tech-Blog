const router = require('express').Router();
const blogPostRoutes = require('./blogPostRoutes');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/blogPost', blogPostRoutes);

module.exports = router;