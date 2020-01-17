async function loadJSON(link){
	let response = await fetch(link);
	let data = await response.json();
	return data;
}

//loading JSON
loadJSON('https://hanumaukkadapu.github.io/myCodeBits/materialColorPalette/materialColors.json').then(data => console.log(data));
