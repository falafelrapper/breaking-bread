const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
      const newUser = await User.create({
        ...req.body,
      });
  
      res.status(200).json(new);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
