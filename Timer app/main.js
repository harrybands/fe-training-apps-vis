 let timer;
 let milliseconds = 0;
 let seconds = 0;
 let minutes = 0;
 let hours = 0;
 let lapCount = 1;
 let isRunning = false;

const formattedHours = String(hours).padStart(2, '0');
const formattedMinutes = String(minutes).padStart(2, '0');
const formattedSeconds = String(seconds).padStart(2, '0');
const formattedMillisecond = String(milliseconds).padStart(2, '0');
const lapsList = document.getElementById('lapList');

 const displayContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMillisecond}`;

 const timerDisplay = document.getElementById('timer');

let savedLaps = JSON.parse(localStorage.getItem('laps')) || [];
 savedLaps.forEach((lap, index) => addLapToDOM(index + 1, lap));
 lapCount = savedLaps.length + 1;

  function formatTime(h, m, s, ms) {
 return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
 }

 function updateTimer() {
    milliseconds++;

    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    updateDisplay();
}

function addLapToDOM(number, time) {
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-items';
    const lapsContent = document.createElement('span');
    lapsContent.className = 'laps-content';
    lapsContent.textContent = `
    Lap ${number}: ${time}
    `;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = "Xóa";

    deleteButton.onclick = () => {
        savedLaps = savedLaps.filter(lap => lap !==time || number !== getLapIndex(time));
        localStorage.setItem('laps', JSON.stringify(savedLaps));
        lapsList.removeChild(lapItem);
        renumberLaps();
    }

    lapItem.appendChild(lapsContent);
    lapItem.appendChild(deleteButton);
    
    lapsList.prepend(lapItem);
 }

 function getLapIndex(time) {
    return savedLaps.findIndex(lap => lap === time) +1;
 }

 function renumberLaps() {
    const lapItems = lapsList.querySelectorAll('.lap-item');
    lapCount = lapItems.length + 1;
    lapItems.forEach((item, index) => {
    const span = item.querySelector('.lap-text');
    const lapTime = span.textContent.split(': ').pop();
    span.textContent = `Lap ${lapItems.length - index}: ${lapTime}`;
 });
 }

  function updateDisplay() {
 timerDisplay.textContent = formatTime(hours, minutes, seconds, milliseconds);
 }