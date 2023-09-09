// Add event listener to the form submission
document.getElementById('expForm').addEventListener('submit', addExpense);

// Retrieve expenses data from localStorage or set to an empty array if not available
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to handle adding an expense
function addExpense(e){
  e.preventDefault(); // Prevent form submission

  // Get values from form fields
  let type = document.getElementById('type').value;
  let name = document.getElementById('name').value;
  let date = document.getElementById('date').value;
  let amount = document.getElementById('amount').value;

  // Check if all required fields have valid values
  if(type != 'chooseOne' && name.length > 0 && date != 0 && amount > 0){
    // Create an expense object
    const expense = {
      type,
      name,
      date,
      amount,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
    };

    // Add the expense to the expenses array
    expenses.push(expense);

    // Update expenses data in localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  // Reset form fields
  document.getElementById('expForm').reset();

  // Update displayed list of expenses
  showExpenses();
}

// Function to display expenses in a table
const showExpenses = () => {
  const expenseTable = document.getElementById('expenseTable');
  expenseTable.innerHTML = ''; // Clear existing table content

  // Iterate over expenses array and generate table rows
  for(let i = 0; i < expenses.length; i++){
    expenseTable.innerHTML += `
      <tr>
        <td>${expenses[i].type}</td>
        <td>${expenses[i].name}</td>
        <td>${expenses[i].date}</td>
        <td>₦${expenses[i].amount}</td>
        <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">Delete</td>
      </tr>
    `;
  }
}
// Function to delete an expense
const deleteExpense = (id) => {
  for(let i = 0; i < expenses.length; i++){
    if(expenses[i].id == id){
      expenses.splice(i, 1); // Remove expense from the array
    }
  }
  // Update expenses data in localStorage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Update displayed list of expenses
  showExpenses();
}

// Display expenses when the page loads
showExpenses();


