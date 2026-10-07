const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');

const premiumFeatureRoutes = require('./routes/premiumFeature');
const expenseRoutes = require('./routes/expense');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


User.hasMany(Expense);
Expense.belongsTo(User);


app.use('/premium', premiumFeatureRoutes);
app.use('/expense', expenseRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });