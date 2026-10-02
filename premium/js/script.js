function nav(p){document.querySelectorAll('#app .page').forEach(function(e){e.classList.toggle('active', e.dataset.page===p)}); if(p==='game') startGame();}
var gState={};
function startGame(){
  var emojis="🔌,📡,💡,🖥️,🔒,📷,🛠️,📶".split(',').map(function(s){return s.trim()}).filter(Boolean).slice(0,8);
  var deck=emojis.concat(emojis).sort(function(){return Math.random()-.5});
  gState={deck:deck, flipped:[], matched:[], moves:0};
  var grid=document.getElementById('gGrid'); grid.innerHTML='';
  deck.forEach(function(e,i){
    var c=document.createElement('div'); c.className='cell hidden-c'; c.dataset.i=i;
    c.onclick=function(){flipCell(i)};
    grid.appendChild(c);
  });
  updateBar();
}
function flipCell(i){
  if(gState.flipped.length===2 || gState.flipped.indexOf(i)>-1 || gState.matched.indexOf(i)>-1) return;
  var cells=document.querySelectorAll('#gGrid .cell');
  cells[i].textContent=gState.deck[i]; cells[i].classList.remove('hidden-c');
  gState.flipped.push(i);
  if(gState.flipped.length===2){
    gState.moves++;
    var a=gState.flipped[0], b=gState.flipped[1];
    if(gState.deck[a]===gState.deck[b]){
      gState.matched.push(a,b); cells[a].classList.add('matched'); cells[b].classList.add('matched');
      gState.flipped=[]; updateBar();
    } else {
      setTimeout(function(){
        cells[a].textContent=''; cells[a].classList.add('hidden-c');
        cells[b].textContent=''; cells[b].classList.add('hidden-c');
        gState.flipped=[]; updateBar();
      },650);
    }
    updateBar();
  }
}
function updateBar(){
  document.getElementById('gMoves').textContent='Movimientos: '+gState.moves;
  document.getElementById('gPairs').textContent='Pares: '+(gState.matched.length/2)+'/8';
}
