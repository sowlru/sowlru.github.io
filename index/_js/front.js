function init(){
document.getElementById('d101o').innerHTML = fn101;
document.getElementById('d660o').innerHTML = fn660;
document.getElementById('d701o').innerHTML = fn701;
document.getElementById('d702o').innerHTML = fn702;
document.getElementById('d703o').innerHTML = fn703;
document.getElementById('d704o').innerHTML = fn704;
document.getElementById('d705o').innerHTML = fn705+" "+fn705_;
document.getElementById('d706o').innerHTML = fn706+" "+fn706_;
document.getElementById('d707o').innerHTML = fn707;

document.getElementById('d710o').innerHTML = fn710;
document.getElementById('d720o').innerHTML = fn720;
document.getElementById('d730o').innerHTML = fn730;
document.getElementById('d740o').innerHTML = fn740;
}
// object Mat -------------------------------------------------------
function Mat(n, f){this.n=n; this.f=f; }
var m1 = new Mat("a2", 10); var m1t2 = new Mat("a2", 11);
var m2 = new Mat("a7", 20); var m2t2 = new Mat("a7", 21);

// Lesson 101 -------------------------------------------------------
var d101 = document.getElementById('d101');
function fn101(){var s="alex"; var out = s;  d101.innerHTML = out;}
d101.addEventListener("click", fn101, false);

// Lesson 660 -------------------------------------------------------
var d660 = document.getElementById('d660');
function fn660(){var out="x: "+event.x+" "+"tar: "+event.target.tagName;  d660.innerHTML = out;}
window.addEventListener("load", fn660, false);
d660.addEventListener("click", fn660, false);

// Lesson 701 -------------------------------------------------------
var d701 = document.getElementById('d701');
function fn701(){var seld = d701.selectedIndex; 
var opt = d701.options; var out= opt[seld].text;
document.getElementById('d701_').innerHTML = out;}
d701.addEventListener("change", fn701, false);

// Lesson 702 -------------------------------------------------------
var d702 = document.getElementById('d702');
function fn702(){var seld = d702.selectedIndex; var opt = d702.options;
switch(opt[seld].text){
	case 'm1': mn=m1.n; mf=m1.f; break;
	case 'm2': mn=m2.n; mf=m2.f; break;
}
var out = mn+" "+mf+" "+seld+" "+d702.length;
document.getElementById('d702_').innerHTML = out;}
d702.addEventListener("change", fn702, false);

// Lesson 703 -------------------------------------------------------
var d703 = document.getElementById('d703'); var d703_ = document.getElementById('d703_');
function fn703(){var mat = {m1:"a2", m2:"a7"};
for(var matName in mat) {var o=new Option(); o.value=mat[matName]; o.text=matName; d703_.add(o);}}
d703.addEventListener("click", fn703, false);

// Lesson 704 -------------------------------------------------------
var d704 = document.getElementById('d704'); var d704_ = document.getElementById('d704_');
function fn704(){ d704_.innerHTML=""; 
		 if(d704.value=="t1"){var oAr=["|","m3|m3","m4|m4"];}
else if(d704.value=="t2"){var oAr=["|","m5|m5","m6|m6"];}

for(var o in oAr) {var pair=oAr[o].split("|"); var newO=document.createElement("option"); 
newO.value=pair[0]; newO.innerHTML=pair[1]; d704_.options.add(newO);}}

// Lesson 705 -------------------------------------------------------
var d705 = document.getElementById('d705'); var d705_ = document.getElementById('d705_');
function fn705(){ d705_.innerHTML="";
switch(d705.value){
	case 'm1': var oAr=["|","m1|t1","m1t2|t2"]; break;
	case 'm2': var oAr=["|","m2|t1","m2t2|t2"]; break; }
for(var o in oAr) {var pair=oAr[o].split("|"); var newO=document.createElement("option"); 
newO.value=pair[0]; newO.innerHTML=pair[1]; d705_.options.add(newO);}
document.getElementById('d705_2').innerHTML = ""; }
d705.addEventListener("change", fn705, false);

function fn705_(){var seld = d705_.selectedIndex; var opt = d705_.options; var mn=0, mf=0;
switch(opt[seld].value){
	case 'm1': mn=m1.n; mf=m1.f; break; case 'm1t2': mn=m1t2.n; mf=m1t2.f; break;  
	case 'm2': mn=m2.n; mf=m2.f; break; case 'm2t2': mn=m2t2.n; mf=m2t2.f; break;	
}
var out = mn+" "+mf; document.getElementById('d705_2').innerHTML = out; }
d705_.addEventListener("change", fn705_, false);

// Lesson 706 -------------------------------------------------------
var d706 = document.getElementById('d706'); var d706_ = document.getElementById('d706_');
function fn706(){ d706_.innerHTML="";
switch(d706.value){
	case 'm1': var oAr=["|","m1|032","m1|036","m1t2|040"]; break;
	case 'm2': var oAr=["|","m2|032","m2|036","m2t2|040"]; break; }
for(var o in oAr) {var pair=oAr[o].split("|"); var newO=document.createElement("option"); 
newO.value=pair[0]; newO.innerHTML=pair[1]; d706_.options.add(newO);}
document.getElementById('d706_2').innerHTML = ""; }
d706.addEventListener("change", fn706, false);

function fn706_(){var seld = d706_.selectedIndex; var opt = d706_.options; var mn=0, mf=0;
switch(opt[seld].value){
	case 'm1': mn=m1.n; mf=m1.f; break; case 'm1t2': mn=m1t2.n; mf=m1t2.f; break;  
	case 'm2': mn=m2.n; mf=m2.f; break; case 'm2t2': mn=m2t2.n; mf=m2t2.f; break;	}
var thk=opt[seld].text*1/1000; var P=mf*thk;
var out = mn+": "+mf+"*"+thk+"="+P.toFixed(2);
document.getElementById('d706_2').innerHTML = out; }
d706_.addEventListener("change", fn706_, false);

// Lesson 707 -------------------------------------------------------
var d707 = document.getElementById('d707'); var d707_ = document.getElementById('d707_');
function fn707(){ d707_.innerHTML=""; var thk=d707_.value; var mn=0, mf=0;
switch(d707.value){
	case 'm1': if (thk < 0.038) {mn=m1.n; mf=m1.f;} else if (thk < 0.10) {mn=m1t2.n; mf=m1t2.f;} break;
	case 'm2': if (thk < 0.038) {mn=m2.n; mf=m2.f;} else if (thk < 0.10) {mn=m2t2.n; mf=m2t2.f;} break;}
var P707=mf*thk; var out = mn+": "+mf+"*"+thk+"="+P707.toFixed(2);
document.getElementById('d707_2').innerHTML = out;}
d707.addEventListener("change", fn707, false); d707_.addEventListener("change", fn707, false);

// Lesson 710 -------------------------------------------------------
var d710 = document.getElementById('d710');
function fn710(){ var out = d710.value*2;
document.getElementById('d710_').innerHTML = out;}
window.addEventListener("load", fn710, false);
d710.addEventListener("change", fn710, false);

// Lesson 720 -------------------------------------------------------
var d720 = document.getElementById('d720');
function fn720(){ var out; if(d720.checked){out = 1;}else{out = 0;}
document.getElementById('d720_').innerHTML = out;}
window.addEventListener("load", fn720, false);
d720.addEventListener("change", fn720, false);

// Lesson 730 -------------------------------------------------------
var d730 = document.getElementsByName('d730');
function fn730(){ 
	for(var i=0; i < d730.length; i++){
		if(d730[i].checked) var out=d730[i].value;
		d730[i].addEventListener("click", fn730, false);

	}
	document.getElementById('d730_').innerHTML = out;
}
window.addEventListener("load", fn730, false);

// Lesson 740 -------------------------------------------------------
var d740 = document.getElementById('d740');
function fn740(){var out=d740.value; 
document.getElementById('d740_').innerHTML = out;}
window.addEventListener("load", fn740, false);
d740.addEventListener("change", fn740, false);