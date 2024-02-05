const User = require('./User');
const Category = require('./Category');
const Recipe = require('./Recipe');

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