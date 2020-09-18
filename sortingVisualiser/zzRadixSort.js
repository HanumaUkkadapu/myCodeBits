/*
** Created by:
** Hanuma Ukkadapu
*/

//alert(`Loaded: zzRadixSort.js`);

async function radixSort(board, barArr){
	alert('inside radixSort()');
	
	//let hArr = [];
	let rangeArr = Array(maxH+1).fill(0);
	let indArr = Array(maxH+1).fill(0);
	//console.log(rangeArr.length);
	for(let bar of barArr){
		let bHNum = Math.round(Number(bar.getAttribute('style').slice(7,-2)));
		rangeArr[bHNum] += 1;
	}
	
	let cuSum = 0;
	for(let i=0;i<rangeArr.length;i++){
		cuSum+=rangeArr[i];
		indArr[i+1] = cuSum;
	}
	console.log('rangeArr', rangeArr, 'indArr', indArr, barNo);
	
	for(let i in indArr){
		
		console.log(`inside indArr, i: ${i}`);
		await sleep(delay);
		let checked = await RDXsortCheck(barArr, indArr[i], barArr.length, i);
		console.log(`checked: ${checked}`);
		if(checked)	continue;
		
	}
	
	
	/*
	for(let i=0;i<indArr.length;i++){
		
		await sleep(delay);
		
		let chkH = indArr[i];
		for(let bar of arr){
			let bHNum = Math.round(Number(bar.getAttribute('style').slice(7,-2)));
			if(bHNum==i){
				
			}
		}
		
		for(let bar of arr){
			await sleep(delay);
			console.log('now sorting');
			
			let bHNum = Math.round(Number(bar.getAttribute('style').slice(7,-2)));
			//console.log(bHNum, indArr[bHNum]);
			
			let ind = indArr[bHNum];
			let currInd = [...arr].indexOf(bar);
			console.log(`ind: ${ind} currInd: ${currInd} bHNum: ${bHNum}`);
			
			await sleep(delay);
			let swapped = await RDXSwap(ind, currInd, arr[ind], arr[currInd]);
			if(swapped = 'swapped'){
				console.log(swapped);
				indArr[bHNum]+=1;
			}
		}
	}
	*/
	
	async function RDXsortCheck(arr, startInd, endInd, i){
		
		console.log('inside RDXsortCheck()');
		await sleep(delay);
		
		if(startInd == endInd) return true;
		else{
			for(let ind=startInd;ind<endInd;ind++){
				
				console.log(`inside for loop`);
				await sleep(delay);
				
				let bar = arr[ind];
				let bHNum = Math.round(Number(bar.getAttribute('style').slice(7,-2)));
				
				console.log(`bHNum: ${bHNum}\ti: ${i}`);
				if(bHNum == i){
					
					let iEl = barArr[ind];
					let swapped = await RDXSwap(ind, indArr[i], iEl);
					
					console.log(`swapped: ${swapped}`);
					
					if(swapped = 'swapped'){
						indArr[i]+=1;
						await RDXsortCheck(arr, indArr[i], barArr.length, i);
					}
				}
				else	continue;
				
			}
		}
		
		return true;
		
	}
	
	/*
	async function RDXSwap(i,j,iEl,jEl){
		console.log('inside RDXSwap()');
		await sleep(delay);
		iEl.classList.remove('swap');
		jEl.classList.remove('swap');
		let iElContent = iEl.outerHTML;
		let jElContent = jEl.outerHTML;
		console.log(`i: ${i}\tj: ${j}`);
		
		board.removeChild(iEl);
		
		if(i===j)	return 'swapped';
		else if(j==0){
			board.children[j].insertAdjacentHTML('beforebegin',iElContent);
		}
		else{
			board.children[j-1].insertAdjacentHTML('afterend',iElContent);
		}
		
		return 'swapped';
	}
	*/
	
	// code goes here..
	
	return 'done';
}

async function RDXSwap(oldInd,newInd,iEl){
	console.log('inside RDXSwap()');
	await sleep(delay);
	
	let iElContent = iEl.outerHTML;
	console.log(`fromInd: ${oldInd}\ttoInd: ${newInd}\tiElCont: ${iElContent}`);
	//iEl.classList.remove('swap');
	//jEl.classList.remove('swap');
	//console.log(`ind of Bar: ${oldInd}\tbHNum: ${bHNum}\tind from indArr: ${newInd}`);
	
	let [edtNInd,pos] = newInd == 0 ? [newInd,'beforebegin'] : [newInd-1,'afterend'];
	console.log(`newInd: ${newInd}\tedtNInd: ${edtNInd}\tpos: ${pos}`);
	
	if(oldInd == newInd){
		return 'swapped';
	}
	else{
		//console.log(`inside newInd==0 if statement: ${board.children.length}`);
		board.removeChild(iEl);
		console.log('removed iEl');
		board.children[edtNInd].insertAdjacentHTML(pos,iElContent);
	}
	/*
	else if(newInd==0){
		console.log(`inside newInd==0 if statement: ${board.children.length}`);
		board.removeChild(iEl);
		console.log('removed iEl');
		board.children[newInd].insertAdjacentHTML('beforebegin',iElContent);
	}
	else{
		board.removeChild(iEl);
		board.children[newInd-1].insertAdjacentHTML('afterend',iElContent);
	}
	*/
	
	return 'swapped';
}
