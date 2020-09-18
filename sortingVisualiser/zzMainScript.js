/*
** Created by:
** Hanuma Ukkadapu
*/


// Make the barW 30 when displaying bar values

const [barW, barM, delay] = [40, 1, 200];
var barNo;
const [minH,maxH] = [1,10];
/*.Color Info details */
const sortClrInfo = {
	bubble: ['unsorted','current','swap','sorted'],
	insertion: ['unsorted','current','sorted'],
	quick: ['unsorted','pivot','low','high','swap','sorted'],
	radix: ['unsorted','current','sorted'],
	merge: ['unsorted','current','sorted'],
	heap: ['unsorted','current','sorted']
};
const clrBoxSpanCont = {
	unsorted: 'Not sorted yet',
	current: 'Current selected element',
	pivot: 'Selected Pivot',
	low: 'Value lower than Pivot',
	high: 'Value higher than Pivot',
	swap: 'Swapping elements',
	sorted: 'Sorted..!'
};

window.onload = ()=>{
   
/*******************************************************/    
    
    const root = document.documentElement;
    const openCIBtn = document.getElementById('openColorInfo');
    const colorInfoWrap = document.getElementById('colorInfoWrapper');
    
    var [ciwW, ciwH, ciwT, ciwR] = [colorInfoWrap.offsetWidth,
    								colorInfoWrap.offsetHeight,
    								(openCIBtn.offsetTop+openCIBtn.offsetHeight+10),
    								(root.offsetWidth-(openCIBtn.offsetLeft+openCIBtn.offsetWidth))];
    //console.log(ciW,ciH,ciT,ciR);
    colorInfoWrap.style.setProperty('--ciwT', `${ciwT}px`);
    colorInfoWrap.style.setProperty('--ciwR', `${ciwR}px`);
    let bool = false;
    openCIBtn.addEventListener('click',()=>{
    	let dsp = bool ? 'none' : 'block' ;
    	colorInfoWrap.style.display = dsp;
    	bool = !bool;
    });
    
    
    const navIns = document.querySelectorAll('nav li label input[type="radio"]');
	
	let sortType = 'bubble';
	fillClrInfoWrap(sortType);
	
    navIns.forEach((navIn)=>{
    	navIn.addEventListener('click',()=>{
    		let bool = navIn.parentElement.classList.contains('active');
    		if(!bool){
    			navIns.forEach((el)=>{
    				el.parentElement.classList.remove('active');
    			});
    			navIn.parentElement.classList.add('active');
    		}
    		sortType = navIn.value;
    		//console.log(sortType);
    		fillClrInfoWrap(sortType);
    	});
    });
    
    function fillClrInfoWrap(sortName){
    	colorInfoWrap.textContent = '';
        let srtArr = sortClrInfo[`${sortName}`];
        for(let el of srtArr){
        	let spanCont = clrBoxSpanCont[`${el}`];
        	let clrWrpEl = `<div class="colorWrap flex-cc" ><span class="colorBox ${el}" ></span><span>${spanCont}</span></div>`;
        	colorInfoWrap.insertAdjacentHTML('beforeend',clrWrpEl);
        }
    }
    
    /* The Main Content */
    
    /*
    ** barW - width of the bar in px
    ** delay - sleep delay in ms
    */
    
    root.style.setProperty('--barW',`${barW}px`);
    root.style.setProperty('--barM',`5px ${barM}px`)
    const board = document.getElementById('board');
    const divEl = '<div class="bar flex-cc col"></div>';
    
    const startBtn = document.getElementById('startSort');
    const genBtn = document.getElementById('genNewArr');
    let [winW, winH] = [root.clientWidth, root.clientHeight];
    
    barNo = Math.floor(winW/(barW+(barM*2)))-1;
    generateNewArray();
    
    //console.log(winW, divNo, winH);
    function generateNewArray(){
        board.textContent = '';
        for(let i=0;i<barNo;i++){
            let x = Math.floor(Math.random()*(maxH-minH)+minH);
            board.insertAdjacentHTML('beforeend',divEl);
            //console.log(`${x}px`);
            board.lastElementChild.setAttribute('style',`height: ${x}px`);
            // comment
            board.lastElementChild.innerHTML = `<span class="flex-cc" >${x}</span`;
        }
    }
    
    function changeStateNavIns(newState){
    	switch(newState){
    		case 'disable':
    			navIns.forEach((navIn)=>{
					navIn.setAttribute('disabled','');
					navIn.parentElement.classList.add('disabled');
        		});
        		break;
        	case 'enable':
        		navIns.forEach((navIn)=>{
        			navIn.removeAttribute('disabled');
        			navIn.parentElement.classList.remove('disabled');
        		});
        		break;
    	}
    }
    
    genBtn.addEventListener('click',()=>{
        generateNewArray();
        startBtn.removeAttribute('disabled');
        changeStateNavIns('enable');
    });
    
    startBtn.addEventListener('click',async function (){
        startBtn.setAttribute('disabled','');
        genBtn.setAttribute('disabled','');
        changeStateNavIns('disable');
        
        //console.log(`running ${sortType} sort`);
        alert(`selected ${sortType} sort`);
        let sorting;
        switch (sortType) {
        	case 'bubble':
        		sorting = await bubbleSort();
        		break;
        	case 'insertion':
        		sorting = await insertionSort();
        		break;
        	case 'quick':
        		sorting = await quickSort(board.children,0,board.children.length-1);
        		break;
        	case 'radix':
        		sorting = await radixSort(board,board.children);
        		break;
        	case 'merge':
        		sorting = await sort(board.children,0,board.children.length-1);
        		break;
        	case 'heap':
        		sorting = await sort(board.children,0,board.children.length-1);
        		break;
        	default:
        		alert('please select a sorting algorithm from the above menu');
        		break;
        }
        
    	//let sorting = await sort(board.children,0,board.children.length-1);
        //console.log(sorting);
        if(sorting == 'done'){
            for(let bar of board.children){
            	await sleep(Math.round(delay/2));
            	bar.classList.add('sorted');
            }
            genBtn.removeAttribute('disabled');
        }
        
    });
    
}

async function sort(arr, l, r){
	await sleep(delay*2);
    for(let i=l;i<r;i++){
    	arr[i].classList.add('current');
    	await sleep(delay*2);
    	arr[i].classList.remove('current');
    }
    return 'done';
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}