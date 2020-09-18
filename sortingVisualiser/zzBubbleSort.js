/*
** Created by:
** Hanuma Ukkadapu
*/

//alert(`Loaded: zzBubbleSort.js`);

async function bubbleSort(){
	//console.log(`inside bubbleSort()`);
    for(let i=0;i<barNo;i++){
        await BBLCheck(i);
    }
    
    async function BBLCheck(i){
    	//console.log(`checking ${i}`);
    	
    	for(let j=0;j<barNo-(i+1);j++){
        	let [currEl, nextEl] = [board.children[j], board.children[j+1]];
        	currEl.classList.add('current');
        	
        	await sleep(delay);
        	let [hNum, nxtHNum] = [Math.round(Number(currEl.getAttribute('style').slice(7,-2))),
        					   Math.round(Number(nextEl.getAttribute('style').slice(7,-2)))];
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
		//console.log('in bubbleSwap()');
	    let currElContent = currEl.outerHTML;
	    board.removeChild(currEl);
	    nextEl.insertAdjacentHTML('afterend',currElContent);
	    let currInd = [...board.children].indexOf(nextEl)+1;
	    
	    await sleep(delay);
	    nextEl.classList.remove('swap');
	    board.children[currInd].classList.remove('swap');
	}
	
	return 'done';
	
}
