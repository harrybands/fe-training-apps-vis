const lapsButton = document.getElementById("laps");

 lapsButton.addEventListener('click', () => {
 if (isRunning) {
 const lapTime = formatTime(hours, minutes, seconds, milliseconds);

 // Save to localStorage
 savedLaps.push(lapTime);
 localStorage.setItem('laps', JSON.stringify(savedLaps));
 addLapToDOM(lapCount, lapTime);

 lapCount++;
 }
 });