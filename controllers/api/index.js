const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');

// Index for the api routes
// Two main routes, one for users (login, logout, create) and recipes (create, delete)

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;
