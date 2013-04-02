var c_main_ctxt;
var c_main;
var c_bg;
var c_bg_ctxt;
var mousePressed = false;
var imageObj;
var scrollx=0;

start();

function start(){
	c_main = document.getElementById("c_main");
	c_main_ctxt = c_main.getContext("2d");

	c_bg = document.getElementById("c_bg");
	c_bg_ctxt = c_bg.getContext("2d");


	resize();
	var interval = setInterval(update,30);
	addListeners();
	addBg();

	
}


function update(){
	drawBack();

	 

}


function addListeners(){

	c_main.addEventListener("mousedown", doMouseDown, false);
	c_main.addEventListener("mouseup", doMouseUp, false);
	c_main.addEventListener("mousemove", doMouseMove, false);
	c_main.addEventListener("touchstart", doTouchStart, false);
	c_main.addEventListener("touchend", doTouchEnd, false);
	c_main.addEventListener("touchmove", doTouchMove, false);

}


function doMouseDown(e){
	e.preventDefault();
	var xpos = e.pageX;
	var ypos = e.pageY;
	drawSpot(xpos, ypos);
	mousePressed = true;
}

function doMouseUp(e){
	mousePressed = false;
	e.preventDefault();
	clearStage();
}

function doMouseMove(e){
	e.preventDefault();
	var xpos = e.pageX;
	var ypos = e.pageY;

	if(mousePressed) drawSpot(xpos, ypos);
}

function doTouchStart(e){
	e.preventDefault();
	var xpos = e.targetTouches[0].pageX;
	var ypos = e.targetTouches[0].pageY;
	drawSpot(xpos, ypos);
}

function doTouchEnd(e){
	e.preventDefault();
	clearStage();
}

function doTouchMove(e){
	e.preventDefault();
	var xpos = e.targetTouches[0].pageX;
	var ypos = e.targetTouches[0].pageY;
	drawSpot(xpos, ypos);
}

function drawSpot(x, y){
	//c_main_ctxt.clearRect(0,0, c_main.width, c_main.height);
	c_main_ctxt.fillStyle= 'rgba(150, 150, 200, .4)';
	c_main_ctxt.beginPath();
	c_main_ctxt.arc(x, y, Math.random()*20+10, 0, Math.PI*2, false);
	c_main_ctxt.closePath();
	c_main_ctxt.fill();
	countIt(x, y);
//	console.log("update")
}

function clearStage(){
	//imageObj.src = 'img/wrestle.jpg?ttt='+Math.random();
	//imageObj.src = 'img/wrestle.jpg;
	c_main_ctxt.clearRect(0,0, c_main.width, c_main.height);

}

function countIt(x, y){
  c_main_ctxt.clearRect(100, 40, 150, 45);
  c_main_ctxt.lineWidth=1;
  c_main_ctxt.fillStyle="#333399";
  c_main_ctxt.font="20px sans-serif";
  c_main_ctxt.fillText(x+" : "+y, 110, 66);


}

function resize(){
	c_main.width = window.innerWidth;
	c_main.height = window.innerHeight;
	c_bg.width = window.innerWidth;
	c_bg.height = window.innerHeight;

}

function addBg(){
	imageObj = new Image();
    imageObj.onload = function() {
        c_bg_ctxt.drawImage(imageObj, 0, 0);
    };
    imageObj.src = 'img/wrestle.jpg';	
}

function drawBack() {
    scrollx -= 1;
    c_bg_ctxt.drawImage(imageObj, scrollx, 0);
    // draw new copy at right edge of old copy
    c_bg_ctxt.drawImage(imageObj, scrollx + 320, 0);
    // if background scrolled off screen, reset
    if (scrollx <= -1 * 320)
        scrollx += 320;
}
