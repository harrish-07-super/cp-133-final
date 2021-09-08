img3 = "";
status = "";
object = [];

function back(){
    window.location="enter.html";
}

function preload() {
    img3 = loadImage("image3.jpg");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status : Detecting objects";
}

function modelLoaded(){
    console.log("Model is loaded!#");
    status = true;
    objectDetector.detect(img3, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(img3, 0, 0, 600, 400);

    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status :Objects detected";

            fill("#FF0000");
            stroke("#FF0000");
            noFill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}