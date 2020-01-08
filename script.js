

const root = document.documentElement;

/*
var s = [root.clientWidth, root.clientHeight];
var foot1 = document.getElementById('size-foot1');
foot1.innerHTML = s[0]; //for printing for the first time
function sizeCheck(){
	var snew = [root.clientWidth, root.clientHeight];
	if(s[0] != snew[0]){
		foot1.innerHTML = snew[0];
	}
}
setInterval(sizeCheck,10);
*/

/* For Changing Color */

window.onload = function(){

	// setting some arbitrary values for the sliders
	var x = [0,0,0];
	var max = 255; var min = 0;
	for(i=0;i<3;i++){
		x[i] = Math.round(Math.random() * (+max - +min) + +min);
		document.getElementById(sl[i]).value = x[i];
	}
	changeInInput();
	
	// Material Palette colors
	for(i=0;i<colors.length;i++){
		var childs = document.getElementById(colorNames[i]).childNodes;
		childs[1].style.background = s.concat(colors[i].join(''));
	}
};

var sl = ['rSlider', 'gSlider', 'bSlider'];
var slBgColors = [['#dd2222','#dddddd'],['#22dd22','#dddddd'],['#2222dd','#dddddd']];
var sp = ['rVal', 'gVal', 'bVal'];//output
var rgb = ['r', 'g', 'b'];
var hex = document.getElementById('hex');
var hsl = ['h', 's', 'l'];

// Material color presets
var s = '#';
var colorNames = ['red','pink','purple','deeppurple','indigo','blue','lightblue','cyan','teal','green','lightgreen','lime','yellow','amber','orange','deeporange','brown','grey','bluegrey'];
var colors = [
			['f4','43','36'],['e9','1e','63'],
			['9c','27','b0'],['67','3a','b7'],
			['3f','51','b5'],['21','96','f3'],
			['03','a9','f4'],['00','bc','d4'],
			['00','96','88'],['4c','af','50'],
			['8b','c3','4a',],['cd','dc','39'],
			['ff','eb','3b',],['ff','c1','07'],
			['ff','98','00',],['ff','57','22'],
			['79','55','48',],['9e','9e','9e'],
			['60','7d','8b',]
			];

function changeInInput(){
  	// Getting slider values
  	var c = [document.getElementById(sl[0]).value,
  			document.getElementById(sl[1]).value,
  			document.getElementById(sl[2]).value];
  	
  	// Slider progress part
  	for(i=0;i<3;i++){
  		var rangeSlider = document.getElementById(sl[i]);
  		var value = (rangeSlider.value/255);
  		rangeSlider.style.backgroundImage = '-webkit-gradient(linear, left top, right top, '
  									+ 'color-stop(' + value + ', ' + slBgColors[i][0] +'),'
  									+ 'color-stop(' + value + ', ' + slBgColors[i][1] + ')' + ')';
  	}
  	
  	// Displaying RGB values
  	for(i=0;i<3;i++){
  		// output
  		document.getElementById(sp[i]).value = c[i];
  		document.getElementById(rgb[i]).innerHTML = c[i];
  	}
  	
  	// Converting RGB to HEX
  	var color = rgb2hex(c);
  	// HEX value output
  	hex.innerHTML = color;
  	root.style.setProperty('--color',color);
  	
  	// Converting RGB to HSL
  	var h2 = rgb2hsl(c);
  	// HSL value output
  	for(i=0;i<3;i++){
  		document.getElementById(hsl[i]).innerHTML = Math.round(h2[i]);
  	}
}

function rgb2hex(cs){
  	var h = new Array(3);
  	var z = '0';
  	
  	for(i=0;i<cs.length;i++){
    	if(cs[i] < 16 ){
      		z = z.concat(Number(cs[i]).toString(16));
      		h[i] = z;
      		z = '0';
    	}
    	else	h[i] = Number(cs[i]).toString(16);
  	}
  	var clr = '#';
  	var color = clr.concat(h[0],h[1],h[2]);
  	return color;
}

/*
for RGB to HSL conversion
http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
*/
function rgb2hsl(cs){
	var h2 = new Array(3);
	var c8 = cs.map( function(el){
		return el/255;
	});
	var min_c8 = Math.min(...c8);
	var max_c8 = Math.max(...c8);
	var i_max = c8.indexOf(max_c8)
	//console.log(i_min+' '+min_c8+'\n'+i_max+' '+max_c8+'\n');
	var avg = (min_c8+max_c8)/2;
	h2[2] = 100*avg;
	//console.log(avg+' '+avg*100+' '+Math.round(h2[2]));
	
	// for hue and saturation
	if(min_c8 == max_c8){
		h2[0] = 0; h2[1] = 0;
	}
	else{
		// for saturation
		if(h2[2]<=50)	h2[1] = 100*((max_c8-min_c8)/(max_c8+min_c8));
		else	h2[1] = 100*((max_c8-min_c8)/(2-(max_c8+min_c8)));
		
		// for hue
		if(i_max == 0)		h2[0] = (c8[1]-c8[2])/(max_c8-min_c8);
		else if(i_max == 1)	h2[0] = 2+((c8[2]-c8[0])/(max_c8-min_c8));
		else if(i_max == 2)	h2[0] = 4+((c8[0]-c8[1])/(max_c8-min_c8));
		
		//console.log(h2[0]);
		h2[0] *= 60;
		if(h2[0]<0)	h2[0]+=360;
	}
	return h2;
}

const presetColor = document.querySelectorAll('.preset-color');
//console.log(presetColor.length);
[...presetColor].forEach( function(elem){
	elem.addEventListener( 'click', function(){
		for(i=0;i<3;i++){
			document.getElementById(sl[i]).value = parseInt(colors[colorNames.indexOf(this.id)][i],16);
		}
		changeInInput();
	});
});
