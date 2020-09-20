/*
** Created by:
** Hanuma Ukkadapu
*/

//alert(`Loaded: zzFirst5Sorts.js`);

/* for bubble sort */

async function bubbleSort(barArr){
	//console.log(`inside bubbleSort()`);
    for(let i=0;i<barArr.length;i++){
        await BBLCheck(i);
    }
    
    async function BBLCheck(i){
    	//console.log(`checking ${i}`);
    	for(let j=0;j<barArr.length-(i+1);j++){
        	let [currEl, nextEl] = [barArr[j], barArr[j+1]];
        	currEl.classList.add('current');
        	
        	await sleep(delay);
        	let [hNum, nxtHNum] = [await getBarHeight(currEl),
        						   await getBarHeight(nextEl)];
        	if(hNum>nxtHNum){
            	currEl.classList.remove('current');
            	currEl.classList.add('swap');
            	nextEl.classList.add('swap');
            	//console.log('swapping');
            	await sleep(delay);
            	await BBLSwap(currEl, nextEl);
        	}
        	else{
        		await sleep(delay);
        		currEl.classList.remove('current');
        	}
    	}
    
	}
	
	async function BBLSwap(currEl, nextEl){
		//console.log('in BBLSwap()');
	    let currElContent = currEl.outerHTML;
	    board.removeChild(currEl);
	    nextEl.insertAdjacentHTML('afterend',currElContent);
	    let currInd = [...barArr].indexOf(nextEl)+1;
	    
	    await sleep(delay);
	    nextEl.classList.remove('swap');
	    board.children[currInd].classList.remove('swap');
	}
	
	return 'done';
}

/* for cocktail shaker sort*/

async function cocktailShakerSort(barArr){
	
	for(let i=0;i<barArr.length;i++){
		await CSHKCheck(i);
	}
	
	async function CSHKCheck(i){
		
		for(let j=i;j<barArr.length-(i+1);j++){
        	let [currEl, nextEl] = [barArr[j], barArr[j+1]];
        	currEl.classList.add('current');
        	
        	await sleep(delay);
        	let [hNum, nxtHNum] = [await getBarHeight(currEl),
        						   await getBarHeight(nextEl)];
        	if(hNum>nxtHNum){
            	currEl.classList.remove('current');
            	currEl.classList.add('swap');
            	nextEl.classList.add('swap');
            	//console.log('swapping');
            	await sleep(delay);
            	await CSHKSwap(currEl, nextEl, 1);
        	}
        	else{
        		await sleep(delay);
        		currEl.classList.remove('current');
        	}
    	}
    	
		for(let j=barArr.length-(i+1);j>i;j--){
        	let [currEl, prevEl] = [barArr[j], barArr[j-1]];
        	currEl.classList.add('current');
        	
        	await sleep(delay);
        	let [hNum, prevHNum] = [await getBarHeight(currEl),
        							await getBarHeight(prevEl)];
        	if(hNum<prevHNum){
            	currEl.classList.remove('current');
            	currEl.classList.add('swap');
            	prevEl.classList.add('swap');
            	//console.log('swapping');
            	await sleep(delay);
            	await CSHKSwap(currEl, prevEl, 0);
        	}
        	else{
        		await sleep(delay);
        		currEl.classList.remove('current');
        	}
		}
		
	}
	
	async function CSHKSwap(currEl, otherEl, lor){
		//console.log('in BBLSwap()');
		
		let currElContent = currEl.outerHTML, currInd = 0;
		board.removeChild(currEl);
		
		let pos = lor == 1 ? 'afterend' : 'beforebegin' ;
		let xtra = lor == 1 ? 1 : -1 ;
		
		otherEl.insertAdjacentHTML(pos,currElContent);
		currInd = [...barArr].indexOf(otherEl)+(xtra);
		
		await sleep(delay);
		otherEl.classList.remove('swap');
		board.children[currInd].classList.remove('swap');
		
	}
	
	return 'done';
	
}

/* for selection sort */

async function selectionSort(barArr){
	//console.log('inside selectionSort()');
	
	for(let i=0;i<barArr.length;i++){
		barArr[i].classList.add('currI')
		await SELCheck(i);
		barArr[i].classList.remove('currI');
	}
	
	async function SELCheck(i){
		await sleep(delay);
		//console.log('inside SELCheck()');
		let [prevMInd, minInd, minH] = [i, i, await getBarHeight(barArr[i])];
		
		for(let j=i;j<barArr.length;j++){
			barArr[j].classList.add('current');
			await sleep(delay);
			
			let cHNum = await getBarHeight(barArr[j]);
			[prevMInd, minInd, minH] = cHNum < minH ? [minInd, j, cHNum] : [prevMInd, minInd, minH] ;
			
			barArr[minInd].classList.add('min');
			barArr[prevMInd].classList.remove('min');
			await sleep(delay);
			barArr[j].classList.remove('current');
			//console.log(`i: ${i}\tj: ${j}\tminInd: ${minInd}\tminH: ${minH}\tcHNum: ${cHNum}`);
		}
		if(minInd!=i)	await SELSwap(minInd,i);
		
	}
	
	async function SELSwap(fI,tI){
		await sleep(delay);
		let [fEl, tEl] = [barArr[fI], barArr[tI]];
		fEl.classList.remove('min');
		let fElCont = fEl.outerHTML;
		board.removeChild(fEl);
		tEl.insertAdjacentHTML('beforebegin',fElCont);
	}
	
	return 'done';
}

/* for double selection sort */

async function doubleSelectionSort(barArr){
	
	for(let i=0;i<barArr.length;i++){
		
		await DBSLCheck(i);
		
	}
	
	async function DBSLCheck(i){
		await sleep(delay);
		//console.log('inside SELCheck()');
		let [prevMnInd, minInd, minH] = [i, i, await getBarHeight(barArr[i])];
		
		barArr[i].classList.add('currI');
		for(let j=i;j<barArr.length-i;j++){
			barArr[j].classList.add('current');
			await sleep(delay);
			
			let cHNum = await getBarHeight(barArr[j]);
			[prevMnInd, minInd, minH] = cHNum < minH ? [minInd, j, cHNum] : [prevMnInd, minInd, minH] ;
			
			barArr[minInd].classList.add('min');
			barArr[prevMnInd].classList.remove('min');
			await sleep(delay);
			barArr[j].classList.remove('current');
			//console.log(`i: ${i}\tj: ${j}\tminInd: ${minInd}\tminH: ${minH}\tcHNum: ${cHNum}`);
		}
		barArr[i].classList.remove('currI');
		if(minInd!=i)	await DBSLSwap(minInd,i,1);
		
		let ind = barArr.length-(i+1);
		let [prevMxInd, maxInd, maxH] = [ind, ind, await getBarHeight(barArr[ind])];
		
		barArr[ind].classList.add('currI');
		for(let j=ind;j>i;j--){
			barArr[j].classList.add('current');
			await sleep(delay);
			
			let cHNum = await getBarHeight(barArr[j]);
			[prevMxInd, maxInd, maxH] = cHNum > maxH ? [maxInd, j, cHNum] : [prevMxInd, maxInd, maxH] ;
			
			barArr[maxInd].classList.add('max');
			barArr[prevMxInd].classList.remove('max');
			await sleep(delay);
			barArr[j].classList.remove('current');
			
		}
		barArr[ind].classList.remove('currI');
		if(maxInd!=ind)	await DBSLSwap(maxInd,ind,0);
		
	}
	
	async function DBSLSwap(fI,tI,bool){
		//console.log('inside DBSLSort()');
		await sleep(delay);
		let [fEl, tEl] = [barArr[fI], barArr[tI]];
		fEl.classList.remove('min');
		fEl.classList.remove('max');
		let fElCont = fEl.outerHTML;
		board.removeChild(fEl);
		let pos = bool==1? 'beforebegin' : 'afterend' ;
		tEl.insertAdjacentHTML(pos,fElCont);
	}
	
	return 'done';
}
 
/* for insertion sort */

async function insertionSort(barArr){
    
    for(let i=0;i<barArr.length;i++){
        await INSCheck(i);
    }
    
    async function INSCheck(i){
	    
	    for(let j=i;j>=0;j--){
	        let currEl = barArr[j];
	        currEl.classList.add('current');
	        if(j!=0){
	            let prevEl = barArr[j-1];
	            await sleep(delay);
	            let [hNum, prevHNum] = [await getBarHeight(currEl),
	            						await getBarHeight(prevEl)];
	            if(hNum<prevHNum){
	                //await sleep(delay);
	                await INSSwap(currEl, prevEl);
	            }
	            else{
	            	await sleep(delay);
	                currEl.classList.remove('current');
	                prevEl.classList.remove('current');
	                break;
	            }
	        }
	        else{
	        	await sleep(delay);
	        	currEl.classList.remove('current');
	        }
	    }
	}
	
	async function INSSwap(currEl,prevEl){
	    let currElContent = currEl.outerHTML;
	    board.removeChild(currEl);
	    prevEl.insertAdjacentHTML('beforebegin',currElContent);
	    await sleep(delay);
	}
    
    return 'done';
    
}
