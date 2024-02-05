const sequelize = require('../config/connection');
const { User, Category, Recipe } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const recipeData = require('./recipeData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(categoryData);

  const recipes = await Recipe.bulkCreate(recipeData);
  

  process.exit(0);
};

seedDatabase();
