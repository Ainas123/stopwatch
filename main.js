// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(tInterval);
    }
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    display.innerHTML = "00:00:00";
    lapList.innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        const lapMinutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
        const lapSeconds = Math.floor((lapTime % (1000 * 60)) / 1000);
        const lapMilliseconds = Math.floor((lapTime % 1000) / 10);

        const lapFormatted = `${String(lapMinutes).padStart(2, '0')}:${String(lapSeconds).padStart(2, '0')}:${String(lapMilliseconds).padStart(2, '0')}`;
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${lapCount++}: ${lapFormatted}`;
        lapList.appendChild(listItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
