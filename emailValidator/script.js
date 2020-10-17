
let eRegEx = /[\S]+@\S+\.[\S]+/,
	eRegEx2 = /(?<userName>[\S]+)@(?<domainName>\S+\.[\S\.]+)/;

function setStateAndValidP(str,state, ...args ){
	args[args.length-1].textContent = '';
    args[args.length-1].insertAdjacentHTML('beforeend',str);
    args.forEach( (el)=>{ el.className = state } );
}

window.onload = ()=>{
    
    const inDivEls = document.querySelectorAll('#inDiv > *'),
    	  emailIn = document.getElementById('emailIn'),
    	  chkBtn = document.getElementById('checkBtn'),
    	  validP = document.getElementById('validEmailP');
    
    emailIn.addEventListener('input',()=>{
        
        let email = emailIn.value,
        	[str, state] = ['',''];
        if(eRegEx.test(email)){
            let emailArr = email.match(eRegEx);
            //let emailArr = eRegEx.exec(email);
            //let emailMtchAll = email.matchAll(eRegEx);
            if(emailArr[0].length !== email.length)
            	[str, state] = ['Invalid Email: No spaces allowed!', 'invalid'];
            else if(emailArr !== null){
                let [uN, dN] = ['User Name:','Domain Name:'],
                	emailGrps = email.match(eRegEx2).groups;
                [str, state] = [`Valid Email: Your Email is ${emailArr[0]} <pre><br/>${uN.padStart(dN.length,' ')} ${emailGrps.userName} \n${dN} ${emailGrps.domainName}</pre>`,
                				'valid'];
            }
        }
        else if(email === '' )
        	[str, state] = ["This will update as you type", ''];
        else
            [str, state] = [email.match(' ') ? 'No spaces allowed!' : 'Please enter a valid Email address',
            				'invalid'];
        setStateAndValidP(str,state, ...inDivEls, validP);
        
    });
    
};

