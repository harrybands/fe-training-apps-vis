 const resetButton = document.getElementById('reset');

 resetButton.addEventListener('click', () => {
 clearInterval(timer);
 isRunning = false;
 milliseconds = 0;
 seconds = 0;
 minutes = 0;
 hours = 0;
 lapCount = 1;
 updateDisplay();
 lapsList.innerHTML='';
 localStorage.clear();
 });