const User = require('./User');
const Category = require('./Category');
const Recipe = require('./Recipe');

User.hasMany(Recipe, {
    foreignKey: '',
    onDelete: 'CASCADE'
});

Recipe.belongsTo()