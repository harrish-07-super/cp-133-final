img2 = "";
status = "";
object = [];

function back() {
    window.location = "enter.html";
}

function preload() {
    img2 = loadImage("image2.jpg");
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
    objectDetector.detect(img2, gotresult);
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
    image(img2, 0, 0, 600, 400);

    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status :Objects detected";

            fill("#FF0000");
            stroke("#FF0000");
            noFill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x - 100, object[i].y - 200);
            rect(object[i].x - 500, object[i].y - 200, object[i].width + 150, object[i].height - 75);
        }
    }

}