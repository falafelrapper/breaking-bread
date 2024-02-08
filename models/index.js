const User = require('./User');
const Category = require('./Category');
const Recipe = require('./Recipe');

// Index connecting the models together
// Users can have many associated recipes (through user_id)
// Categories can have many associated recipes (through category_id)
// Recipes belong to users and categories through the associated ids whcih act as foreign keys

User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id'
});

Category.hasMany(Recipe, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL'
});

Recipe.belongsTo(Category, {
    foreignKey: 'category_id'
});

module.exports = { User, Category, Recipe };