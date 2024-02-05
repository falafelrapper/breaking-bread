const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newRecipe = await Recipe.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(new);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
