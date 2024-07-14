let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let isRunning = false;

function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${millisecondsFormatted}`;
}

function updateDisplay() {
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        stop();
    } else {
        start();
    }
}

function start() {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    document.getElementById('startStopButton').textContent = 'Stop';
    document.getElementById('lapButton').style.display = 'inline-block';
}

function stop() {
    isRunning = false;
    clearInterval(timerInterval);
    document.getElementById('startStopButton').textContent = 'Start';
    document.getElementById('lapButton').style.display = 'none';
}

function lap() {
    if (isRunning) {
        let lapTime = elapsedTime;
        laps.push(lapTime);
        let li = document.createElement('li');
        li.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        document.getElementById('laps').appendChild(li);
    }
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    document.getElementById('startStopButton').textContent = 'Start';
    document.getElementById('lapButton').style.display = 'none';
    document.getElementById('laps').innerHTML = '';
}