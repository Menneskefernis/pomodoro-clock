const timeButtons = document.querySelectorAll('.time-btn');
const counter = document.getElementById('counter');
const playButton = document.getElementById('play-btn');
const stopButton = document.getElementById('stop-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');

let countdown;
let counting = false;
let sessionTime = document.getElementById('session-time').dataset.time;
let timeLeft = sessionTime * 60;

function updateTimeSetting() {
    if (counting) return;
    
    const [incOrDec, session] = this.parentNode.id.split('-')
    
    const timeElement = document.getElementById(`${session}-time`);
    const time = parseInt(timeElement.dataset.time);
    
    if (incOrDec == 'dec' && time == 1) return;

    sessionTime = (incOrDec == 'inc') ? time + 1 : time - 1;
    
    timeElement.dataset.time = sessionTime;
    timeElement.innerText = sessionTime;
    
    if (session === 'session') {
        displayTimeLeft(sessionTime * 60);
    }
}

function timer(seconds) {
    
    counting = true;

    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if (secondsLeft < 0) {
            clearInterval(countdown);
            counting = false;
            return;
        }

        timeLeft = secondsLeft;
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {

    const minutesLeft = Math.floor((seconds / 60) % 60);
    const secondsLeft = seconds % 60;
    
    const display = `${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

    counter.innerText = display;
}

function startTimer() {
    if (counting) {
        timer(timeLeft);
    } else {
        timer(sessionTime * 60);
    }
}

function stopTimer() {
    clearInterval(countdown);
    counting = false;
    displayTimeLeft(sessionTime * 60);
}

function pauseTimer() {
    clearInterval(countdown);
}

timeButtons.forEach(button => button.addEventListener('click', updateTimeSetting));
playButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);