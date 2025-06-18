function addExpense() {
  const description = document.getElementById("expense-description");
  const expense = document.getElementById("expense-amount");
  const errorMsg = document.getElementById("expense-error");

  const expenseDescriptionVal = description.value.trim();
  const expenseVal = expense.value.trim();

  if (!expenseVal || !expenseDescriptionVal) {
    if (errorMsg) {
      errorMsg.textContent = "Vui lòng điền đầy đủ thông tin.";
      errorMsg.style.display = "block";
    }
    return;
  }

  if (expenseVal <= 0 || isNaN(expenseVal)) {
    if (errorMsg) {
      errorMsg.textContent = "Vui lòng nhập số tiền hợp lệ.";
      errorMsg.style.display = "block";
    }
    return;
  }

  if (errorMsg) errorMsg.style.display = "none";

  const newItem = {
    amount: expenseVal,
    description: expenseDescriptionVal,
    type: "expense",
  };

  const items = loadItems();
  items.push(newItem);
  saveItems(items);

  description.value = "";
  expense.value = "";

  renderTableAndSummary();
}