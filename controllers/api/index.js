const router = require('express').Router();
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const recipeRoutes = require('./recipeRoutes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;
