async function loadJSON(link){
	let response = await fetch(link);
	let data = await response.json();
	return data;
}

//loading JSON
loadJSON('https://hanumaukkadapu.github.io/myCodeBits/materialColorPalette/materialColors.json')
	.then(data => {
		console.log(data);
		JSONloaded(data);
	}
);

function JSONloaded(data){
	const optSel = document.getElementById('shades');
	const palette = document.getElementById('palette');
	const output1 = document.getElementById('out1');

	const colorsObj = data;
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
}
