/*
** Created by:
** Hanuma Ukkadapu
*/

//alert(`Loaded: zzSecond5Sorts.js`);

/* for counting sort */

async function countingSort(barArr){
	//alert('inside countingSort()');
	
	let rangeArr = Array(maxH+1).fill(0);
	let indArr = Array(maxH+1).fill(0);
	let barHArr = [];
	
/*********************************************/
	
	/* counting */
	for(let bar of barArr){
		bar.classList.add('current');
		await sleep(delay*2);
		let bHNum = await getBarHeight(bar);
		let present;
		for(let i=0;i<barHArr.length;i++){
			if(bHNum == barHArr[i]){
				present = true;
				break;
			}
			else present = false;
		}
		if(!present)	barHArr.push(bHNum);
		rangeArr[bHNum] += 1;
		
		bar.classList.remove('current');
	}
	//console.log(barHArr);
	/* indexing from counts */
	let cuSum = 0;
	for(let i=0;i<rangeArr.length;i++){
		cuSum+=rangeArr[i];
		indArr[i+1] = cuSum;
	}
	
	/* sorting barHArr */
	for(let i=0;i<barHArr.length;i++){
		await simpleBBLSort(i);
	}
	async function simpleBBLSort(i){
		for(let j=0;j<barHArr.length-(i+1);j++){
			if(barHArr[j] > barHArr[j+1]){
				await simpleBBLSwap(barHArr, j);
			}
			else	continue;
		}
	}
	async function simpleBBLSwap(arr, ind){
		let swpEl = arr[ind];
		arr[ind] = arr[ind+1];
		arr[ind+1] = swpEl;
	}
	//console.log(barHArr);

/*********************************************/
	
	/* counting sorting */
	for(let i=0;i<indArr.length;i++){
		if(barHArr.indexOf(i)!=-1){
			await sleep(Math.round(delay/2));
			let checked = await CNTsortCheck(barArr, indArr[i], barArr.length, i);
			if(checked)	continue;
		}
		else continue;
	}
	
	async function CNTsortCheck(arr, startInd, endInd, i){
		
		await sleep(delay);
		
		if(startInd == endInd) return true;
		else{
			for(let ind=startInd;ind<endInd;ind++){
				
				let bar = arr[ind];
				let bHNum = await getBarHeight(bar);
				
				if(bHNum == i){
					
					let iEl = barArr[ind];
					iEl.classList.add('swap');
					await sleep(delay);
					let swapped = await CNTSwap(ind, indArr[i], iEl);
					
					if(swapped = 'swapped'){
						indArr[i]+=1;
						let checked = await CNTsortCheck(arr, indArr[i], barArr.length, i);
						if(checked)	return true;
					}
				}
				else	continue;
				
			}
		}
		
		return true;
		
	}
	
	async function CNTSwap(oldInd,newInd,iEl){
		await sleep(Math.round(delay));
		
		let iElContent = iEl.outerHTML;
		
		let [edtNewInd,pos] = newInd == 0 ? [newInd,'beforebegin'] : [newInd-1,'afterend'];
		
		if(oldInd == newInd){
			iEl.classList.remove('swap');
			return 'swapped';
		}
		else{
			board.removeChild(iEl);
			board.children[edtNewInd].insertAdjacentHTML(pos,iElContent);
			await sleep(Math.round(delay));
			board.children[newInd].classList.remove('swap');
		}
		return 'swapped';
	}
	
	return 'done';
}

/* for radix sort */

async function radixSort(barArr){
	//alert('inside radixSort()');
	
	
	let rangeArr = Array(maxH+1).fill(0);
	let indArr = Array(maxH+1).fill(0);
	let barHArr = [];
	
/*********************************************/
	
	/* counting */
	for(let bar of barArr){
		bar.classList.add('current');
		await sleep(delay);
		let bHNum = await getBarHeight(bar);
		let present;
		for(let i=0;i<barHArr.length;i++){
			if(bHNum == barHArr[i]){
				present = true;
				break;
			}
			else present = false;
		}
		if(!present)	barHArr.push(bHNum);
		rangeArr[bHNum] += 1;
		bar.classList.remove('current');
	}
	//console.log(barHArr);
	/* indexing from counts */
	let cuSum = 0;
	for(let i=0;i<rangeArr.length;i++){
		cuSum+=rangeArr[i];
		indArr[i+1] = cuSum;
	}
	
	/* sorting barHArr */
	for(let i=0;i<barHArr.length;i++){
		await simpleBBLSort(i);
	}
	async function simpleBBLSort(i){
		for(let j=0;j<barHArr.length-(i+1);j++){
			if(barHArr[j] > barHArr[j+1]){
				await simpleBBLSwap(barHArr, j);
			}
			else	continue;
		}
	}
	async function simpleBBLSwap(arr, ind){
		let swpEl = arr[ind];
		arr[ind] = arr[ind+1];
		arr[ind+1] = swpEl;
	}
	//console.log(barHArr);

/*********************************************/
	
	/* counting sorting */
	for(let i=0;i<indArr.length;i++){
		if(barHArr.indexOf(i)!=-1){
			await sleep(Math.round(delay/2));
			let checked = await RDXsortCheck(barArr, indArr[i], barArr.length, i);
			if(checked)	continue;
		}
		else continue;
	}
	
	async function RDXsortCheck(arr, startInd, endInd, i){
		
		await sleep(delay);
		
		if(startInd == endInd) return true;
		else{
			for(let ind=startInd;ind<endInd;ind++){
				
				let bar = arr[ind];
				let bHNum = await getBarHeight(bar);
				
				if(bHNum == i){
					
					let iEl = barArr[ind];
					iEl.classList.add('swap');
					let swapped = await RDXSwap(ind, indArr[i], iEl);
					
					if(swapped = 'swapped'){
						indArr[i]+=1;
						let checked = await RDXsortCheck(arr, indArr[i], barArr.length, i);
						if(checked)	return true;
					}
				}
				else	continue;
				
			}
		}
		
		return true;
		
	}
	
	async function RDXSwap(oldInd,newInd,iEl){
		await sleep(Math.round(delay));
		
		let iElContent = iEl.outerHTML;
		
		let [edtNewInd,pos] = newInd == 0 ? [newInd,'beforebegin'] : [newInd-1,'afterend'];
		
		if(oldInd == newInd){
			iEl.classList.remove('swap');
			return 'swapped';
		}
		else{
			board.removeChild(iEl);
			board.children[edtNewInd].insertAdjacentHTML(pos,iElContent);
			await sleep(Math.round(delay));
			board.children[newInd].classList.remove('swap');
		}
		return 'swapped';
	}
	
	return 'done';
}
