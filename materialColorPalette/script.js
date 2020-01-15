/*
var dataJSON = {};
var path = 'file:///sdcard/anWriter/sololearn/zMaterialPalettePract/materialColors.json';
function loadJSON(callback){
	var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
	xobj.open('GET', path, true); 
    // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () {
    	if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
    	}
	};
	xobj.send(null);  
}

function init() {
	loadJSON(function(response) {
	// Parse JSON string into object
		dataJSON = JSON.parse(response);
		console.log('hello1');
	});
}
*/
const optSel = document.getElementById('shades');
const palette = document.getElementById('palette');
const output1 = document.getElementById('out1');

//const colorsObj = JSON.parse(JSON.stringify(dataJSON));
//console.log('hello2');
// from materialColors_object.json
const colorsObj = JSON.parse(JSON.stringify(data));
//console.log(colorsObj.red["100"]);
const colorNames = Object.keys(colorsObj);
const shades = Object.keys(colorsObj[colorNames[0]]);

// setting select option values
for(var i=0;i<shades.length;i++){
	var option = '<option value="'+shades[i]+'" >'+shades[i].toUpperCase()+'</option>';
	optSel.insertAdjacentHTML('beforeend', option);
}

window.onload = function(){
	optSel.value = 500;
	changeShades(optSel.value);
	colorClick();
};

// changing color palette on selecting a tone
optSel.addEventListener("change",function(){
	changeShades(optSel.value);
});

function changeShades(shadeVal){
	clear(palette);
	for(i=0;i<colorNames.length;i++){
		if(shadeVal in colorsObj[colorNames[i]]){
			createPaletteColor(colorsObj[colorNames[i]][shadeVal], colorNames[i]);
			//console.log(toneVal+' exists in '+colorNames[i]);
		}
	}
	colorClick();
}
// removing object's child nodes
function clear(obj){
	while(obj.hasChildNodes() && obj.childNodes.length != 1){
		obj.lastElementChild.remove();
	}
}
// template to clone from
var colorBox = document.createElement('div');
var colorNameSpan = document.createElement('span');
colorBox.className = 'color-box';
colorNameSpan.className = 'color-name';
colorBox.append(colorNameSpan);
console.log(colorBox.childNodes.length);
// create Palette color boxes and names
function createPaletteColor(bgColor, colorName){
	let colorBox2 = colorBox.cloneNode(true);
	colorBox2.style.background = bgColor;
	colorBox2.childNodes[0].append(colorName.toUpperCase());
	colorBox2.id = colorName;
	palette.append(colorBox2);
	//console.log(bgColor+'\t'+colorNameCaps+'\n');
}

function colorClick(){
	//NodeList.prototype.forEach = Array.prototype.forEach;
	var paletteChild = [...palette.childNodes];
	//console.log(typeof paletteChild+'\t'+paletteChild.length);
	paletteChild.forEach( function(elem){
		elem.addEventListener( "click", function(){
			var colorNo = colorNames.indexOf(elem.id);
			//console.log(elem.id+'\t'+colorNo);
			var colorSel = colorsObj[elem.id][optSel.value];
			document.body.style.background = colorSel;
			var rgb = ['','',''];
			for(i=1;i<7;i++){
				if(i<3)	rgb[0] = rgb[0].concat(colorSel[i]);
				else if(i>2&&i<5)	rgb[1] = rgb[1].concat(colorSel[i]);
				else if(i>4&&i<7)	rgb[2] = rgb[2].concat(colorSel[i]);
			}
			//console.log(colorSel+'\t'+rgb[0]+','+rgb[1]+','+rgb[2]);
			output1.innerHTML = '#'+rgb[0]+rgb[1]+rgb[2];//colorsObj[elem.id][optSel.value];
		});
	});
}

/*
console.log(shades.length+'\t'+optSel.childNodes.length+'\n'+shades+'\n');
for(i=0;i<optSel.childNodes.length;i++){
	console.log(optSel.childNodes[i].text+'\n');
}
*/