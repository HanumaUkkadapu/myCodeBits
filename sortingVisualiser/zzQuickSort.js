/*
** Created by:
** Hanuma Ukkadapu
*/

//alert(`Loaded: zzQuickSort.js`);

async function quickSort(arr, left, right){
	await sleep(delay);
	//console.log(`inside quickSort\nl: ${left}\tr: ${right}`);
	if(left >= right)	return;
	else{
		let pivot = await partition(arr, left, right);
		//console.log(`pivot: ${pivot}`);
		
		await quickSort(arr, left, pivot-1);
		await quickSort(arr, pivot+1, right);
	}
	
	/* Partition function */
	async function partition(arr, l, r){
		await sleep(delay);
		//console.log('inside partition');
		let p = r;
		let pEl = arr[p];
		pEl.classList.add('pivot');
		let pHNum = Math.round(Number(pEl.getAttribute('style').slice(7,-2)));
		//console.log(`pVal: ${pHNum}`);
		
		let j=l,i=l-1;
		
		for(j;j<r;j++){
			let jEl = arr[j];
			let jHNum = Math.round(Number(jEl.getAttribute('style').slice(7,-2)));
			await sleep(delay);
			//console.log(`j: ${j}\tjVal: ${jHNum}`);
			
			if(jHNum < pHNum){
				jEl.classList.add('low');
				await sleep(delay);
				++i;
				if(i!==j){
					jEl.classList.add('swap');
					let iEl = arr[i];
					let iHNum = Math.round(Number(iEl.getAttribute('style').slice(7,-2)));
					iEl.classList.add('swap');
					await sleep(delay);
					//console.log(`i: ${i}\tiVal: ${iHNum}`);
					await QCKSwap(i,j,iEl,jEl);
				}
				//await sleep(delay);
			}
			//else if(j==r) console.log('end of loop');
			else{
				jEl.classList.add('high');
				await sleep(delay);
				continue;
			}
		}
		
		for(let x=0;x<r;x++){
			arr[x].classList.remove('low');
			arr[x].classList.remove('high');
		}
		
		await sleep(delay);
		pEl.classList.remove('pivot');
		
		await QCKSwap(i+1,r,arr[i+1],arr[r]);
		//console.log(`pivot: ${i+1}`);
		return i+1;
	}
	
	return 'done';
	
}

/* Swap function */
async function QCKSwap(i,j,iEl,jEl){
	//console.log('inside QCKSwap()');
	await sleep(delay);
	jEl.classList.remove('swap');
	iEl.classList.remove('swap');
	let iElContent = iEl.outerHTML;
	let jElContent = jEl.outerHTML;
	//console.log(`i: ${i}\tj: ${j}`);
	if(i===j)	return;
	else if(j<board.children.length-1){
		board.removeChild(iEl);
		board.children[j].insertAdjacentHTML('beforebegin',iElContent);
		//console.log(`i: ${i}\tj: ${j}`);
		board.removeChild(jEl);
		board.children[i].insertAdjacentHTML('beforebegin',jElContent);
	}
	else{
		board.removeChild(iEl);
		board.children[j-1].insertAdjacentHTML('beforebegin',iElContent);
		//console.log(`i: ${i}\tj: ${j}`);
		board.removeChild(jEl);
		board.children[i].insertAdjacentHTML('beforebegin',jElContent);
	}
	
}

