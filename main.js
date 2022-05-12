song = "";
status = "";
object=[];

function preload() {
    img = loadImage('dog_cat.jpg');

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "status:detecting objects";

}

function modelloaded() {
    console.log("modelloaded");
    status = true;
    
}

    function draw() {
    image(video, 0, 0, 640, 420);
    if(status!="")
    {
        objectDetector.detect(video, gotResult);
        r=random(255);
        g=random(255);
        b=random(255);

        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML = "status: objects detected";
            

            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if (object[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="baby found";
                console.log("stop");
               
            }
            else{document.getElementById("number_of_objects").innerHTML="baby is not found";
        console.log("play");
    
}
            
                    }
                    if(object.length==0){
                        document.getElementById("number_of_objects").innerHTML="baby is not found";
                        console.log("play");
                    
                    }
    }



}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
object=results;

    }
}