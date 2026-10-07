async function addExpense(e) {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const expenseamount = document.getElementById('expenseamount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expenseDetails = {
        name,
        expenseamount,
        description,
        category
    };

    try {
        const response = await fetch('http://localhost:3000/expense/addexpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseDetails)
        });
        
        if(response.ok) {
            alert('Expense added successfully!');
            document.getElementById('username').value = '';
            document.getElementById('expenseamount').value = '';
            document.getElementById('description').value = '';
            showLeaderboard(); 
        } else {
            console.log('Failed to add expense');
        }
    } catch (err) {
        console.log(err);
    }
}

async function showLeaderboard() {
    try {
        const response = await fetch('http://localhost:3000/premium/showLeaderBoard');
        const leaderboardArray = await response.json();
        
        const leaderboardElem = document.getElementById('leaderboardList');
        leaderboardElem.innerHTML = '<h3>Leaderboard (Optimized Highest to Lowest)</h3>';
        
        leaderboardArray.forEach((user) => {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`Name: ${user.name} --- Total Expense: ${user.total_cost || 0}`));
            leaderboardElem.appendChild(li);
        });
    } catch (err) {
        console.log(err);
    }
}