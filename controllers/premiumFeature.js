const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

const getUserLeaderboard = async (req, res) => {
    try {
        const leaderboardData = await User.findAll({
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

        res.status(200).json(leaderboardData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err });
    }
};

module.exports = {
    getUserLeaderboard
};