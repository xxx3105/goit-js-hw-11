 
import flatpickr from "flatpickr";
 
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const elements = {
     timerWrap: document.querySelector('.timer'),
     fields: document.querySelectorAll('.field'),
     days: document.querySelector('[data-days]'),
     hours: document.querySelector('[data-hours]'),
     minutes: document.querySelector('[data-minutes]'),
     seconds: document.querySelector('[data-seconds]'),
     input: document.querySelector('#datetime-picker'),
     startButton: document.querySelector('[data-start]'),
  
};

const { timerWrap, fields, days, hours, minutes, seconds, input, startButton } = elements;

input.style.width = '225px';

timerWrap.style.display = 'flex';
timerWrap.style.gap = '10px';
timerWrap.style.marginTop = '30px';

fields.forEach((field) => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.textAlign = 'center';
  field.style.fontSize = '20px';
});

startButton.setAttribute('disabled', 'true');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: null,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    if (selectedDates[0].getTime() < currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Let`s go!');
      startButton.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener('click', intervalTime);

let intervalId = null;

function intervalTime() {
  intervalId = setInterval(update, 1000);
}

function update() {
  let inputDate = new Date(input.value);
  const currentDate = Date.now();
  const delta = inputDate.getTime() - currentDate;
  const time = convertMs(delta);
  input.disabled = true;
  if (delta < 0) {
    clearInterval(intervalId);
    input.value = '';
    input.removeAttribute('disabled');
    return;
  }

  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
}