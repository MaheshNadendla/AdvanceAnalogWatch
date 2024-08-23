// Declare the audio variable globally
let audio = document.getElementById("background-music");

// Function to play the audio
function playAudio() {
  audio.play().catch((error) => {
    console.log("Play failed due to browser restrictions:", error);
  });
}

// Function to stop the audio
function stopAudio() {
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0; // Reset to the start
  }
}

// document.addEventListener("DOMContentLoaded", function() {
//   // Add an event listener to play audio on user interaction
//   document.addEventListener("click", function() {
//     playAudio();
//     // Set time only after the user interaction
//     SetFirstTime();
//     // Remove the event listener after it's used once
//     document.removeEventListener("click", arguments.callee);
//   }, { once: true });
// });

for (let index = 0; index < 60; index++) {
  if (index % 5 !== 0) {
    let pointsare = document.createElement("div");
    pointsare.classList.add("points");
    pointsare.classList.add("pointscolor");
    pointsare.style = `transform: translate(-50%,-50%) rotateZ(${
      index * 6
    }deg)`;
    let Clock = document.querySelector(".Road");
    Clock.appendChild(pointsare);
  }
}

let val = 0;
let val1 = 0;
let val2 = 0;

function SetFirstTime() {
  playAudio();
  let a = DateTime();
  console.log(a);

  val = a[0] * 6 + 6;
  val1 = a[1] * 6;
  val2 = a[2] * 30 + a[1] * 0.5;

  document.querySelector(".Sec").style = `rotate:${val}deg;`;
  document.querySelector(".Min").style = `rotate:${val1}deg;`;
  document.querySelector(".Hour").style = `rotate:${val2}deg;`;
}

SetFirstTime();

function DateTime() {
  const currentDateTime = new Date();
  const date = currentDateTime.toDateString();
  let hours = currentDateTime.getHours();
  let minutes = currentDateTime.getMinutes();

  let seconds = currentDateTime.getSeconds();
  let s = seconds;
  let m = minutes;

  // Convert to 12-hour format
  var meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert hour 0 to 12

  // Add leading zeros to minutes and seconds if they are less than 10
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return [s, m, hours, meridiem];
}

let n = DateTime();

let S = n[0];
let M = n[1];
let H = n[2];
let ME = n[3];

function Rotate() {
  document.querySelector(".Sec").style = `rotate:${val}deg;`;
  if (val == 360) {
    val = 0;
    document.querySelector(".Min").style = `rotate:${val1 + 6}deg;`;
    document.querySelector(".Hour").style = `rotate:${val2}deg;`;
    if (val1 == 360) {
      val1 = 0;
    }
    if (val2 == 360) {
      val2 = 0;
    }
    val1 += 6;
    val2 += 0.5;
  }
  val += 6;
}

function DgClock() {
  console.log(n);
  n[0] = n[0] + 1;
  if (n[0] == 60) {
    n[0] = 0;
    n[1] = n[1] + 1;
    if (n[1] == 60) {
      n[1] = 0;
      n[2] = n[2] + 1;
      if (n[2] == 13) {
        n[2] = 1;
      }
      if (n[2] == 12) {
        console.log("hello", n[3]);
        if (n[3] == "PM") {
          n[3] = "AM";
        } else {
          n[3] = "PM";
        }
      }
    }
  }

  let hou = n[2] < 10 ? "0" + n[2] : n[2];
  let minu = n[1] < 10 ? "0" + n[1] : n[1];
  let seco = n[0] < 10 ? "0" + n[0] : n[0];

  document.querySelector(
    ".DigClo"
  ).innerHTML = `${hou}:${minu}:${seco} ${n[3]}`;
}

const hoursContainer = document.getElementById("hoursContainer");
const currentHourDisplay = document.getElementById("currentHour");

const minsContainer = document.getElementById("minsContainer");
const secsContainer = document.getElementById("secsContainer");
const medsContainer = document.getElementById("medsContainer");

let analog, digital;

function StartTime() {
  Stop();
  analog = setInterval(DgClock, 1000);
  digital = setInterval(Rotate, 1000);
  setInitialScrollPosition();
}

function Stop() {
  stopAudio();
  clearInterval(analog);
  clearInterval(digital);
  setInitialScrollPosition();
}

function Start() {
  StartTime();
  playAudio();
}

function GetSystemTime() {
  Stop();
  n = DateTime();
  SetFirstTime();
  StartTime();
  setInitialScrollPosition();
  playAudio();
}

StartTime();

console.log(S, M, H, ME);

function updateCurrentHour() {
  const scrollTop = hoursContainer.scrollTop;
  const hourIndex = Math.round((scrollTop - 0) / 32);
  const currentHour =
    hourIndex >= 0 && hourIndex < 12 ? hourIndex + 1 : "Out of Range";

  H = currentHour;
  console.log(currentHour);
  for (let i = 1; i < 13; i++) {
    document.querySelector(`.h${i}`).classList.remove("AddWhite");
    document.querySelector(`.h${i}`).classList.add("AddBlack");
  }
  document.querySelector(`.h${H}`).classList.remove("AddBlack");
  document.querySelector(`.h${H}`).classList.add("AddWhite");
  console.log("kilo", H);
}

function updateCurrentMin() {
  const scrollTop = minsContainer.scrollTop;
  const hourIndex = Math.round((scrollTop - 0) / 32);
  const currentMins =
    hourIndex >= 0 && hourIndex < 60 ? hourIndex + 1 : "Out of Range";

  M = currentMins - 1;

  console.log(currentMins - 1);

  for (let i = 0; i < 60; i++) {
    document.querySelector(`.m${i}`).classList.remove("AddWhite");
    document.querySelector(`.m${i}`).classList.add("AddBlack");
  }
  document.querySelector(`.m${M}`).classList.remove("AddBlack");
  document.querySelector(`.m${M}`).classList.add("AddWhite");
  console.log("kilo", M);
}

function updateCurrentSec() {
  const scrollTop = secsContainer.scrollTop;
  const hourIndex = Math.round((scrollTop - 0) / 32);
  const currentSecs =
    hourIndex >= 0 && hourIndex < 60 ? hourIndex + 1 : "Out of Range";
  console.log(currentSecs - 1);

  S = currentSecs - 1;

  for (let i = 0; i < 60; i++) {
    document.querySelector(`.s${i}`).classList.remove("AddWhite");
    document.querySelector(`.s${i}`).classList.add("AddBlack");
  }
  document.querySelector(`.s${S}`).classList.remove("AddBlack");
  document.querySelector(`.s${S}`).classList.add("AddWhite");
  console.log("kilo", S);
}

function updateCurrentMed() {
  const scrollTop = medsContainer.scrollTop;
  const MedIndex = Math.round((scrollTop - 0) / 32);
  const currentMeds =
    MedIndex >= 0 && MedIndex < 2 ? MedIndex + 1 : "Out of Range";
  console.log(currentMeds);

  for (let i = 1; i < 3; i++) {
    document.querySelector(`.mex${i}`).classList.remove("AddWhite");
    document.querySelector(`.mex${i}`).classList.add("AddBlack");
  }
  document.querySelector(`.mex${currentMeds}`).classList.remove("AddBlack");
  document.querySelector(`.mex${currentMeds}`).classList.add("AddWhite");
  console.log("kilo", ME);

  if (currentMeds == 1) {
    ME = "AM";
  } else {
    ME = "PM";
  }
}

hoursContainer.addEventListener("scroll", updateCurrentHour);

minsContainer.addEventListener("scroll", updateCurrentMin);

secsContainer.addEventListener("scroll", updateCurrentSec);

medsContainer.addEventListener("scroll", updateCurrentMed);

function setInitialScrollPosition() {
  const hourHeight = 32; // Height of each hour div
  const offset = 60; // Offset for the two initial empty boxes
  const hourToCenter = n[2]; // Hour you want to center
  const scrollPosition =
    (hourToCenter - 1) * hourHeight +
    offset -
    hoursContainer.clientHeight / 2 +
    hourHeight / 2;
  hoursContainer.scrollTop = scrollPosition;

  const MinsHeight = 32; // Height of each hour div
  const Moffset = 60; // Offset for the two initial empty boxes
  const MinsToCenter = n[1] + 1; // Hour you want to center
  const MscrollPosition =
    (MinsToCenter - 1) * MinsHeight +
    Moffset -
    minsContainer.clientHeight / 2 +
    MinsHeight / 2;
  minsContainer.scrollTop = MscrollPosition;

  const SecsHeight = 32; // Height of each hour div
  const Soffset = 60; // Offset for the two initial empty boxes
  const SecsToCenter = n[0] + 2; // Hour you want to center
  const SscrollPosition =
    (SecsToCenter - 1) * SecsHeight +
    Soffset -
    secsContainer.clientHeight / 2 +
    SecsHeight / 2;
  secsContainer.scrollTop = SscrollPosition;

  const MedsHeight = 32; // Height of each hour div
  const Meoffset = 60; // Offset for the two initial empty boxes
  let fx;

  if (n[3] == "AM") {
    fx = 1;
  } else {
    fx = 2;
  }
  const MedsToCenter = fx; // Hour you want to center
  const MescrollPosition =
    (MedsToCenter - 1) * MedsHeight +
    Meoffset -
    medsContainer.clientHeight / 2 +
    MedsHeight / 2;
  medsContainer.scrollTop = MescrollPosition;

  updateCurrentHour(); // Update the displayed hour
  updateCurrentMin();
  updateCurrentSec();
  updateCurrentMed();
}

function SetTime() {
  document.querySelector(".FixTime").classList.add("DFlex");
  document.querySelector(".Ok").classList.add("DBlock");
  setInitialScrollPosition();
}

function Ok() {
  n[0] = S;
  n[1] = M;
  n[2] = H;
  n[3] = ME;

  val = n[0] * 6 + 6;
  val1 = n[1] * 6;
  val2 = n[2] * 30 + n[1] * 0.5;
  document.querySelector(".Sec").style = `rotate:${val}deg;`;
  document.querySelector(".Min").style = `rotate:${val1}deg;`;
  document.querySelector(".Hour").style = `rotate:${val2}deg;`;

  StartTime();
  document.querySelector(".FixTime").classList.remove("DFlex");
  document.querySelector(".Ok").classList.remove("DBlock");
  playAudio();
}
