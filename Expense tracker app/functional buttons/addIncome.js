function addIncome() {
  const income = document.getElementById("income-amount");
  const incomeVal = income.value.trim();
  const incomeDescription = document.getElementById("income-description");
  const incomeDescriptionVal = incomeDescription.value.trim();
  const errorMsg = document.getElementById("income-error");

  if (!incomeVal || !incomeDescriptionVal) {
    if (errorMsg) {
      errorMsg.textContent = "Vui lòng điền đầy đủ thông tin.";
      errorMsg.style.display = "block";
    }
    return;
  }

  if (incomeVal <= 0 || isNaN(incomeVal)) {
    if (errorMsg) {
      errorMsg.textContent = "Vui lòng điền số tiền hợp lệ.";
      errorMsg.style.display = "block";
    }
    return;
  }

  if (errorMsg) errorMsg.style.display = "none";

  const newItem = {
    amount: incomeVal,
    description: incomeDescriptionVal,
    type: "income",
  };

  const items = loadItems();
  items.push(newItem);
  saveItems(items);

  income.value = "";
  incomeDescription.value = "";

  renderTableAndSummary();
}
