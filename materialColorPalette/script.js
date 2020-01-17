async function loadJSON(link){
	let response = await fetch(link);
	let data = await response.json();
	return data;
}

//loading JSON
loadJSON('https://hanumaukkadapu.github.io/myCodeBits/materialColorPalette/materialColors.json')
	.then(data => {
		//console.log(data);
		JSONloaded(data);
	}
);

function JSONloaded(data){
	const optSel = document.getElementById('shades');
	const palette = document.getElementById('palette');
	const output1 = document.getElementById('out1');

	const colorsObj = data;
	const colorNames = Object.keys(colorsObj);
	const shades = Object.keys(colorsObj[colorNames[0]]);
	//console.log(colorsObj.red["100"]);

	// setting select option values
	for(var i=0;i<shades.length;i++){
		var option = '<option value="'+shades[i]+'" >'+shades[i].toUpperCase()+'</option>';
		optSel.insertAdjacentHTML('beforeend', option);
		if(i==shades.length - 1){
			setSelVal();
		}
	}

	function setSelVal(){
		optSel.value = 500;
		changeShades(optSel.value);
	}

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
	}
	// removing object's child nodes
	function clear(obj){
		while(obj.hasChildNodes() && obj.childNodes.length != 1){
			obj.lastElementChild.remove();
		}
	}
	
	//console.log(colorBox.childNodes.length);
	// create Palette color boxes and names
	function createPaletteColor(bgColor, colorName){
		var colorBox = document.createElement('div');
		var colorNameSpan = document.createElement('span');
		colorBox.className = 'color-box';
		colorBox.setAttribute('onclick','colorClick(this.id);');
		colorNameSpan.className = 'color-name';
		colorBox.append(colorNameSpan);
		colorBox.style.background = bgColor;
		colorBox.childNodes[0].append(colorName.toUpperCase());
		colorBox.id = colorName;
		palette.append(colorBox);
		//console.log(bgColor+'\t'+colorNameCaps+'\n');
	}

	function colorClick(elemId){
		//var colorNo = colorNames.indexOf(elemId);
		//console.log(elem.id+'\t'+colorNo);
		var colorSel = colorsObj[elemId][optSel.value];
		document.body.style.background = colorSel;
		var rgb = ['','',''];
		for(i=1;i<7;i++){
			if(i<3)	rgb[0] = rgb[0].concat(colorSel[i]);
			else if(i>2&&i<5)	rgb[1] = rgb[1].concat(colorSel[i]);
			else if(i>4&&i<7)	rgb[2] = rgb[2].concat(colorSel[i]);
		}
		//console.log(colorSel+'\t'+rgb[0]+','+rgb[1]+','+rgb[2]);
		output1.innerHTML = '#'+rgb[0]+rgb[1]+rgb[2];//colorsObj[elem.id][optSel.value];
	}
}
