function svg(){
document.getElementById('svg01o').innerHTML = fnsvg01;
}
window.addEventListener("load", svg, false);

//---------- svg01 ---------------------------------------------
var svg01 = document.getElementById('svg01');
function fnsvg01(){
var p=Snap("#svg01");
style = {stroke: "red", strokeWidth: 3}
var a = p.circle(10,10,5).attr({fill: "blue"});
var b = p.rect(5,20,20,10).attr(style);
var c = p.ellipse(15,40,10,5);
var gr= p.group(a,b,c); gr.drag();
}
svg01.addEventListener("click", fnsvg01, false);
