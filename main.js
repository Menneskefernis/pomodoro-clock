const timeButtons = document.querySelectorAll('.time-btn');
const timerLabel = document.getElementById('timer-label');
const counter = document.getElementById('timer');
const playButton = document.getElementById('play-btn');
const stopButton = document.getElementById('stop-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const sessionTime = document.getElementById('session-time');
const breakTime = document.getElementById('break-time');

const time = {
    sessionTime: 25,
    breakTime: 5
}

let countdown;
let counting = false;
let activeSession = 'session';
let secondsLeft = time.sessionTime * 60;

function init() {
    time.sessionTime = 25;
    time.breakTime = 5;
    updateTimeSettingsDisplay();
}

function updateTimeSetting() {
    if (counting) return;
    
    const [incOrDec, session] = this.parentNode.id.split('-');
    
    if (incOrDec == 'dec' && time[`${session}Time`] == 1) return;

    time[`${session}Time`] = (incOrDec == 'inc') ? time[`${session}Time`] + 1 : time[`${session}Time`] - 1;
   
    updateTimeSettingsDisplay();
}

function updateTimeSettingsDisplay() {

    sessionTime.textContent = time.sessionTime;
    breakTime.textContent = time.breakTime;

    if (activeSession === 'session' && !counting) {
        displayTimeLeft(time.sessionTime * 60);
    }
}

function timer(seconds) {
    counting = true;
    
    
    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        
        setCounterColor(secondsLeft);
      
        if (secondsLeft < 1) {
            clearInterval(countdown);
            toggleSession();
        }
        displayTimeLeft(secondsLeft);
    }, 1000);

    
}

function setCounterColor(seconds) {
    switch (true) {
        case seconds <= 5:
            counter.style.color = 'rgb(255, 40, 0)';
            break;
        case seconds <= 15:
            counter.style.color = 'rgb(223, 239, 17)';
            break;
        default:
            counter.style.color = 'rgb(35, 219, 63)';
    }
}

function displayTimeLeft(seconds) {

    const minutesLeft = Math.floor((seconds / 60) % 60);
    const secondsLeft = seconds % 60;
    
    const display = `${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

    counter.innerText = display;
}

function toggleSession() {
    if (activeSession === 'session') {
        timer((time.breakTime * 60) + 1);
        activeSession = 'break';
        setTimeout(function() {
            timerLabel.innerText = 'Break';
        }, 1000)
        
    } else {
        timer((time.sessionTime * 60) + 1);
        activeSession = 'session';
        setTimeout(function() {
            timerLabel.innerText = 'Session';
        }, 1000)        
    }
}

function startTimer() {
    if (counting) {
        timer(secondsLeft);
    } else {
        timer(time.sessionTime * 60);
        activeSession = 'session';
    }
}

function pauseTimer() {
    clearInterval(countdown);
}

function stopTimer() {
    resetCounterValues();
    displayTimeLeft(time.sessionTime * 60);
}

function resetTimer() {
    resetCounterValues();
    init();
}

function resetCounterValues() {
    clearInterval(countdown);
    counting = false;
    activeSession = 'session';
    counter.style.color = 'rgb(255, 255, 255)';
}

timeButtons.forEach(button => button.addEventListener('click', updateTimeSetting));
playButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
pauseButton.addEventListener('click', pauseTimer);

init();