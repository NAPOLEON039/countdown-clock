let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
    //clear any existing timers to avoid overlap (can happen if two buttons are pressed)
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //stop before going negative
        if (secondsLeft < 0) {
            clearInterval(countown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const mins = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const displayTime = `${mins}:${remainderSeconds < 10 ? '0' :''}${remainderSeconds}`;
    document.title = displayTime;
    timerDisplay.textContent = displayTime;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    //for those who don't like 24-hour clock
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const mins = end.getMinutes();
    endTime.textContent = `Come back at ${adjustedHour}:${mins < 10 ? '0' : ''}${mins}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
//allows us to target any form with a name.
//We can even select the input inside it with document.customForm.minutes since it also has a name
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});