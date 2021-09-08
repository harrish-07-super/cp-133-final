img = "";
status = "";
object = [];

function back() {
    window.location = "enter.html";
}

function preload() {
    img = loadImage("images.jpg");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded() {
    console.log("Model is loaded!#");
    status = true;
    objectDetector.detect(img, gotresult);
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
    image(img, 0, 0, 600, 400);

    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status :Objects detected";

            fill("#FF0000");
            stroke("#FF0000");
            noFill();
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 90, object[i].y + 90);
            rect(object[i].x + 80, object[i].y + 80, object[i].width + 50, object[i].height + 100);
        }
    }

}