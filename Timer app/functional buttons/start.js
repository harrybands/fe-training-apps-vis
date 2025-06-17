const startButton = document.getElementById('start');

 startButton.addEventListener('click', () => {
 if (!isRunning) {
 timer = setInterval(updateTimer, 10);
 isRunning = true;
 }
 console.log('millisec: ', milliseconds, 'secs: ', seconds, 'minutes: ', minutes, 'hours: ', hours)
 });