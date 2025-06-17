const stopButton = document.getElementById('stop');

stopButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});