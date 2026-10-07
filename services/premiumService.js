const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

const getUserLeaderboardData = async () => {
    return await User.findAll({
        attributes: [
            'id', 
            'name', 
            [sequelize.fn('sum', sequelize.col('expenses.expenseamount')), 'total_cost']
        ],
        include: [
            {
                model: Expense,
                attributes: [] 
            }
        ],
        group: ['user.id'], 
        order: [[sequelize.literal('total_cost'), 'DESC']] 
    });
};

module.exports = {
    getUserLeaderboardData
};