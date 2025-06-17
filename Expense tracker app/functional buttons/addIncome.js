  function addData() {
    const table = document.getElementById('transaction-table').querySelector('tbody');
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell();
    const cell2 = newRow.insertCell();
    cell1.innerHTML = 'John Doe';
    cell2.innerHTML = '30';
  }

function addIncome() {
  console.log("here");
  const income = document.getElementById("income-amount");
  const incomeVal = income.value.trim();
  const incomeDescription = document.getElementById("income-description");
  const incomeDescriptionVal = incomeDescription.value.trim();
  const errorMsg = document.getElementById("income-error");
  if (!incomeVal || !incomeDescriptionVal) {
    if (errorMsg) {
      errorMsg.textContent = "Vui lòng điền đầy thủ thông tin.";
      errorMsg.style.display = "block";
    }
    return;
  }
  if (incomeVal <=0) {
    if (errorMsg) {
      errorMsg.textContent = "Vui lòng điền số tiền hợp lệ.";
      errorMsg.style.display = "block";
    }
    return;
  }
  if (errorMsg) {
    errorMsg.style.display = "none";
  }

  const incomeItem = {
    amount: incomeVal,
    description: incomeDescriptionVal,
  };
}