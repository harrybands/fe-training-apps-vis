function loadItems() {
    return JSON.parse(localStorage.getItem("items")) || [];
  }
  
function saveItems(items) {
    localStorage.setItem("items", JSON.stringify(items));
  }
  
function renderTableAndSummary() {
    const items = loadItems();
    const tableBody = document.getElementById("transaction-history");
    tableBody.innerHTML = "";
  
    let totalIncome = 0;
    let totalExpense = 0;
  
    items.forEach((item, index) => {
    const row = document.createElement("tr");
    const descCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const actionCell = document.createElement("td");
  
    descCell.textContent = item.description;
    amountCell.textContent = (item.type === "income" ? "+" : "-") + parseInt(item.amount).toLocaleString();
    actionCell.innerHTML = `<button onclick="deleteItem(${index})">Xóa</button>`;
  
    row.appendChild(descCell);
    row.appendChild(amountCell);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
  
    if (item.type === "income") {
        totalIncome += Number(item.amount);
    }
    else {
        totalExpense += Number(item.amount);
    }
});
  
    document.getElementById("total-income").textContent = totalIncome.toLocaleString();
    document.getElementById("total-expense").textContent = totalExpense.toLocaleString();
    document.getElementById("balance").textContent = (totalIncome - totalExpense).toLocaleString();
  }
  
  function deleteItem(index) {
    const items = loadItems();
    items.splice(index, 1);
    saveItems(items);
    renderTableAndSummary();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderTableAndSummary();
    const resetButton = document.getElementById("reset");
    if (resetButton) {
      resetButton.addEventListener("click", resetAll);
    }
  });