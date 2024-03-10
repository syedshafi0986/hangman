// 'use strict';
let letterdiv=document.querySelector('.letter-div')
let hintdiv=document.querySelector('.hint-div')
let hinttext=document.querySelector('.hint-text')
let resetbutton=document.getElementById('reset-btn')
let hintbutton=document.getElementById('hint-btn')
let worddiv=document.querySelector('.word-div')
let lifespan=document.querySelector('.lives')
let notif=document.querySelector('.notif')
let notifcontent=document.querySelector('.notif-content')
let notifspan=document.querySelector('.notif-span')
let playagian=document.querySelector('.notif-button')
let letter;
let selectword;
let lives;
let hintvalue;
let remaining=document.querySelector('.rlives')
let container=document.querySelector('.container')
let hangman=document.querySelector('.hanged')

const word=new Map([
    ['test','a test word'],
    ['random','a random word'],
    ['pani','a water word'],
])
const word_list=[...word.keys()]
const hints=[...word.values()]
const getword=function (){
    let list=Math.floor(Math.random()*word_list.length)
    return list;
    //returns the index of map
    
    
}
let str='man h a n g '
let a=str.split(' ')
// worddiv.innerHTML='';
const init =function(state){
    worddiv.innerHTML=''; 
    container.classList.remove('hidden')
    remaining.classList.remove('hidden')

    if(state==='start'){
        for( let i of "abcdefghijklmnopqrstuvwxyz"){
            let ht=`<button class="letterbtn ">${i}</button>`
            letterdiv.insertAdjacentHTML('beforeend',ht)
            
        }
        
    }
    else if(state==='reset'){
        letter.forEach(btn=>{
            btn.classList.remove('disable')
            // lives=5;
            hintdiv.classList.add('hidden')
            notif.classList.add('hidden')
            for(let i in a){
                hangman.children[i].classList.add('hidden')
            }
            
        })
        
    }
    
    letter=document.querySelectorAll('.letterbtn')
    //generating the actual random word from the keys of map
     lives=5;
    lifespan.textContent=lives;
    selectword=word_list[getword()]
    console.log(selectword)
    for(let i=0;i<selectword.length;i++){
        let html=`<p class="word ">_</p>`;
        worddiv.insertAdjacentHTML('beforeend',html)
    }
    for(let i of a){
        let hng=`<h1 class='hang hidden'>${i}</h1>`
        hangman.insertAdjacentHTML('beforeend',hng)

    }
     hintvalue=word.get(selectword)
}
init('start')
// console.log(hintvalue)
// console.log(hintvalue)
let hintdisplay =function(){
    hinttext.textContent=hintvalue;
    hintdiv.classList.remove('hidden')
}
hintbutton.addEventListener('click',hintdisplay)
// let letbtn=[];
let clicked=function(){
    
    let letbtn=this.textContent;
    if(selectword.includes(letbtn)){
        
        [...selectword].forEach((val,i)=>{
            if(letbtn===val)
            {
                // console.log('yes')
                worddiv.children[i].textContent=val;
                if(checkword()){
                    shownotif('you won')
                    container.classList.add('hidden')
                    
                    
                }
                
                
            }   
        }
        )
        
    }
    else{
        lives--
        // console.log(lives)
        hangman.children[lives].classList.remove('hidden')
        lifespan.textContent=lives;
        if(lives==0){
            
            shownotif('you lost')
            remaining.classList.add('hidden')
            container.classList.add('hidden')
        }
}
this.classList.add('disable')

}


letter.forEach(btn => {
    btn.addEventListener('click', clicked)
})
// console.log(letbtn)
// if(val!=letbtn){
    //     console.log('no')
    // }
    
    




    let checkword=function (){
        let value=true;
    
        for(i=0;i<worddiv.children.length;i++){
            if(worddiv.children[i].textContent==='_'){
    
                value=false;
            }
            
            
            
        }
        return value;
    }


        

 
 let shownotif= function (msg){
    notif.classList.remove('hidden')
    notifcontent.textContent=msg
    notifspan.textContent=selectword;
 }
// console.log(letter)
resetbutton.addEventListener('click', function()
{
    init('reset')})
playagian.addEventListener('click', function()
{
    init('reset')})