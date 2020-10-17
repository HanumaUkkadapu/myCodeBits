

window.onload = ()=>{
    
    const inDivEls = document.querySelectorAll('#inDiv > *');
    const emailIn = document.getElementById('emailIn');
    const chkBtn = document.getElementById('checkBtn');
    const validP = document.getElementById('validEmailP');
    
    let eRegEx = /[\S]+@\S+\.[\S]+/g;
    
    let eRegEx2 = /(?<userName>[\S]+)@(?<domainName>\S+\.[\S\.]+)/;
    
    emailIn.addEventListener('input',()=>{
        
        let email = emailIn.value;
        if(eRegEx.test(email)){
            let emailArr = email.match(eRegEx);
            //let emailArr = eRegEx.exec(email);
            //let emailMtchAll = email.matchAll(eRegEx);
            
            if(emailArr != null){
                
                let [uN, dN] = ['User Name:','Domain Name:'];
                let emailGrps = email.match(eRegEx2).groups;
                setState('valid', ...inDivEls, validP);
                validP.innerHTML = `Valid Email: Your Email is ${emailArr[0]} <pre><br/>${uN.padStart(dN.length,' ')} ${emailGrps.userName} \n${dN} ${emailGrps.domainName}</pre>`;
            }
        }
        else if(email == '' ){
            setState('', ...inDivEls, validP);
            validP.innerHTML = "This will update as you type";
        }
        else{
            let str = email.match(' ') ? 'No spaces allowed!' : 'Please enter a valid Email address';
            setState('invalid', ...inDivEls, validP);
            validP.innerHTML = `Invalid Email: ${str}`;
        }
        
    });
    
}

function setState(state, ...args ){
    args.forEach((el)=>{
        el.className = state;
    });
}

