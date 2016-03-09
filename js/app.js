//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
//in js couldve done: document.getElementByTagName("canvas")[0]
var lastEvent; //global variable
//if you go in console and type lastEvent you can inspect
//lots of properties ex offset y, offset x

var mouseDown = false;

//When clicking on control list items
$(".controls").on("click", "li", function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});
  
//When "New Color" is pressed
$("#revealColorSelect").click(function(){
  //Show color select or hide the color select
  changeColor();
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function(){
  //Append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});




$canvas.mousedown(function(e){
  lastEvent = e; //store last event (mouse down)
  mouseDown = true;
}).mousemove(function(e){
  //when we start moving, Draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke(); //draw the line from those coordinates
    lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});



