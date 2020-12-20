var ball,ball_pos;
var database,position;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    ball = createSprite(250,250,20,20);
    ball.shapeColor = "red";
    ball_pos = database.ref('ball/position');
    ball_pos.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-5,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(5,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-5);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+5);
        }
        drawSprites();
    }
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x+x,
        'y' : position.y+y
    })
}


function readPosition(data){
    position = data.val();
    console.log(position.x);
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("Error in writing to the database");
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}