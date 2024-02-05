const router = require('express').Router();
const { Category, User, Recipe } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const projectData = await Recipe.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Category,
                    attributes: ['name'],
                },
            ],
        });

        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

        res.render('homepage', {
            recipes
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/recipes', async (req, res) => {
    try {
        const projectData = await Recipe.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Category,
                    attributes: ['name'],
                },
            ],
        });

        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('recipe', {
            recipes
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/recipes/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Category,
                    attributes: ['name'],
                },
            ],
        });

        const recipe = recipeData.get({ plain: true });

        res.render('recipe', {
            ...recipe,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Recipe
                },
            ],
        });

        const user = userData.get({ plain: true });

        res.render('user', {
            ...user,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Recipe }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
