function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');if(id==='game'&&!started)initGame();window.scrollTo(0,0);}
let started=false,flipped=[],matched=0,moves=0,lock=false;
const em=['☕','🥐','🍩','🥯','🧁','🍫','🍪','🥧'];
function initGame(){started=true;flipped=[];matched=0;moves=0;lock=false;
  document.getElementById('win').style.display='none';
  document.getElementById('mv').textContent='Movimientos: 0';
  document.getElementById('pr').textContent='Pares: 0/8';
  const deck=[...em,...em].sort(()=>Math.random()-0.5);
  const g=document.getElementById('grid');g.innerHTML='';
  deck.forEach(e=>{const c=document.createElement('div');c.className='card';c.dataset.e=e;c.onclick=()=>flip(c);g.appendChild(c);});
}
function flip(c){if(lock||c.classList.contains('flip')||c.classList.contains('match'))return;
  c.textContent=c.dataset.e;c.classList.add('flip');flipped.push(c);
  if(flipped.length===2){moves++;document.getElementById('mv').textContent='Movimientos: '+moves;lock=true;
    if(flipped[0].dataset.e===flipped[1].dataset.e){flipped.forEach(f=>f.classList.add('match'));matched++;
      document.getElementById('pr').textContent='Pares: '+matched+'/8';flipped=[];lock=false;
      if(matched===8){document.getElementById('fm').textContent=moves;document.getElementById('win').style.display='block';}
    }else{setTimeout(()=>{flipped.forEach(f=>{f.classList.remove('flip');f.textContent='';});flipped=[];lock=false;},650);}
  }
}