let editingIndex = null;

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
    actionCell.innerHTML = `
    <button class="edit-btn" onclick="editItem(${index})">Sửa</button>
    <button onclick="deleteItem(${index})">Xóa</button>
  `;
  
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

  function editItem(index) {
    const items = loadItems();
    const item = items[index];
    editingIndex = index;
  
    document.getElementById("edit-description").value = item.description;
    document.getElementById("edit-amount").value = item.amount;
  
    document.getElementById("edit-modal").style.display = "flex";
  }

  function saveEdit() {
    const descEdit = document.getElementById("edit-description").value.trim();
    const amountEdit = document.getElementById("edit-amount").value.trim();
    const errorMsg = document.getElementById("edit-error");
  
    if (!descEdit || !amountEdit || isNaN(amountEdit) || amountEdit <= 0) {
        errorMsg.textContent = "Vui lòng nhập thông tin hợp lệ.";
        errorMsg.style.display = "block";
        return;
    }

    errorMsg.style.display = "none";
  
    const items = loadItems();
    items[editingIndex].description = descEdit;
    items[editingIndex].amount = amountEdit;
  
    saveItems(items);
    renderTableAndSummary();
    closeModal();
  }

  function closeModal() {
    document.getElementById("edit-modal").style.display = "none";
    editingIndex = null;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderTableAndSummary();
  });