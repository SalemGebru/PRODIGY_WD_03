
const switchX=document.getElementById('switch-x');
const switchO=document.getElementById('switch-o');
const turnText=document.getElementById('turn-text');
const resultAnnounce=document.getElementById('announcement');
const resetBtn=document.getElementById('restart');
const cells=document.querySelectorAll('.box');
const winCondition=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let currentPlayer;

let spaces=Array(9).fill(null);


resetBtn.addEventListener('click',initialize);

function initialize(){

  spaces.fill(null);
  cells.forEach(box=>box.innerHTML="");
  resultAnnounce.innerHTML="";
  currentPlayer='X';
  turnText.innerHTML=`${currentPlayer}'s turn`;
  switchO.classList.remove('turn');
  switchX.classList.remove('turn');
  switchX.style.backgroundColor = ''; 
  switchO.style.backgroundColor = ''; 
  Switch(currentPlayer);
  startGame();
  
}

const startGame=()=>{
  
  cells.forEach((box)=> box.addEventListener('click',playGame));

}

function playGame(e){

  const id=e.target.id;

  if(!spaces[id]){
    spaces[id]=currentPlayer;
    e.target.innerHTML=currentPlayer;
     if(checkWin()!=false){
      resultAnnounce.innerHTML=`${currentPlayer} has won!`;
      cells.forEach(box => box.removeEventListener('click', playGame));
      switchO.style.backgroundColor='white';
      switchX.style.backgroundColor='white';
      turnText.textContent=null;
      return;
      
    }
    else if (spaces.every(space => space !== null)) {
      resultAnnounce.innerHTML = "It's a tie!";
      cells.forEach(box => box.removeEventListener('click', playGame));
      switchO.style.backgroundColor='white';
      switchX.style.backgroundColor='white';
      turnText.textContent=null;
      return;
     }
      
    currentPlayer= currentPlayer=='X'? 'O':'X';
    Switch(currentPlayer);
    turnText.innerHTML=`${currentPlayer}'s turn`;

  }
}
function Switch(current){
  if(current=='X'){
    
    switchX.classList.add('turn');
    switchO.classList.remove('turn');
    
  }
  else{
   
    switchO.classList.add('turn');
    switchX.classList.remove('turn');
    
  }
}

function checkWin(){
  for(let condition of winCondition){
    const [a,b,c]=condition;
   
    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c]; 
    }
    
  }
  
  return false; 
  }

initialize();
