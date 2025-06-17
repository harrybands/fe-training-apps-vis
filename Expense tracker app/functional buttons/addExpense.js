  function addData() {
    const table = document.getElementById('transaction-table').querySelector('tbody');
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell();
    const cell2 = newRow.insertCell();
    cell1.innerHTML = 'John Doe';
    cell2.innerHTML = '30';
  }

  function addExpense() {
    const expense = document.getElementById("expense-input").value.trim();
    const amount = document.getElementById("amount-input").value.trim();
    const category = document.getElementById("category-input").value.trim();
    const errorMsg = document.getElementById("expenseError");

    if (!expense || !amount || !category) {
      if (errorMsg) {
        errorMsg.textContent = "điền đê.";
        errorMsg.style.display = "block";
      }
      return;
    }
    
    // Clear input fields
    document.getElementById("expense-input").value = "";
    document.getElementById("amount-input").value = "";
    document.getElementById("category-input").value = "";
  }