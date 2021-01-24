var x1,x2,x3,x4, y1,y2,y3,y4, z1, z2, z3, z4, k0, b0, x1n,x2n,x3n;
//========================================================== par1 =========================================================
function fn_01(){
	var out;
	x1=document.getElementById("x1_in").value*1; y1=document.getElementById("y1_in").value*1; z1=document.getElementById("z1_in").value*1;
	x2=document.getElementById("x2_in").value*1; y2=document.getElementById("y2_in").value*1; z2=document.getElementById("z2_in").value*1;
	x3=document.getElementById("x3_in").value*1; y3=document.getElementById("y3_in").value*1; z3=document.getElementById("z3_in").value*1;
	x4=document.getElementById("x4_in").value*1; y4=document.getElementById("y4_in").value*1; z4=document.getElementById("z4_in").value*1;
	document.getElementById("input1").innerHTML = "p1=["+x1+","+y1+"] | p2=["+x2+","+y2+"] | p3=["+x3+","+y3+"] | p4=["+x4+","+y4+"]";

	var k1=document.getElementById("k1_in").value*1; // enter any k for first approximation
	var  a=document.getElementById("a_in").value*1; // alpha - convergence speed
//--- 2 points	
	var dy=y1-y2; var dx=x1-x2; var k=dy/dx;  var b=y1-k*x1;
	document.getElementById("ml01_33").innerHTML = y1+"=k*"+x1+"+b | "+y2+"=k*"+x2+"+b";
	document.getElementById("ml01_34").innerHTML = y1+"-*"+y2+"=k*"+x1+"+b-k*"+x2+"-b => "+dy+"=k*"+dx+" | <b>k="+(k).toFixed(1)+"</b>";
	document.getElementById("ml01_35").innerHTML = y1+"="+k+"*"+x1+"-b => b="+y1+"-"+k+"*"+x1+" | <b>b="+(b).toFixed(1)+"</b>";
//--- 1 parameter for 3 points
	var s1=k1*x1-y1; var s2=k1*x2-y2;  var s3=k1*x3-y3; var sum=s1+s2+s3; var sum2=(sum*sum).toFixed(1);
	document.getElementById("ml01_43").innerHTML = "J=(1/6)*(("+k1+"*"+x1+"-"+y1+")+("+k1+"*"+x2+"-"+y2+")+("+k1+"*"+x3+"-"+y3+"))^2 = (1/6)*("+(s1).toFixed(1)+"+"+(s2).toFixed(1)+"+"+(s3).toFixed(1)+")^2 = (1/6)*("+(sum).toFixed(1)+")^2 = "+sum2+"/6 = "+fn_J(k1);
	
	var sx1=s1*x1; var sx2=s2*x2; var sx3=s3*x3; var sumx=sx1+sx2+sx3;
	document.getElementById("ml01_44").innerHTML = "dJ=(1/3)*(("+k1+"*"+x1+"-"+y1+")*"+x1+"+("+k1+"*"+x2+"-"+y2+")*"+x2+"+("+k1+"*"+x3+"-"+y3+")*"+x3+" = (1/3)*("+(sx1).toFixed(1)+(sx2).toFixed(1)+(sx3).toFixed(1)+") = "+(sumx).toFixed(1)+"/3 = "+fn_dJ(k1);
	
	var k1_ = k1-(a*fn_dJ(k1));
	document.getElementById("ml01_45").innerHTML = "k = k-(a*dJ) = "+(k1)+"-("+a+"*"+fn_dJ(k1)+") ="+k1_;
	
	var i=1, out="<br>"; var k=k1*1;
	for(i=1; i<=10; i++){
		out += "k="+(k).toFixed(2)+ " | J="+fn_J(k)+" | dJk"+fn_dJ(k)+" | ";
		k = k -(a*fn_dJ(k));
		switch(i%1){ case 0: out += "<br>"; }
	} 
	document.getElementById("ml01_47").innerHTML = out;
}
window.addEventListener("load", fn_01, false);
document.getElementById("x1_in").addEventListener("change", fn_01, false);
document.getElementById("k1_in").addEventListener("change", fn_01, false);
document.getElementById("a_in").addEventListener("change", fn_01, false);


function fn_J(k) { var sum=(k*x1-y1)+(k*x2-y2)+(k*x3-y3); return (sum*sum/6).toFixed(2); }
function fn_dJ(k){ var sum=(k*x1-y1)*x1+(k*x2-y2)*x2+(k*x3-y3)*x3; return (sum/3).toFixed(2); }

//========================================================== par2 =========================================================
function fn_02(){
//--- input
	k0=document.getElementById("k2").value*1; 		b0=document.getElementById("b2").value*1;
	var ak=document.getElementById("ak").value*1;	var ab=document.getElementById("ab").value*1;
//--- find J
	var s1=k0*x1+b0-y1; var s2=k0*x2+b0-y2; var s3=k0*x3+b0-y3; var sumq=s1*s1+s2*s2+s3*s3;
	document.getElementById("ml01_54").innerHTML = "J=(1/6)*(("+k0+"*"+x1+"+"+b0+"-"+y1+")^2+("+k0+"*"+x2+"+"+b0+"-"+y2+")^2+("+k0+"*"+x3+"+"+b0+"-"+y3+")^2) = (1/6)*("+(s1).toFixed(1)+"^2+"+(s2).toFixed(1)+"^2+"+(s3).toFixed(1)+"^2) = "+(sumq).toFixed(1)+"/6 = "+(fn_Jlin(k0,b0)).toFixed(2);
//--- find dJ/dk	
	var sx1=(s1*x1).toFixed(1); var sx2=(s2*x2).toFixed(1); var sx3=(s3*x3).toFixed(1); var sumx=sx1*1+sx2*1+sx3*1;
	document.getElementById("ml01_55").innerHTML = "dJ/dk=(1/3)*(("+k0+"*"+x1+"+"+b0+"-"+y1+")*"+x1+"+("+k0+"*"+x2+"+"+b0+"-"+y2+")*"+x2+"+("+k0+"*"+x3+"+"+b0+"-"+y3+")*"+x3+" = (1/3)*("+sx1+sx2+sx3+") = "+(sumx).toFixed(1)+"/3 = "+(fn_dJk(k0,b0)).toFixed(2);
//--- find dJ/db
	var sum=s1+s2+s3;
	document.getElementById("ml01_56").innerHTML = "dJ/db=(1/3)*(("+k0+"*"+x1+"+"+b0+"-"+y1+")+("+k0+"*"+x2+"+"+b0+"-"+y2+")+("+k0+"*"+x3+"+"+b0+"-"+y3+")) = (1/3)*("+(s1).toFixed(1)+"+"+(s2).toFixed(1)+"+"+(s3).toFixed(1)+") = "+(sum).toFixed(1)+"/3 = "+(fn_dJb(k0,b0)).toFixed(2);
//--- new coef
	var k_ =(k0-(ak*fn_dJk(k0,b0))).toFixed(2); document.getElementById("ml01_57").innerHTML = "k = k-(a*dJ/dk) = "+k0+"-("+ak+"*"+(fn_dJk(k0,b0)).toFixed(2)+") ="+k_;
	var b_ =(b0-(ab*fn_dJb(k0,b0))).toFixed(2);	document.getElementById("ml01_58").innerHTML = "b = b-(a*dJ/db) = "+b0+"-("+ab+"*"+(fn_dJb(k0,b0)).toFixed(2)+") ="+b_;
//--- table for k, dJ/dk, b, dJ/db, J
	var out="<br>"; var k=k0; var b=b0;
	var fi=document.getElementById("ml01_58b").value*1; //fi - final i, iteration number
	for(var i=1; i<=fi; i++){
		out += "k="+(k).toFixed(2)+ " | b="+(b).toFixed(2)+" | J="+(fn_Jlin(k,b)).toFixed(3)+" | ";
		out += "dJk="+(fn_dJk(k,b)).toFixed(3)+" | ";
		out += "dJb="+(fn_dJb(k,b)).toFixed(3)+" | ";
		temp_b = b-ab*fn_dJb(k,b); temp_k = k-ak*fn_dJk(k,b);
		b=temp_b; k=temp_k; 
		switch(i%1){ case 0: out += "<br>"; }
	}
	document.getElementById("ml01_59").innerHTML = out;
}
window.addEventListener("load", fn_02, false);
document.getElementById("k2").addEventListener("change", fn_02, false);
document.getElementById("b2").addEventListener("change", fn_02, false);
document.getElementById("ak").addEventListener("change", fn_02, false);
document.getElementById("ab").addEventListener("change", fn_02, false);
document.getElementById("ml01_58b").addEventListener("change", fn_02, false);

function fn_Jlin(k,b) { var s1=(k*x1+b-y1); var s2=(k*x2+b-y2); var s3=(k*x3+b-y3); return (s1*s1+s2*s2+s3*s3)/6; }
function fn_dJk(k,b){ var sum=(k*x1+b-y1)*x1+(k*x2+b-y2)*x2+(k*x3+b-y3)*x3; return sum/3; }
function fn_dJb(k,b){ var sum=(k*x1+b-y1)+(k*x2+b-y2)+(k*x3+b-y3); return sum/3; }

//========================================================== par2 matrix =========================================================
function fn_02m(){

	var X=[]; 	X.push(x1); X.push(x2); X.push(x3); 
	var Y=[]; 	Y.push(y1); Y.push(y2); Y.push(y3);
	var th=[]; 	th.push(b0); th.push(k0);
	var out="X=[";
	for(var i=0; i < X.length; i++){out += X[i]+", ";} out += "]; Y=[";
	for(var j=0; j < Y.length; j++){out += Y[j]+", ";} out += "]; th=[";
	for(var k=0; k < th.length; k++){out += th[k]+", ";} out += "]";
	document.getElementById("p2m_01").innerHTML = out;
	
	document.getElementById("p2m_02").innerHTML = "Привести матрицу Х к размерности [m*2]";
	
}
window.addEventListener("load", fn_02m, false);

//========================================================== par2 norm =========================================================
function fn_02b(){
	var ak=document.getElementById("2b_ak").value*1;	var ab=document.getElementById("2b_ab").value*1;
//--- find x mean
	var m=(x1+x2+x3)/3;
	document.getElementById("ml02_1").innerHTML = "m = ("+x1+"+"+x2+"+"+x3+")/3 = "+(m).toFixed(2);
//--- find x standart deviation
	var std=Math.sqrt(((x1-m)*(x1-m)+(x2-m)*(x2-m)+(x3-m)*(x3-m))/2);
	document.getElementById("ml02_2").innerHTML = "std = sqrt((("+x1+"-"+(m).toFixed(2)+")^2 + ("+x2+"-"+(m).toFixed(2)+")^2 + ("+x3+"-"+(m).toFixed(2)+")^2)/2) = "+(std).toFixed(2);
//--- normalized x
	x1n=(x1-m)/std; x2n=(x2-m)/std; x3n=(x3-m)/std;
	document.getElementById("ml02_3").innerHTML = "x1 = "+(x1n).toFixed(2)+" | x2 = "+(x2n).toFixed(2)+" | x3 = "+(x3n).toFixed(2);
//--- find J
	var s1n=k0*x1n+b0-y1; var s2n=k0*x2n+b0-y2; var s3n=k0*x3n+b0-y3; var sumqn=s1n*s1n+s2n*s2n+s3n*s3n;
	document.getElementById("ml02_7").innerHTML = "J=(1/6)*(("+
	k0+"*"+(x1n).toFixed(2)+"+"+b0+"-"+(y1).toFixed(2)+")^2+("+
	k0+"*"+(x2n).toFixed(2)+"+"+b0+"-"+(y2).toFixed(2)+")^2+("+
	k0+"*"+(x3n).toFixed(2)+"+"+b0+"-"+(y3).toFixed(2)+")^2) = (1/6)*("+(s1n).toFixed(1)+"^2+"+(s2n).toFixed(1)+"^2+"+(s3n).toFixed(1)+"^2) = "+(sumqn).toFixed(1)+"/6 = "+(fn_JlinN(k0,b0)).toFixed(2);
//--- find dJ/dk	
	var sx1n=s1n*x1n; var sx2n=s2n*x2n; var sx3n=s3n*x3n; var sumxN=sx1n+sx2n+sx3n;
	document.getElementById("ml02_8").innerHTML = "dJ/dk=(1/3)*(("+
	k0+"*"+(x1n).toFixed(2)+"+"+b0+"-"+(y1).toFixed(2)+")*"+(x1n).toFixed(2)+"+("+
	k0+"*"+(x2n).toFixed(2)+"+"+b0+"-"+(y2).toFixed(2)+")*"+(x2n).toFixed(2)+"+("+
	k0+"*"+(x3n).toFixed(2)+"+"+b0+"-"+(y3).toFixed(2)+")*"+(x3n).toFixed(2)+" = (1/3)*("+(sx1n).toFixed(2)+"+"+(sx2n).toFixed(2)+"+"+(sx3n).toFixed(2)+") = "+(sumxN).toFixed(1)+"/3 = "+(fn_dJkN(k0,b0)).toFixed(2);
//--- find dJ/db	
	var sumN=s1n+s2n+s3n;
	document.getElementById("ml02_9").innerHTML = "dJ/db=(1/3)*(("+
	k0+"*"+(x1n).toFixed(2)+"+"+b0+"-"+(y1).toFixed(2)+")+("+
	k0+"*"+(x2n).toFixed(2)+"+"+b0+"-"+(y2).toFixed(2)+")+("+
	k0+"*"+(x3n).toFixed(2)+"+"+b0+"-"+(y3).toFixed(2)+")) = (1/3)*("+(s1n).toFixed(2)+"+"+(s2n).toFixed(2)+"+"+(s3n).toFixed(2)+") = "+(sumN).toFixed(1)+"/3 = "+(fn_dJbN(k0,b0)).toFixed(2);
//--- new coef
	var k_ =(k0-(ak*fn_dJkN(k0,b0))).toFixed(2); document.getElementById("ml02_10").innerHTML = "k = k-(a*dJ/dk) = "+k0+"-("+ak+"*"+(fn_dJkN(k0,b0)).toFixed(2)+") ="+k_;
	var b_ =(b0-(ab*fn_dJbN(k0,b0))).toFixed(2); document.getElementById("ml02_11").innerHTML = "b = b-(a*dJ/db) = "+b0+"-("+ab+"*"+(fn_dJbN(k0,b0)).toFixed(2)+") ="+b_;
//--- table for k, dJ/dk, b, dJ/db, J
	var out="<br>"; var k=k0; var b=b0;
	var fi=document.getElementById("2b_i").value*1; //fi - final i, iteration number
	for(var i=1; i<=fi; i++){
		out += "k="+(k).toFixed(2)+ " | b="+(b).toFixed(2)+" | J="+(fn_JlinN(k,b)).toFixed(3)+" | ";
		out += "dJk="+(fn_dJkN(k,b)).toFixed(3)+" | ";
		out += "dJb="+(fn_dJbN(k,b)).toFixed(3)+" | ";
		temp_b = b-ab*fn_dJbN(k,b); temp_k = k-ak*fn_dJkN(k,b);
		b=temp_b; k=temp_k; 
		switch(i%1){ case 0: out += "<br>"; }
	}
	document.getElementById("ml02_13").innerHTML = out;
}
window.addEventListener("load", fn_02b, false);
document.getElementById("k2").addEventListener("change", fn_02b, false);
document.getElementById("b2").addEventListener("change", fn_02b, false);
document.getElementById("2b_ak").addEventListener("change", fn_02b, false);
document.getElementById("2b_ab").addEventListener("change", fn_02b, false);
document.getElementById("2b_i").addEventListener("change", fn_02b, false);

function fn_JlinN(k,b) { var s1=(k*x1n+b-y1); var s2=(k*x2n+b-y2); var s3=(k*x3n+b-y3); return (s1*s1+s2*s2+s3*s3)/6; }
function fn_dJkN(k,b){ var sum=(k*x1n+b-y1)*x1n+(k*x2n+b-y2)*x2n+(k*x3n+b-y3)*x3n; return sum/3; }
function fn_dJbN(k,b){ var sum=(k*x1n+b-y1)+(k*x2n+b-y2)+(k*x3n+b-y3); return sum/3; }

//========================================================== par2 4 points =========================================================
function fn_02c(){
//--- input
	k0=document.getElementById("2c_k2").value*1; 		b0=document.getElementById("2c_b2").value*1;
	var ak=document.getElementById("2c_ak").value*1;	var ab=document.getElementById("2c_ab").value*1;
	var akn=document.getElementById("2c_akn").value*1;	var abn=document.getElementById("2c_abn").value*1;
//--- find J
	var s1=k0*x1+b0-y1; var s2=k0*x2+b0-y2; var s3=k0*x3+b0-y3; var s4=k0*x4+b0-y4; var sumq=s1*s1+s2*s2+s3*s3+s4*s4;
	document.getElementById("2c_1").innerHTML = "J = (1/8)*("+(s1).toFixed(1)+"^2+"+(s2).toFixed(1)+"^2+"+(s3).toFixed(1)+"^2+"+(s4).toFixed(1)+"^2) = "+(sumq).toFixed(1)+"/8 = "+(fn_Jlin4(k0,b0)).toFixed(2);
//--- find dJ/dk	
	var sx1=s1*x1; var sx2=s2*x2; var sx3=s3*x3; var sx4=s4*x4; var sumx=sx1+sx2+sx3+sx4;
	document.getElementById("2c_2").innerHTML = "dJ/dk = (1/4)*("+(sx1).toFixed(1)+"+"+(sx2).toFixed(1)+"+"+(sx3).toFixed(1)+"+"+(sx4).toFixed(1)+") = "+(sumx).toFixed(1)+"/4 = "+(fn_dJk4(k0,b0)).toFixed(2);
//--- find dJ/db
	var sum=s1+s2+s3+s4;
	document.getElementById("2c_3").innerHTML = "dJ/db = (1/4)*("+(s1).toFixed(1)+"+"+(s2).toFixed(1)+"+"+(s3).toFixed(1)+"+"+(s4).toFixed(1)+") = "+(sum).toFixed(1)+"/4 = "+(fn_dJb4(k0,b0)).toFixed(2);
//--- new coef
	var k_ =(k0-(ak*fn_dJk4(k0,b0))).toFixed(2); 	document.getElementById("2c_4").innerHTML = "k = k-(a*dJ/dk) = "+k0+"-("+ak+"*"+(fn_dJk4(k0,b0)).toFixed(2)+") ="+k_;
	var b_ =(b0-(ab*fn_dJb4(k0,b0))).toFixed(2);	document.getElementById("2c_5").innerHTML = "b = b-(a*dJ/db) = "+b0+"-("+ab+"*"+(fn_dJb4(k0,b0)).toFixed(2)+") ="+b_;
//--- table for k, dJ/dk, b, dJ/db, J
	var out="<br>"; var k=k0; var b=b0;
	var fi=document.getElementById("2c_i").value*1; //fi - final i, iteration number
	for(var i=1; i<=fi; i++){
		out += "k="+(k).toFixed(2)+ " | b="+(b).toFixed(2)+" | J="+(fn_Jlin4(k,b)).toFixed(3)+" | ";
		out += "dJk="+(fn_dJk4(k,b)).toFixed(3)+" | ";
		out += "dJb="+(fn_dJb4(k,b)).toFixed(3)+" | ";
		temp_b = b-ab*fn_dJb4(k,b); temp_k = k-ak*fn_dJk4(k,b);
		b=temp_b; k=temp_k; 
		switch(i%1){ case 0: out += "<br>"; }
	}
	document.getElementById("2c_6").innerHTML = out;
//--- find x mean
	var m=(x1+x2+x3+x4)/4;
	document.getElementById("2c_11").innerHTML = "m = ("+x1+"+"+x2+"+"+x3+"+"+x4+")/4 = "+(m).toFixed(2);
//--- find x standart deviation
	var std=Math.sqrt(((x1-m)*(x1-m)+(x2-m)*(x2-m)+(x3-m)*(x3-m)+(x4-m)*(x4-m))/3);
	document.getElementById("2c_12").innerHTML = "std = sqrt((("+x1+"-"+(m).toFixed(2)+")^2 + ("+x2+"-"+(m).toFixed(2)+")^2 + ("+x3+"-"+(m).toFixed(2)+")^2 + ("+x4+"-"+(m).toFixed(2)+")^2)/3) = "+(std).toFixed(2);
//--- normalized x
	x1n=(x1-m)/std; x2n=(x2-m)/std; x3n=(x3-m)/std; x4n=(x4-m)/std;
	document.getElementById("2c_13").innerHTML = "x1 = "+(x1n).toFixed(2)+" | x2 = "+(x2n).toFixed(2)+" | x3 = "+(x3n).toFixed(2)+" | x4 = "+(x4n).toFixed(2);
//--- find J
	var s1n=k0*x1n+b0-y1; var s2n=k0*x2n+b0-y2; var s3n=k0*x3n+b0-y3; var s4n=k0*x4n+b0-y4; var sumqn=s1n*s1n+s2n*s2n+s3n*s3n+s4n*s4n;
	document.getElementById("2c_14").innerHTML = "J = (1/8)*("+(s1n).toFixed(1)+"^2+"+(s2n).toFixed(1)+"^2+"+(s3n).toFixed(1)+"^2+"+(s4n).toFixed(1)+"^2) = "+(sumqn).toFixed(1)+"/8 = "+(fn_JlinN4(k0,b0)).toFixed(2);
//--- find dJ/dk	
	var sx1n=s1n*x1n; var sx2n=s2n*x2n; var sx3n=s3n*x3n; var sx4n=s4n*x4n; var sumxN=sx1n+sx2n+sx3n+sx4n;
	document.getElementById("2c_15").innerHTML = "dJ/dk = (1/4)*("+(sx1n).toFixed(2)+"+"+(sx2n).toFixed(2)+"+"+(sx3n).toFixed(2)+"+"+(sx4n).toFixed(2)+") = "+(sumxN).toFixed(1)+"/4 = "+(fn_dJkN4(k0,b0)).toFixed(2);
//--- find dJ/db	
	var sumN=s1n+s2n+s3n+s4n;
	document.getElementById("2c_16").innerHTML = "dJ/db = (1/4)*("+(s1n).toFixed(2)+"+"+(s2n).toFixed(2)+"+"+(s3n).toFixed(2)+"+"+(s4n).toFixed(2)+") = "+(sumN).toFixed(1)+"/4 = "+(fn_dJbN4(k0,b0)).toFixed(2);
//--- new coef
	var k_ =(k0-(akn*fn_dJkN4(k0,b0))).toFixed(2); document.getElementById("2c_17").innerHTML = "k = k-(a*dJ/dk) = "+k0+"-("+akn+"*"+(fn_dJkN(k0,b0)).toFixed(2)+") ="+k_;
	var b_ =(b0-(abn*fn_dJbN4(k0,b0))).toFixed(2); document.getElementById("2c_18").innerHTML = "b = b-(a*dJ/db) = "+b0+"-("+abn+"*"+(fn_dJbN(k0,b0)).toFixed(2)+") ="+b_;
//--- table for k, dJ/dk, b, dJ/db, J
	var out2="<br>"; var k2=k0; var b2=b0;
	var fin=document.getElementById("2c_in").value*1; //fi - final i, iteration number
	for(var i2=1; i2<=fin; i2++){
		out2 += "k="+(k2).toFixed(2)+ " | b="+(b2).toFixed(2)+" | J="+(fn_JlinN4(k2,b2)).toFixed(3)+" | ";
		out2 += "dJk="+(fn_dJkN4(k2,b2)).toFixed(3)+" | ";
		out2 += "dJb="+(fn_dJbN4(k2,b2)).toFixed(3)+" | ";
		temp_b2 = b2-abn*fn_dJbN4(k2,b2); temp_k2 = k2-akn*fn_dJkN4(k2,b2);
		b2=temp_b2; k2=temp_k2; 
		switch(i2%1){ case 0: out2 += "<br>"; }
	}
	document.getElementById("2c_19").innerHTML = out2;
}
window									.addEventListener("load", fn_02c, false);
document.getElementById("2c_k2")		.addEventListener("change", fn_02c, false);
document.getElementById("2c_b2")		.addEventListener("change", fn_02c, false);
document.getElementById("2c_ak")		.addEventListener("change", fn_02c, false);
document.getElementById("2c_ab")		.addEventListener("change", fn_02c, false);
document.getElementById("2c_i")			.addEventListener("change", fn_02c, false);
document.getElementById("2c_akn")		.addEventListener("change", fn_02c, false);
document.getElementById("2c_abn")		.addEventListener("change", fn_02c, false);
document.getElementById("2c_in")		.addEventListener("change", fn_02c, false);

function fn_Jlin4(k,b) { var s1=(k*x1+b-y1); var s2=(k*x2+b-y2); var s3=(k*x3+b-y3); var s4=(k*x4+b-y4); return (s1*s1+s2*s2+s3*s3+s4*s4)/8; }
function fn_dJk4(k,b){ var sum=(k*x1+b-y1)*x1+(k*x2+b-y2)*x2+(k*x3+b-y3)*x3+(k*x4+b-y4)*x4; return sum/4; }
function fn_dJb4(k,b){ var sum=(k*x1+b-y1)+(k*x2+b-y2)+(k*x3+b-y3)+(k*x4+b-y4); return sum/4; }
function fn_JlinN4(k,b) { var s1=(k*x1n+b-y1); var s2=(k*x2n+b-y2); var s3=(k*x3n+b-y3); var s4=(k*x4n+b-y4); return (s1*s1+s2*s2+s3*s3+s4*s4)/8; }
function fn_dJkN4(k,b){ var sum=(k*x1n+b-y1)*x1n+(k*x2n+b-y2)*x2n+(k*x3n+b-y3)*x3n+(k*x4n+b-y4)*x4n; return sum/4; }
function fn_dJbN4(k,b){ var sum=(k*x1n+b-y1)+(k*x2n+b-y2)+(k*x3n+b-y3)+(k*x4n+b-y4); return sum/4; }

//=========================================================== par1 log ===========================================================
function fn_03(){
//--- input
	var out;
	var k=document.getElementById("k3_in").value*1;
//--- h(x)
	document.getElementById("ml03_32").innerHTML = "h(x1)="+(fn_s1(0,k,0)).toFixed(2)+"; h(x2)="+(fn_s2(0,k,0)).toFixed(2)+"; h(x3)="+(fn_s3(0,k,0)).toFixed(2)+"; h(x4)="+(fn_s4(0,k,0)).toFixed(2);
//--- J	
	var sumJ1=fn_J1(0,k,0)+fn_J2(0,k,0)+fn_J3(0,k,0)+fn_J4(0,k,0);
	document.getElementById("ml03_33").innerHTML = "J = (1/4)*("+(fn_J1(0,k,0)).toFixed(2)+"+"+(fn_J2(0,k,0)).toFixed(2)+"+"+(fn_J3(0,k,0)).toFixed(2)+"+"+(fn_J4(0,k,0)).toFixed(2)+") = "+(sumJ1).toFixed(2)+"/4 = "+fn_Jlog(0,k,0).toFixed(2);
//--- dJ1
	var xtzx1=(fn_s1(0,k,0)-z1)*x1; var xtzx2=(fn_s2(0,k,0)-z2)*x2; var xtzx3=(fn_s1(0,k,0)-z3)*x3; var xtzx4=(fn_s1(0,k,0)-z4)*x4;
	document.getElementById("ml03_34").innerHTML = "dJ1 = 1/4*(("+(fn_s1(0,k,0)).toFixed(2)+"-"+z1+")*"+x1+"+("+(fn_s2(0,k,0)).toFixed(2)+"-"+z2+")*"+x2+"+("+(fn_s3(0,k,0)).toFixed(2)+"-"+z3+")*"+x3+"+("+(fn_s4(0,k,0)).toFixed(2)+"-"+z4+")*"+x4+") = 1/4*("+(xtzx1).toFixed(2)+"+"+(xtzx2).toFixed(2)+"+"+(xtzx3).toFixed(2)+"+"+(xtzx4).toFixed(2)+") = "+(fn_dJ1(0,k,0)).toFixed(2);
//--- new alpha
	var a=document.getElementById("a3_in").value*1;
	var k_ =(k-(a*fn_dJ1(0,k,0))).toFixed(2); document.getElementById("ml03_36").innerHTML = "k = k-(a*dJ1) = "+k+"-("+a+"*"+(fn_dJ1(0,k,0)).toFixed(2)+") = "+k_;
//--- table 
	var out="<br>"; var t1=k;
	var fi=document.getElementById("i2").value*1; //fi - final i, iteration number
	for(var i=1; i<=fi; i++){
		out += (t1).toFixed(2)+" | ";
		out += (fn_J1(0,t1,0)).toFixed(2)+", ";
		out += (fn_J2(0,t1,0)).toFixed(2)+", ";
		out += (fn_J3(0,t1,0)).toFixed(2)+", ";
		out += (fn_J4(0,t1,0)).toFixed(2)+" | ";		
		out += "J="+(fn_Jlog(0,t1,0)).toFixed(5)+" | ";
		out += (fn_dJ1(0,t1,0)).toFixed(2)+" | ";
		temp_t1 = t1-a*fn_dJ1(0,t1,0);
		t1=temp_t1;
		switch(i%1){ case 0: out += "<br>"; }
	}
	document.getElementById("ml03_38").innerHTML = out;	
}
window.addEventListener("load", fn_03, false);
document.getElementById("k3_in").addEventListener("change", fn_03, false);
document.getElementById("a3_in").addEventListener("change", fn_03, false);
function fn_Jlog1(xt,y) { return (-y*Math.log(fn_sig(xt))-(1-y)*Math.log(1-fn_sig(xt))).toFixed(4); }

//========================================================== par2 log =========================================================
function fn_03b(){
//--- input
	var th0=document.getElementById("th0").value*1;
	var th1=document.getElementById("th1").value*1;
	var th2=document.getElementById("th2").value*1;	
//--- h(x1)
	var xt1=fn_xt1(th0,th1,th2); var ext1=Math.pow(Math.E, -xt1);
	document.getElementById("ml03b_1").innerHTML = "xt1=X*theta1 = 1*"+th0+"+"+x1+"*"+th1+"+"+y1+"*"+th2+"="+(fn_xt1(th0,th1,th2)).toFixed(1);
	document.getElementById("ml03b_2").innerHTML = "h(xt1) = 1/(1+e^(-xt1)) = 1/(1+"+(ext1).toFixed(4)+")="+(fn_s1(th0,th1,th2)).toFixed(12);
//--- J1
	var lg_h1=Math.log(fn_s1(th0,th1,th2)); var z_1=1-z1; var lg_1h1=Math.log(1-fn_s1(th0,th1,th2));
	document.getElementById("ml03b_3").innerHTML = "-"+z1+"*ln("+(fn_s1(th0,th1,th2)).toFixed(4)+")-(1-"+z1+")*(ln(1-"+(fn_s1(th0,th1,th2)).toFixed(4)+")) = -"+z1+"*"+(lg_h1).toFixed(4)+"-"+z_1+"*"+(lg_1h1).toFixed(4)+" = "+(fn_J1(th0,th1,th2)).toFixed(4);
//--- J
	var sumJ1=fn_J1(th0,th1,th2)+fn_J2(th0,th1,th2)+fn_J3(th0,th1,th2)+fn_J4(th0,th1,th2);
	document.getElementById("ml03b_4").innerHTML = "J=(1/4)*("+(fn_J1(th0,th1,th2)).toFixed(2)+"+"+(fn_J2(th0,th1,th2)).toFixed(2)+"+"+(fn_J3(th0,th1,th2)).toFixed(2)+"+"+(fn_J4(th0,th1,th2)).toFixed(2)+") = "+(sumJ1).toFixed(2)+"/4 = "+(fn_Jlog(th0,th1,th2)).toFixed(2);
//--- dJ0
	var xtz1=fn_s1(th0,th1,th2)*1-z1; var xtz2=fn_s2(th0,th1,th2)*1-z2; var xtz3=fn_s3(th0,th1,th2)*1-z3; var xtz4=fn_s4(th0,th1,th2)*1-z4;
	document.getElementById("ml03b_5").innerHTML = "dJ0 = 1/4*(("+(fn_s1(th0,th1,th2)).toFixed(2)+"-"+z1+")+("+(fn_s2(th0,th1,th2)).toFixed(2)+"-"+z2+")+("+(fn_s3(th0,th1,th2)).toFixed(2)+"-"+z3+")+("+(fn_s4(th0,th1,th2)).toFixed(2)+"-"+z4+")) = 1/4*("+(xtz1).toFixed(2)+"+"+(xtz2).toFixed(2)+"+"+(xtz3).toFixed(2)+"+"+(xtz4).toFixed(2)+") = "+(fn_dJ0(th0,th1,th2)).toFixed(2);
//--- dJ1
	var xtzx1=xtz1*x1; var xtzx2=xtz2*x2; var xtzx3=xtz3*x3; var xtzx4=xtz4*x4;
	document.getElementById("ml03b_6").innerHTML = "dJ1 = 1/4*(("+(fn_s1(th0,th1,th2)).toFixed(2)+"-"+z1+")*"+x1+"+("+(fn_s2(th0,th1,th2)).toFixed(2)+"-"+z2+")*"+x2+"+("+(fn_s3(th0,th1,th2)).toFixed(2)+"-"+z3+")*"+x3+"+("+(fn_s4(th0,th1,th2)).toFixed(2)+"-"+z4+")*"+x4+") = 1/4*("+(xtzx1).toFixed(2)+"+"+(xtzx2).toFixed(2)+"+"+(xtzx3).toFixed(2)+"+"+(xtzx4).toFixed(2)+") = "+(fn_dJ1(th0,th1,th2)).toFixed(2);
//--- dJ2
	var xtzy1=xtz1*y1; var xtzy2=xtz2*y2; var xtzy3=xtz3*y3; var xtzy4=xtz4*y4;
	document.getElementById("ml03b_7").innerHTML = "dJ2 = 1/4*(("+(fn_s1(th0,th1,th2)).toFixed(2)+"-"+z1+")*"+y1+"+("+(fn_s2(th0,th1,th2)).toFixed(2)+"-"+z2+")*"+y2+"+("+(fn_s3(th0,th1,th2)).toFixed(2)+"-"+z3+")*"+y3+"+("+(fn_s4(th0,th1,th2)).toFixed(2)+"-"+z4+")*"+y4+") = 1/4*("+(xtzy1).toFixed(2)+"+"+(xtzy2).toFixed(2)+"+"+(xtzy3).toFixed(2)+"+"+(xtzy4).toFixed(2)+") = "+(fn_dJ2(th0,th1,th2)).toFixed(2);
//--- new alpha
	var a0=document.getElementById("a0").value*1;
	var a1=document.getElementById("a1").value*1;
	var a2=document.getElementById("a2").value*1;
	
	var th0_ =(th0-(a0*fn_dJ0(th0,th1,th2))).toFixed(2); document.getElementById("ml03b_8").innerHTML = "th0 = th0-(a0*dJ0) = "+th0+"-("+a0+"*"+(fn_dJ0(th0,th1,th2)).toFixed(2)+") ="+th0_;
	var th1_ =(th1-(a1*fn_dJ1(th0,th1,th2))).toFixed(2); document.getElementById("ml03b_9").innerHTML = "th1 = th1-(a1*dJ1) = "+th1+"-("+a1+"*"+(fn_dJ1(th0,th1,th2)).toFixed(2)+") ="+th1_;
	var th2_ =(th2-(a2*fn_dJ2(th0,th1,th2))).toFixed(2); document.getElementById("ml03b_10").innerHTML = "th2 = th2-(a2*dJ2) = "+th2+"-("+a2+"*"+(fn_dJ2(th0,th1,th2)).toFixed(2)+") ="+th2_;
	 
//--- table 
	var out="<br>"; var t0=th0; var t1=th1; var t2=th2;
	var fi=document.getElementById("i3").value*1; //fi - final i, iteration number
	for(var i=1; i<=fi; i++){
		out += ""+(t0).toFixed(2)+ ", "+(t1).toFixed(2)+", "+(t2).toFixed(2)+" | ";
		out += (fn_J1(t0,t1,t2)).toFixed(2)+", ";
		out += (fn_J2(t0,t1,t2)).toFixed(2)+", ";
		out += (fn_J3(t0,t1,t2)).toFixed(2)+", ";
		out += (fn_J4(t0,t1,t2)).toFixed(2)+" | ";		
		out += "J="+(fn_Jlog(t0,t1,t2)).toFixed(5)+" | ";
		out += (fn_dJ0(t0,t1,t2)).toFixed(2)+", ";
		out += (fn_dJ1(t0,t1,t2)).toFixed(2)+", ";
		out += (fn_dJ2(t0,t1,t2)).toFixed(2)+" | ";
		temp_t0 = t0-a0*fn_dJ0(t0,t1,t2); temp_t1 = t1-a1*fn_dJ1(t0,t1,t2); temp_t2 = t2-a2*fn_dJ2(t0,t1,t2);
		t0=temp_t0; t1=temp_t1; t2=temp_t2; 
		switch(i%1){ case 0: out += "<br>"; }
	}
	document.getElementById("ml03b_11").innerHTML = out;
}
window.addEventListener("load", fn_03b, false);
document.getElementById("th0").addEventListener("change", fn_03b, false);
document.getElementById("th1").addEventListener("change", fn_03b, false);
document.getElementById("th2").addEventListener("change", fn_03b, false);
document.getElementById("a0").addEventListener("change", fn_03b, false);
document.getElementById("a1").addEventListener("change", fn_03b, false);
document.getElementById("a2").addEventListener("change", fn_03b, false);
document.getElementById("i3").addEventListener("change", fn_03b, false);

function fn_xt1(t0,t1,t2){ return 1*t0+x1*t1+y1*t2; } 
function fn_xt2(t0,t1,t2){ return 1*t0+x2*t1+y2*t2; }
function fn_xt3(t0,t1,t2){ return 1*t0+x3*t1+y3*t2; }
function fn_xt4(t0,t1,t2){ return 1*t0+x4*t1+y4*t2; }

function fn_sig(x) { return 1/(1+Math.pow(Math.E, -x)); }
function fn_s1(t0,t1,t2){return fn_sig(fn_xt1(t0,t1,t2));}
function fn_s2(t0,t1,t2){return fn_sig(fn_xt2(t0,t1,t2));}
function fn_s3(t0,t1,t2){return fn_sig(fn_xt3(t0,t1,t2));}
function fn_s4(t0,t1,t2){return fn_sig(fn_xt4(t0,t1,t2));}

function fn_J1(t0,t1,t2) { return -z1*Math.log(fn_s1(t0,t1,t2))-(1-z1)*Math.log(1-fn_s1(t0,t1,t2)); }
function fn_J2(t0,t1,t2) { return -z2*Math.log(fn_s2(t0,t1,t2))-(1-z2)*Math.log(1-fn_s2(t0,t1,t2)); }
function fn_J3(t0,t1,t2) { return -z3*Math.log(fn_s3(t0,t1,t2))-(1-z3)*Math.log(1-fn_s3(t0,t1,t2)); }
function fn_J4(t0,t1,t2) { return -z4*Math.log(fn_s4(t0,t1,t2))-(1-z4)*Math.log(1-fn_s4(t0,t1,t2)); }

function fn_Jlog(t0,t1,t2) { var sum=fn_J1(t0,t1,t2)*1+fn_J2(t0,t1,t2)*1+fn_J3(t0,t1,t2)*1+fn_J4(t0,t1,t2)*1; return sum/4; }

function fn_dJ0(t0,t1,t2){ var sum=(fn_s1(t0,t1,t2)-z1)*1+ (fn_s2(t0,t1,t2)-z2)*1+ (fn_s3(t0,t1,t2)-z3)*1+ (fn_s4(t0,t1,t2)-z4)*1; return sum/4;}
function fn_dJ1(t0,t1,t2){ var sum=(fn_s1(t0,t1,t2)-z1)*x1+(fn_s2(t0,t1,t2)-z2)*x2+(fn_s3(t0,t1,t2)-z3)*x3+(fn_s4(t0,t1,t2)-z4)*x4; return sum/4;}
function fn_dJ2(t0,t1,t2){ var sum=(fn_s1(t0,t1,t2)-z1)*y1+(fn_s2(t0,t1,t2)-z2)*y2+(fn_s3(t0,t1,t2)-z3)*y3+(fn_s4(t0,t1,t2)-z4)*y4; return sum/4;}

//========================================================== par2 log reg =========================================================
function fn_03c(){
//--- transform X 2dim -> 6dim
	var x1p2=x1*x1; var xy1=x1*y1; var y1p2=y1*y1;
	document.getElementById("ml03c_1").innerHTML = "X = [1 "+x1+" "+y1+" "+x1p2+" "+xy1+" "+y1p2+"; ...] ";
//--- input
	var th0=document.getElementById("3c_th0").value*1;
	var th1=document.getElementById("3c_th1").value*1;
	var th2=document.getElementById("3c_th2").value*1;
	var th3=document.getElementById("3c_th3").value*1;	
	var th4=document.getElementById("3c_th4").value*1;	
	var th5=document.getElementById("3c_th5").value*1;		
//--- h(x1)
	var xt1=fn_xt1r(th0,th1,th2,th3,th4,th5); var ext1=Math.pow(Math.E, -xt1);
	document.getElementById("ml03c_2").innerHTML = "xt1 = 1*"+th0+"+"+x1+"*"+th1+"+"+y1+"*"+th2+"+"+x1p2+"*"+th3+"+"+xy1+"*"+th4+"+"+y1p2+"*"+th5+"="+(xt1).toFixed(1);
	document.getElementById("ml03c_3").innerHTML = "h(xt1) = 1/(1+e^(-xt1)) = 1/(1+"+(ext1).toFixed(4)+")="+(fn_s1r(th0,th1,th2,th3,th4,th5)).toFixed(15);
//--- J
	document.getElementById("ml03c_4").innerHTML = "J=(1/4)*("+(fn_J1r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"+"+(fn_J2r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"+"+(fn_J3r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"+"+(fn_J4r(th0,th1,th2,th3,th4,th5)).toFixed(2)+") = "+(fn_Jlogr(th0,th1,th2,th3,th4,th5)).toFixed(2);
//--- dJ0
	var xtz1=fn_s1r(th0,th1,th2,th3,th4,th5)-z1; var xtz2=fn_s2r(th0,th1,th2,th3,th4,th5)-z2; var xtz3=fn_s3r(th0,th1,th2,th3,th4,th5)-z3; var xtz4=fn_s4r(th0,th1,th2,th3,th4,th5)-z4;
	document.getElementById("ml03c_5").innerHTML = "dJ/dth0 = 1/4*(("+
	(fn_s1r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z1+")+("+
	(fn_s2r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z2+")+("+
	(fn_s3r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z3+")+("+
	(fn_s4r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z4+")) = 1/4*("+(xtz1).toFixed(2)+"+"+(xtz2).toFixed(2)+"+"+(xtz3).toFixed(2)+"+"+(xtz4).toFixed(2)+") = "+(fn_dJ0r(th0,th1,th2,th3,th4,th5)).toFixed(2);
//--- dJ1
	var xtzx1=xtz1*x1; var xtzx2=xtz2*x2; var xtzx3=xtz3*x3; var xtzx4=xtz4*x4;
	document.getElementById("ml03c_6").innerHTML = "dJ/dth1 = 1/4*(("+
	(fn_s1r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z1+")*"+x1+"+("+
	(fn_s2r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z2+")*"+x2+"+("+
	(fn_s3r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z3+")*"+x3+"+("+
	(fn_s4r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z4+")*"+x4+") = 1/4*("+(xtzx1).toFixed(2)+"+"+(xtzx2).toFixed(2)+"+"+(xtzx3).toFixed(2)+"+"+(xtzx4).toFixed(2)+") = "+(fn_dJ1r(th0,th1,th2,th3,th4,th5)).toFixed(2);
//--- dJ2
	var xtzy1=xtz1*y1; var xtzy2=xtz2*y2; var xtzy3=xtz3*y3; var xtzy4=xtz4*y4;
	document.getElementById("ml03c_7").innerHTML = "dJ/dth2 = 1/4*(("+
	(fn_s1r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z1+")*"+y1+"+("+
	(fn_s2r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z2+")*"+y2+"+("+
	(fn_s3r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z3+")*"+y3+"+("+
	(fn_s4r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z4+")*"+y4+") = 1/4*("+(xtzy1).toFixed(2)+"+"+(xtzy2).toFixed(2)+"+"+(xtzy3).toFixed(2)+"+"+(xtzy4).toFixed(2)+") = "+(fn_dJ2r(th0,th1,th2,th3,th4,th5)).toFixed(2);
//--- dJ3
	var xtzx21=xtz1*x1*x1; var xtzx22=xtz2*x2*x2; var xtzx23=xtz3*x3*x3; var xtzx24=xtz4*x4*x4;
	document.getElementById("ml03c_8").innerHTML = "dJ/dth3 = 1/4*(("+
	(fn_s1r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z1+")*"+x1+"*"+x1+"+("+
	(fn_s2r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z2+")*"+x2+"*"+x2+"+("+
	(fn_s3r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z3+")*"+x3+"*"+x3+"+("+
	(fn_s4r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z4+")*"+x4+"*"+x4+") = 1/4*("+(xtzx21).toFixed(2)+"+"+(xtzx22).toFixed(2)+"+"+(xtzx23).toFixed(2)+"+"+(xtzx24).toFixed(2)+") = "+(fn_dJ3r(th0,th1,th2,th3,th4,th5)).toFixed(2);
//--- dJ4
	var xtzxy1=xtz1*x1*y1; var xtzxy2=xtz2*x2*y2; var xtzxy3=xtz3*x3*y3; var xtzxy4=xtz4*x4*y4;
	document.getElementById("ml03c_9").innerHTML = "dJ/dth4 = 1/4*(("+
	(fn_s1r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z1+")*"+x1+"*"+y1+"+("+
	(fn_s2r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z2+")*"+x2+"*"+y2+"+("+
	(fn_s3r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z3+")*"+x3+"*"+y3+"+("+
	(fn_s4r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z4+")*"+x4+"*"+y4+") = 1/4*("+(xtzxy1).toFixed(2)+"+"+(xtzxy2).toFixed(2)+"+"+(xtzxy3).toFixed(2)+"+"+(xtzxy4).toFixed(2)+") = "+(fn_dJ4r(th0,th1,th2,th3,th4,th5)).toFixed(2);	
//--- dJ5
	var xtzyy1=xtz1*y1*y1; var xtzyy2=xtz2*y2*y2; var xtzyy3=xtz3*y3*y3; var xtzyy4=xtz4*y4*y4;
	document.getElementById("ml03c_10").innerHTML = "dJ/dth5 = 1/4*(("+
	(fn_s1r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z1+")*"+y1+"*"+y1+"+("+
	(fn_s2r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z2+")*"+y2+"*"+y2+"+("+
	(fn_s3r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z3+")*"+y3+"*"+y3+"+("+
	(fn_s4r(th0,th1,th2,th3,th4,th5)).toFixed(2)+"-"+z4+")*"+y4+"*"+y4+") = 1/4*("+(xtzyy1).toFixed(2)+"+"+(xtzyy2).toFixed(2)+"+"+(xtzyy3).toFixed(2)+"+"+(xtzyy4).toFixed(2)+") = "+(fn_dJ5r(th0,th1,th2,th3,th4,th5)).toFixed(2);
//--- alpha
	var a0=document.getElementById("3c_a0").value*1;
	var a1=document.getElementById("3c_a1").value*1;
	var a2=document.getElementById("3c_a2").value*1;
	var a3=document.getElementById("3c_a3").value*1;
	var a4=document.getElementById("3c_a4").value*1;
	var a5=document.getElementById("3c_a5").value*1;
//--- new theta	
	var th0_ =(th0-(a0*fn_dJ0r(th0,th1,th2,th3,th4,th5))).toFixed(2); document.getElementById("ml03c_11").innerHTML = "th0 = th0-(a0*dJ0) = "+th0+"-("+a0+"*"+(fn_dJ0r(th0,th1,th2,th3,th4,th5)).toFixed(2)+") ="+th0_;
	var th1_ =(th1-(a1*fn_dJ1r(th0,th1,th2,th3,th4,th5))).toFixed(2); document.getElementById("ml03c_12").innerHTML = "th1 = th1-(a1*dJ1) = "+th1+"-("+a1+"*"+(fn_dJ1r(th0,th1,th2,th3,th4,th5)).toFixed(2)+") ="+th1_;
	var th2_ =(th2-(a2*fn_dJ2r(th0,th1,th2,th3,th4,th5))).toFixed(2); document.getElementById("ml03c_13").innerHTML = "th2 = th2-(a2*dJ2) = "+th2+"-("+a2+"*"+(fn_dJ2r(th0,th1,th2,th3,th4,th5)).toFixed(2)+") ="+th2_;
	var th3_ =(th3-(a3*fn_dJ3r(th0,th1,th2,th3,th4,th5))).toFixed(2); document.getElementById("ml03c_14").innerHTML = "th3 = th0-(a0*dJ3) = "+th3+"-("+a3+"*"+(fn_dJ3r(th0,th1,th2,th3,th4,th5)).toFixed(2)+") ="+th3_;
	var th4_ =(th4-(a4*fn_dJ4r(th0,th1,th2,th3,th4,th5))).toFixed(2); document.getElementById("ml03c_15").innerHTML = "th4 = th1-(a1*dJ4) = "+th4+"-("+a4+"*"+(fn_dJ4r(th0,th1,th2,th3,th4,th5)).toFixed(2)+") ="+th4_;
	var th5_ =(th5-(a5*fn_dJ5r(th0,th1,th2,th3,th4,th5))).toFixed(2); document.getElementById("ml03c_16").innerHTML = "th5 = th2-(a2*dJ5) = "+th5+"-("+a5+"*"+(fn_dJ5r(th0,th1,th2,th3,th4,th5)).toFixed(2)+") ="+th5_;
//--- table 
	var out="<br>"; var t0=th0; var t1=th1; var t2=th2; var t3=th3; var t4=th4; var t5=th5;
	var fi=document.getElementById("3c_i3").value*1; //fi - final i, iteration number
	for(var i=1; i<=fi; i++){
		out += ""+(t0).toFixed(2)+ ", "+(t1).toFixed(2)+", "+(t2).toFixed(2)+", "+(t3).toFixed(2)+", "+(t4).toFixed(2)+", "+(t5).toFixed(2)+" | ";	
		out += "J="+(fn_Jlogr(t0,t1,t2,t3,t4,t5)).toFixed(5)+" | ";
		out += (fn_dJ0r(t0,t1,t2,t3,t4,t5)).toFixed(2)+", ";
		out += (fn_dJ1r(t0,t1,t2,t3,t4,t5)).toFixed(2)+", ";
		out += (fn_dJ2r(t0,t1,t2,t3,t4,t5)).toFixed(2)+", ";
		out += (fn_dJ3r(t0,t1,t2,t3,t4,t5)).toFixed(2)+", ";
		out += (fn_dJ4r(t0,t1,t2,t3,t4,t5)).toFixed(2)+", ";
		out += (fn_dJ5r(t0,t1,t2,t3,t4,t5)).toFixed(2)+" | ";
		temp_t0 = t0-a0*fn_dJ0r(t0,t1,t2,t3,t4,t5); temp_t1 = t1-a1*fn_dJ1r(t0,t1,t2,t3,t4,t5); temp_t2 = t2-a2*fn_dJ1r(t0,t1,t2,t3,t4,t5);
		temp_t3 = t3-a3*fn_dJ3r(t0,t1,t2,t3,t4,t5); temp_t4 = t4-a4*fn_dJ1r(t0,t1,t2,t3,t4,t5); temp_t5 = t5-a5*fn_dJ1r(t0,t1,t2,t3,t4,t5);
		t0=temp_t0; t1=temp_t1; t2=temp_t2;  t3=temp_t3;  t4=temp_t4;  t5=temp_t5; 
		switch(i%1){ case 0: out += "<br>"; }
	}
	document.getElementById("ml03c_17").innerHTML = out;
}
window.addEventListener("load", fn_03c, false);
document.getElementById("3c_th0").addEventListener("change", fn_03c, false);
document.getElementById("3c_th1").addEventListener("change", fn_03c, false);
document.getElementById("3c_th2").addEventListener("change", fn_03c, false);
document.getElementById("3c_th3").addEventListener("change", fn_03c, false);
document.getElementById("3c_th4").addEventListener("change", fn_03c, false);
document.getElementById("3c_th5").addEventListener("change", fn_03c, false);
document.getElementById("3c_a0").addEventListener("change", fn_03c, false);
document.getElementById("3c_a1").addEventListener("change", fn_03c, false);
document.getElementById("3c_a2").addEventListener("change", fn_03c, false);
document.getElementById("3c_a3").addEventListener("change", fn_03c, false);
document.getElementById("3c_a4").addEventListener("change", fn_03c, false);
document.getElementById("3c_a5").addEventListener("change", fn_03c, false);
document.getElementById("3c_i3").addEventListener("change", fn_03c, false);

function fn_xt1r(t0,t1,t2,t3,t4,t5){ return 1*t0+x1*t1+y1*t2+x1*x1*t3+x1*y1*t4+y1*y1*t5; }
function fn_xt2r(t0,t1,t2,t3,t4,t5){ return 1*t0+x2*t1+y2*t2+x2*x2*t3+x2*y2*t4+y2*y2*t5; } 
function fn_xt3r(t0,t1,t2,t3,t4,t5){ return 1*t0+x3*t1+y3*t2+x3*x3*t3+x3*y3*t4+y3*y3*t5; } 
function fn_xt4r(t0,t1,t2,t3,t4,t5){ return 1*t0+x4*t1+y4*t2+x4*x4*t3+x4*y4*t4+y4*y4*t5; } 

function fn_s1r(t0,t1,t2,t3,t4,t5){return fn_sig(fn_xt1r(t0,t1,t2,t3,t4,t5));}
function fn_s2r(t0,t1,t2,t3,t4,t5){return fn_sig(fn_xt2r(t0,t1,t2,t3,t4,t5));}
function fn_s3r(t0,t1,t2,t3,t4,t5){return fn_sig(fn_xt3r(t0,t1,t2,t3,t4,t5));}
function fn_s4r(t0,t1,t2,t3,t4,t5){return fn_sig(fn_xt4r(t0,t1,t2,t3,t4,t5));}

function fn_J1r(t0,t1,t2,t3,t4,t5) { return -z1*Math.log(fn_s1r(t0,t1,t2,t3,t4,t5))-(1-z1)*Math.log(1-fn_s1r(t0,t1,t2,t3,t4,t5)); }
function fn_J2r(t0,t1,t2,t3,t4,t5) { return -z2*Math.log(fn_s2r(t0,t1,t2,t3,t4,t5))-(1-z2)*Math.log(1-fn_s2r(t0,t1,t2,t3,t4,t5)); }
function fn_J3r(t0,t1,t2,t3,t4,t5) { return -z3*Math.log(fn_s3r(t0,t1,t2,t3,t4,t5))-(1-z3)*Math.log(1-fn_s3r(t0,t1,t2,t3,t4,t5)); }
function fn_J4r(t0,t1,t2,t3,t4,t5) { return -z4*Math.log(fn_s4r(t0,t1,t2,t3,t4,t5))-(1-z4)*Math.log(1-fn_s4r(t0,t1,t2,t3,t4,t5)); }

function fn_Jlogr(t0,t1,t2,t3,t4,t5) { var sum=fn_J1r(t0,t1,t2,t3,t4,t5)+fn_J2r(t0,t1,t2,t3,t4,t5)+fn_J3r(t0,t1,t2,t3,t4,t5)+fn_J4r(t0,t1,t2,t3,t4,t5); return sum/4; }

function fn_dJ0r(t0,t1,t2,t3,t4,t5){ var sum=(fn_s1r(t0,t1,t2,t3,t4,t5)-z1)+(fn_s2r(t0,t1,t2,t3,t4,t5)-z2)+(fn_s3r(t0,t1,t2,t3,t4,t5)-z3)+(fn_s4r(t0,t1,t2,t3,t4,t5)-z4); return sum/4;}
function fn_dJ1r(t0,t1,t2,t3,t4,t5){ var sum=(fn_s1r(t0,t1,t2,t3,t4,t5)-z1)*x1+(fn_s2r(t0,t1,t2,t3,t4,t5)-z2)*x2+(fn_s3r(t0,t1,t2,t3,t4,t5)-z3)*x3+(fn_s4r(t0,t1,t2,t3,t4,t5)-z4)*x4; return sum/4;}
function fn_dJ2r(t0,t1,t2,t3,t4,t5){ var sum=(fn_s1r(t0,t1,t2,t3,t4,t5)-z1)*y1+(fn_s2r(t0,t1,t2,t3,t4,t5)-z2)*y2+(fn_s3r(t0,t1,t2,t3,t4,t5)-z3)*y3+(fn_s4r(t0,t1,t2,t3,t4,t5)-z4)*y4; return sum/4;}
function fn_dJ3r(t0,t1,t2,t3,t4,t5){ var sum=(fn_s1r(t0,t1,t2,t3,t4,t5)-z1)*x1*x1+(fn_s2r(t0,t1,t2,t3,t4,t5)-z2)*x2*x2+(fn_s3r(t0,t1,t2,t3,t4,t5)-z3)*x3*x3+(fn_s4r(t0,t1,t2,t3,t4,t5)-z4)*x4*x4; return sum/4;}
function fn_dJ4r(t0,t1,t2,t3,t4,t5){ var sum=(fn_s1r(t0,t1,t2,t3,t4,t5)-z1)*x1*y1+(fn_s2r(t0,t1,t2,t3,t4,t5)-z2)*x2*y2+(fn_s3r(t0,t1,t2,t3,t4,t5)-z3)*x3*y3+(fn_s4r(t0,t1,t2,t3,t4,t5)-z4)*x4*y4; return sum/4;}
function fn_dJ5r(t0,t1,t2,t3,t4,t5){ var sum=(fn_s1r(t0,t1,t2,t3,t4,t5)-z1)*y1*y1+(fn_s2r(t0,t1,t2,t3,t4,t5)-z2)*y2*y2+(fn_s3r(t0,t1,t2,t3,t4,t5)-z3)*y3*y3+(fn_s4r(t0,t1,t2,t3,t4,t5)-z4)*y4*y4; return sum/4;}