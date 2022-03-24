const leftEye = document.querySelector(".left");
const rightEye = document.querySelector(".right");
const leftBall = document.querySelector(".left-ball");
const rightBall = document.querySelector(".right-ball");
const leftEyebrow = document.querySelector(".left-eyebrow");
const rightEyebrow = document.querySelector(".right-eyebrow");

let current = "blink";

const clearElements = () => {
  leftEye.className = "";
  leftEye.classList.add("eyes", "left");
  rightEye.className = "";
  rightEye.classList.add("eyes", "right");

  leftBall.className = "";
  leftBall.classList.add("ball", "left-ball", "none");
  rightBall.className = "";
  rightBall.classList.add("ball", "right-ball", "none");

  leftEyebrow.className = "";
  leftEyebrow.classList.add("eyebrow", "left-eyebrow", "none");
  rightEyebrow.className = "";
  rightEyebrow.classList.add("eyebrow", "right-eyebrow", "none");
};

$(window).load(function () {
  setTimeout(function () {
    console.log("Hello there, how are you?");
  }, 0000);
});

function fetchmsg(data) {
  var url = "http://localhost:5000/send-msg";

  const message = { data };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      populateVoiceList(response.Reply[0]);

      if (response.Reply[1] == "LoveIntent") {
        document.getElementById("heartbeat").style.animation =
          "heart-beat 0.6s linear infinite";
        document.getElementById("heartbeat").style.display = "block";
        document.getElementById("heartbeat").style.visibility = "visible";
        document.getElementById("head").style.display = "none";
        document.getElementById("head").style.visibility = "hidden";
        setTimeout(function () {
          document.getElementById("heartbeat").style.display = "none";
          document.getElementById("heartbeat").style.visibility = "hidden";
          document.getElementById("head").style.display = "block";
          document.getElementById("head").style.visibility = "visible";
        }, 6000);
      } else {
        if (response.Reply[1] == "Default Welcome Intent") {
          document.getElementById("eyes left blink").style.animation =
            "blink 4s ease-in forwards 0";
          document.getElementById("eyes right blink").style.animation =
            "blink 4s ease-in forwards 0";
          leftEye.classList.add("happy");
          rightEye.classList.add("happy");
          leftBall.classList.add("happy-ball");
          leftBall.classList.remove("none");
          rightBall.classList.add("happy-ball");
          rightBall.classList.remove("none");
          setTimeout(function () {
            document.getElementById("eyes left blink").style.animation =
              "blink 4s ease-in forwards infinite";
            document.getElementById("eyes right blink").style.animation =
              "blink 4s ease-in forwards infinite";
            leftEye.classList.remove("happy");
            rightEye.classList.remove("happy");
            leftBall.classList.remove("happy-ball");
            leftBall.classList.remove("none");
            rightBall.classList.remove("happy-ball");
            rightBall.classList.remove("none");
          }, 7000);
        } else if (response.Reply[1] == "LowDay") {
          document.getElementById("eyes left blink").style.animation =
            "blink 4s ease-in forwards 0";
          document.getElementById("eyes right blink").style.animation =
            "blink 4s ease-in forwards 0";
          leftEye.classList.add("sad");
          rightEye.classList.add("sad");
          leftEyebrow.classList.add("sad-eyebrow", "sad-left-eyebrow");
          leftEyebrow.classList.remove("none");
          rightEyebrow.classList.add("sad-eyebrow", "sad-right-eyebrow");
          rightEyebrow.classList.remove("none");
          setTimeout(function () {
            document.getElementById("eyes left blink").style.animation =
              "blink 4s ease-in forwards infinite";
            document.getElementById("eyes right blink").style.animation =
              "blink 4s ease-in forwards infinite";
              document.getElementById("eyebrow left-eyebrow").style.animation =
              "sad-left-eyebrow 4s ease-in forwards 0";
            document.getElementById("eyebrow right-eyebrow").style.animation =
              "sad-right-eyebrow 4s ease-in forwards 0";
          }, 8000);
        }
      }
    })
    .catch((error) => console.error("Error: ", error));
}

function voicetotext() {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.start();

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    console.log(e.results[e.results.length - 1][0].transcript);
    fetchmsg(e.results[e.results.length - 1][0].transcript);
  });
}

let voices = [];
function populateVoiceList(ServerMessage) {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  voices = speechSynthesis.getVoices();

  var utterThis = new SpeechSynthesisUtterance(ServerMessage);
  utterThis.voice = voices[32];
  var synth = window.speechSynthesis;
  synth.speak(utterThis);
}

populateVoiceList();
