/*
** Created by:
** Hanuma Ukkadapu
*/

//alert('Loaded: zzInsertionSort.js');

async function insertionSort(){
    
    for(let i=0;i<barNo;i++){
        await INSCheck(i);
    }
    
    async function INSCheck(i){
	    
	    for(let j=i;j>=0;j--){
	        let currEl = board.children[j];
	        currEl.classList.add('current');
	        if(j!=0){
	            let prevEl = board.children[j-1];
	            await sleep(delay);
	            let [hNum, prevHNum] = [Math.round(Number(currEl.getAttribute('style').slice(7,-2))),
	            						Math.round(Number(prevEl.getAttribute('style').slice(7,-2)))];
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
