document.getElementById("reset").addEventListener("click", resetAll);

function resetAll() {
    localStorage.removeItem("items");
    renderTableAndSummary();
  }