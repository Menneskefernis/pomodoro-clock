const timeButtons = document.querySelectorAll('.time-btn');

let sessionTime = 25;
let breakTime = 5;

function updateTimeSetting() {
    const [incOrDec, session] = this.parentNode.id.split('-')
    
    const timeElement = document.getElementById(`${session}-time`);
    const time = parseInt(timeElement.dataset.time);
    
    if (incOrDec == 'dec' && time == 1) return;

    timeElement.dataset.time = (incOrDec == 'inc') ? time + 1 : time - 1;
    timeElement.innerHTML = timeElement.dataset.time;
}

timeButtons.forEach(button => button.addEventListener('click', updateTimeSetting));