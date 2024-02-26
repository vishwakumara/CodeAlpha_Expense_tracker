// Expense data array
let expenses = [];

// DOM elements
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const expenseSummary = document.getElementById('expenseSummary');
const addExpenseBtn = document.getElementById('addExpenseBtn');

// Add expense event
addExpenseBtn.addEventListener('click', function() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseName && expenseAmount) {
        const newExpense = { id: Date.now(), name: expenseName, amount: expenseAmount };
        expenses.push(newExpense);
        updateExpensesList();
        displayExpenses();
        saveToLocalStorage();
        expenseForm.reset();
    } else {
        alert('Please enter expense name and amount');
    }
});

// Update expenses list function
function updateExpensesList() {
    expenseList.innerHTML = '';
    expenses.forEach(function(expense) {
        const expenseItem = document.createElement('div');
        expenseItem.innerHTML = `
            <span>${expense.name}: RS ${expense.amount.toFixed(2)}</span>
            <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    });
}

// Display expenses and calculations
function displayExpenses() {
    let totalExpenses = 0;
    expenses.forEach(function(expense) {
        totalExpenses += expense.amount;
    });
    const averageExpense = totalExpenses / expenses.length;

    expenseSummary.innerHTML = `
        <p>Total Expenses: RS ${totalExpenses.toFixed(2)}</p>
    `;
}

// Edit expense function
function editExpense(id) {
    const expenseToEdit = expenses.find(expense => expense.id === id);
    if (!expenseToEdit) return;
    const newName = prompt('Enter new expense name:', expenseToEdit.name);
    const newAmount = parseFloat(prompt('Enter new expense amount:', expenseToEdit.amount));
    if (newName && !isNaN(newAmount)) {
        expenseToEdit.name = newName;
        expenseToEdit.amount = newAmount;
        updateExpensesList();
        displayExpenses();
        saveToLocalStorage();
    } else {
        alert('Invalid input. Please enter valid expense name and amount.');
    }
}

// Delete expense function
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpensesList();
    displayExpenses();
    saveToLocalStorage();
}

// Save expenses to local storage
function saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses from local storage
function loadFromLocalStorage() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        updateExpensesList();
        displayExpenses();
    }
}

// Load expenses on page load
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
