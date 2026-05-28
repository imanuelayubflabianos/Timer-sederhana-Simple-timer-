var timer;
var endTime = 0;
var isPaused = false;

function startTimer() {
  if (timer) return;

  if (isPaused && endTime > Date.now()) {
    timer = setInterval(updateTimer, 10);
    isPaused = false;
    document.getElementById('pauseBtn').innerText = "Pause";
    return;
  }

  var hoursInput = document.getElementById('hours');
  var minutesInput = document.getElementById('minutes');
  var secondsInput = document.getElementById('seconds');

  var hours = parseInt(hoursInput.value) || 0;
  var minutes = parseInt(minutesInput.value) || 0;
  var seconds = parseInt(secondsInput.value) || 0;

  var totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

  if (totalTime <= 0) {
    alert("Masukkan angka yang valid!");
    hoursInput.focus();
    return;
  }

  endTime = Date.now() + totalTime;

  hoursInput.disabled = true;
  minutesInput.disabled = true;
  secondsInput.disabled = true;

  timer = setInterval(updateTimer, 10);
  isPaused = false;
  document.getElementById('pauseBtn').innerText = "Pause";
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
  isPaused = true;
}

function togglePause() {
  if (timer) {
    stopTimer();
    document.getElementById('pauseBtn').innerText = "Lanjut";
  } else {
    startTimer();
    document.getElementById('pauseBtn').innerText = "Pause";
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isPaused = false;

  document.getElementById('countdown').innerHTML = "00:00:00:00";

  var hoursInput = document.getElementById('hours');
  var minutesInput = document.getElementById('minutes');
  var secondsInput = document.getElementById('seconds');

  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;

  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';

  document.getElementById('pauseBtn').innerText = "Pause";
}

function updateTimer() {
  var remaining = endTime - Date.now();

  if (remaining <= 0 && timer) {
    clearInterval(timer);
    timer = null;
    document.getElementById('countdown').innerHTML = "00:00:00:00";

    var sound = document.getElementById("alarmSound");
    sound.play();

    setTimeout(() => {
      alert("WAKTUNYA HABIS!");
      resetTimer();
    }, 100);
    return;
  }

  var hours = Math.floor(remaining / (1000 * 60 * 60));
  var minutes = Math.floor((remaining / (1000 * 60)) % 60);
  var seconds = Math.floor((remaining / 1000) % 60);
  var milliseconds = Math.floor((remaining % 1000) / 10);

  document.getElementById('countdown').innerHTML =
    padZero(hours) + ':' +
    padZero(minutes) + ':' +
    padZero(seconds) + ':' +
    padZero(milliseconds, 2);
}

function padZero(number, length = 2) {
  return number.toString().padStart(length, '0');
}
