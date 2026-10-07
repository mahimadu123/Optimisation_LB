const Expense = require('../models/expenses');
const User = require('../models/users');

const addExpense = async (req, res) => {
    try {
        const { name, expenseamount, description, category } = req.body;
        
        let user = await User.findOne({ where: { name: name } });
        
        if (!user) {
            user = await User.create({
                name: name,
                email: `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
                ispremiumuser: true
            });
        }

        const expense = await Expense.create({
            expenseamount,
            description,
            category,
            userId: user.id 
        });
        
        res.status(201).json({ expense, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err });
    }
};

module.exports = {
    addExpense
};