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
            document.getElementById(
              "eyebrow left-eyebrow"
            ).style.animationPlayState = "paused";
            document.getElementById(
              "eyebrow right-eyebrow"
            ).style.animationPlayState = "paused";
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

//<![CDATA[
shortcut={all_shortcuts:{},add:function(a,b,c){var d={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};if(c)for(var e in d)"undefined"==typeof c[e]&&(c[e]=d[e]);else c=d;d=c.target,"string"==typeof c.target&&(d=document.getElementById(c.target)),a=a.toLowerCase(),e=function(d){d=d||window.event;if(c.disable_in_input){var e;d.target?e=d.target:d.srcElement&&(e=d.srcElement),3==e.nodeType&&(e=e.parentNode);if("INPUT"==e.tagName||"TEXTAREA"==e.tagName)return}d.keyCode?code=d.keyCode:d.which&&(code=d.which),e=String.fromCharCode(code).toLowerCase(),188==code&&(e=","),190==code&&(e=".");var f=a.split("+"),g=0,h={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},i={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},j=!1,l=!1,m=!1,n=!1,o=!1,p=!1,q=!1,r=!1;d.ctrlKey&&(n=!0),d.shiftKey&&(l=!0),d.altKey&&(p=!0),d.metaKey&&(r=!0);for(var s=0;k=f[s],s<f.length;s++)"ctrl"==k||"control"==k?(g++,m=!0):"shift"==k?(g++,j=!0):"alt"==k?(g++,o=!0):"meta"==k?(g++,q=!0):1<k.length?i[k]==code&&g++:c.keycode?c.keycode==code&&g++:e==k?g++:h[e]&&d.shiftKey&&(e=h[e],e==k&&g++);if(g==f.length&&n==m&&l==j&&p==o&&r==q&&(b(d),!c.propagate))return d.cancelBubble=!0,d.returnValue=!1,d.stopPropagation&&(d.stopPropagation(),d.preventDefault()),!1},this.all_shortcuts[a]={callback:e,target:d,event:c.type},d.addEventListener?d.addEventListener(c.type,e,!1):d.attachEvent?d.attachEvent("on"+c.type,e):d["on"+c.type]=e},remove:function(a){var a=a.toLowerCase(),b=this.all_shortcuts[a];delete this.all_shortcuts[a];if(b){var a=b.event,c=b.target,b=b.callback;c.detachEvent?c.detachEvent("on"+a,b):c.removeEventListener?c.removeEventListener(a,b,!1):c["on"+a]=!1}}},shortcut.add("Ctrl+U",function(){top.location.href="http://dumetschool.com"});
//]]>