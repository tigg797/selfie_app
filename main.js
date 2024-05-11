var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var camera = document.getElementById("camera");

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event) {
    console.log(event); 

    var Content = event.results[0][0].transcript;
    console.log(Content);
    if(Content == "take my selfie") {
        console.log("Taking a selfie.")
        speak();
    }
    document.getElementById("textbox").innerHTML = Content;
    speak();
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src ;
    link.href = image;
    link.click();
}

Webcam.set({
    height: 250,
    width: 360,
    image_format: "jpg",
    jpg_quality: 100
});

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='selfie_image' src='"+data_uri+"'>";
    });
}

function speak() {
    var synth = window.speechSynthesis; 
    var inthebox = document.getElementById("textbox").value;
    var whatsaid;
    if(inthebox == "take my selfie") {
        var whatsaid = "taking your selfie in five seconds"
    }
    else {
        var whatsaid = inthebox
    }
    var utterthis = new SpeechSynthesisUtterance(whatsaid);
    synth.speak(utterthis);
    
    Webcam.attach(camera);
    setTimeout(function() {
        take_snapshot();
        save();
    }, 5000);
}



