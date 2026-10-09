function nav(p){document.querySelectorAll('#app .page').forEach(function(e){e.classList.toggle('active', e.dataset.page===p)}); if(p==='game') startGame();}
var MENU_DATA=[{"label":"Servicios","icon":"🛠️","items":[{"name":"Instalación de cámaras","price":"$1,500","desc":"Incluye instalación, configuración y pruebas","emoji":"🎥","top":false},{"name":"Configuración de red","price":"$800","desc":"Configuración de router y red WiFi","emoji":"📶","top":false},{"name":"Instalación de punto de red","price":"$650","desc":"Incluye cableado y conectorización","emoji":"🔌","top":false},{"name":"Configuración de router","price":"$500","desc":"Configuración de WiFi, seguridad y contraseña","emoji":"📡","top":false},{"name":"Instalación de access point","price":"$900","desc":"Instalación y configuración de punto de acceso","emoji":"📶","top":false},{"name":"Mantenimiento de cámaras","price":"$750","desc":"Limpieza, revisión y ajuste del sistema","emoji":"🧰","top":false},{"name":"Configuración de DVR","price":"$600","desc":"Configuración de grabación y acceso remoto","emoji":"🎞️","top":false},{"name":"Configuración de NVR","price":"$650","desc":"Configuración de cámaras IP y almacenamiento","emoji":"💾","top":false},{"name":"Instalación de switch","price":"$700","desc":"Instalación y configuración básica","emoji":"🔀","top":false},{"name":"Diagnóstico de red","price":"$500","desc":"Revisión de conexión, velocidad y cobertura","emoji":"🔍","top":false},{"name":"Optimización de WiFi","price":"$850","desc":"Análisis y mejora de cobertura inalámbrica","emoji":"📶","top":false},{"name":"Cableado estructurado","price":"$1,200","desc":"Instalación y organización de cableado","emoji":"🧵","top":false},{"name":"Configuración de VLAN","price":"$900","desc":"Segmentación y configuración de red","emoji":"🖧","top":false},{"name":"Instalación de control de acceso","price":"$1,800","desc":"Instalación y configuración del sistema","emoji":"🔐","top":false},{"name":"Mantenimiento preventivo","price":"$950","desc":"Revisión general de equipos y conexiones","emoji":"🛠️","top":false}]},{"label":"Productos","icon":"📦","items":[{"name":"Cámara Hikvision 2MP","price":"$950","desc":"Cámara para videovigilancia","emoji":"📷","top":false},{"name":"Cámara Hikvision 4MP","price":"$1,450","desc":"Mayor resolución de imagen","emoji":"🎥","top":false},{"name":"DVR Hikvision 4 canales","price":"$1,650","desc":"Grabador para cámaras de seguridad","emoji":"💾","top":false},{"name":"NVR Hikvision 8 canales","price":"$2,450","desc":"Grabador para cámaras IP","emoji":"🖥️","top":false},{"name":"Disco duro 1TB","price":"$1,150","desc":"Almacenamiento para videovigilancia","emoji":"💽","top":false},{"name":"Router WiFi 6","price":"$1,200","desc":"Router inalámbrico de alta velocidad","emoji":"📡","top":false},{"name":"Access Point WiFi 6","price":"$1,850","desc":"Cobertura WiFi para negocios","emoji":"📶","top":false},{"name":"Switch Gigabit 8 puertos","price":"$850","desc":"Conectividad para equipos de red","emoji":"🔀","top":false},{"name":"Switch PoE 8 puertos","price":"$1,650","desc":"Alimentación PoE para cámaras y AP","emoji":"⚡","top":false},{"name":"Cable UTP Cat6 10 metros","price":"$250","desc":"Cable Ethernet para redes Gigabit","emoji":"🔌","top":false},{"name":"Patch Cord Cat6 1 metro","price":"$90","desc":"Cable de conexión Ethernet","emoji":"🧵","top":false},{"name":"Conector RJ45 Cat6","price":"$15","desc":"Conector para cable de red","emoji":"🔗","top":false},{"name":"UPS 1000VA","price":"$1,650","desc":"Respaldo eléctrico para equipos","emoji":"🔋","top":false},{"name":"Rack de pared 6U","price":"$1,850","desc":"Organización de equipos de telecomunicaciones","emoji":"🗄️","top":false},{"name":"Fuente de poder 12V","price":"$350","desc":"Alimentación para cámaras CCTV","emoji":"⚡","top":false}]},{"label":"Paquetes","icon":"🎁","items":[{"name":"Paquete CCTV Básico","price":"$8,500","desc":"2 cámaras, DVR, disco duro, instalación y configuración","emoji":"🎥","top":false},{"name":"Paquete CCTV Negocio","price":"$12,500","desc":"4 cámaras, DVR, disco duro, instalación y configuración","emoji":"🏪","top":false},{"name":"Paquete WiFi Negocio","price":"$6,500","desc":"Access point, configuración y optimización de cobertura","emoji":"📶","top":false},{"name":"Paquete Red Oficina","price":"$7,900","desc":"Switch, cableado y 6 puntos de red","emoji":"🖧","top":false},{"name":"Paquete Seguridad y Red","price":"$14,900","desc":"CCTV, red WiFi y configuración completa","emoji":"🛡️","top":false}]},{"label":"Tecnología NFC","icon":"📲","items":[{"name":"Tarjeta NFC Digital","price":"$350","desc":"Acceso a información mediante NFC y QR","emoji":"💳","top":false},{"name":"Tarjeta NFC para Reseñas","price":"$450","desc":"Acceso directo a reseñas de Google","emoji":"⭐","top":false},{"name":"Tarjeta NFC para WhatsApp","price":"$350","desc":"Abre directamente una conversación de WhatsApp","emoji":"💬","top":false},{"name":"Menú Digital Básico","price":"$1,200","desc":"Menú optimizado para dispositivos móviles","emoji":"📱","top":false},{"name":"Menú Digital + NFC","price":"$1,650","desc":"Menú digital con tarjeta NFC configurada","emoji":"🍽️","top":false},{"name":"Perfil Digital Profesional","price":"$1,500","desc":"Servicios, contacto, fotografías y redes sociales","emoji":"👤","top":false},{"name":"Perfil Digital + NFC","price":"$1,850","desc":"Perfil profesional con tarjeta NFC","emoji":"💼","top":false},{"name":"Configuración NFC","price":"$250","desc":"Programación y pruebas de tarjeta NFC","emoji":"📲","top":false}]}];
var MENU_STATE={cat:null,q:''}, CART={};
function esc2(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function priceNum(p){var n=parseFloat((p||'').replace(/[^0-9.]/g,'')); return isNaN(n)?0:n;}
function renderMenuPage(){
  if(!MENU_STATE.cat || !MENU_DATA.find(function(c){return c.label===MENU_STATE.cat})) MENU_STATE.cat = MENU_DATA[0]?MENU_DATA[0].label:null;
  var tabsEl=document.getElementById('menuTabs');
  tabsEl.innerHTML = MENU_DATA.map(function(c){return '<button class="mtab'+(c.label===MENU_STATE.cat?' active':'')+'" data-cat="'+esc2(c.label)+'">'+c.icon+' '+esc2(c.label)+'</button>';}).join('');
  Array.prototype.forEach.call(tabsEl.querySelectorAll('.mtab'), function(b){ b.onclick=function(){ MENU_STATE.cat=b.dataset.cat; MENU_STATE.q=''; document.getElementById('menuSearch').value=''; renderMenuPage(); }; });
  renderMenuGrid();
}
function renderMenuGrid(){
  var q=(MENU_STATE.q||'').toLowerCase(), items;
  if(q){ items=[]; MENU_DATA.forEach(function(c){ c.items.forEach(function(it){ if((it.name+' '+it.desc).toLowerCase().indexOf(q)>-1) items.push(it); }); }); }
  else { var c=MENU_DATA.find(function(c){return c.label===MENU_STATE.cat}); items=c?c.items:[]; }
  var grid=document.getElementById('menuGrid');
  grid.innerHTML = items.length ? items.map(function(it,i){ return '<div class="menuCard"><div class="mThumb c'+(i%4)+'">'+it.emoji+'</div><div class="mInfo">'+(it.top?'<span class="mBadge">★ Destacado</span>':'')+'<b>'+esc2(it.name)+'</b>'+(it.desc?'<small>'+esc2(it.desc)+'</small>':'')+'<div class="mRow"><span class="mPrice">'+esc2(it.price)+'</span><button class="mAdd" data-n="'+esc2(it.name)+'" data-p="'+esc2(it.price)+'">Agregar</button></div></div></div>'; }).join('') : '<p class="emptyMsg">No encontramos productos.</p>';
  Array.prototype.forEach.call(grid.querySelectorAll('.mAdd'), function(b){ b.onclick=function(){
    var n=b.dataset.n; if(!CART[n]) CART[n]={qty:0,price:b.dataset.p}; CART[n].qty++;
    b.textContent='Agregado ✓'; b.classList.add('added'); setTimeout(function(){b.textContent='Agregar'; b.classList.remove('added');},900);
    updateOrderBar();
  }; });
}
function clearOrder(){ CART={}; updateOrderBar(); }
function removeFromCart(n){ delete CART[n]; updateOrderBar(); }
var BIZ_NAME="Zyntro", ORDER_WA="523334073035";
function buildTicketPdf(){
  if(!window.jspdf || !window.jspdf.jsPDF){
    throw new Error("No se pudo cargar jsPDF. Verifica tu conexión a Internet.");
  }
  var jsPDF=window.jspdf.jsPDF;
  var doc=new jsPDF({unit:"mm",format:"a4"});
  var now=new Date().toLocaleString("es-MX");
  doc.setFontSize(16); doc.text(BIZ_NAME,14,18);
  doc.setFontSize(10); doc.text("Ticket de pedido · "+now,14,25);
  doc.setLineWidth(.3); doc.line(14,29,196,29);
  var y=38,total=0;
  doc.setFontSize(11);
  Object.keys(CART).forEach(function(n){
    var it=CART[n], sub=it.qty*priceNum(it.price); total+=sub;
    if(y>275){doc.addPage(); y=20;}
    doc.text(it.qty+"x "+n,14,y);
    doc.text("$"+sub.toFixed(2),196,y,{align:"right"});
    y+=7;
  });
  doc.setLineWidth(.3); doc.line(14,y+2,196,y+2);
  doc.setFontSize(13); doc.text("Total: $"+total.toFixed(2),14,y+12);
  return doc;
}

function orderText(){
  var total=0;
  var lines=Object.keys(CART).map(function(n){
    var it=CART[n],sub=it.qty*priceNum(it.price); total+=sub;
    return it.qty+"x "+n+" - $"+sub.toFixed(2);
  });
  return "Pedido - "+BIZ_NAME+"\n"+lines.join("\n")+"\nTotal: $"+total.toFixed(2);
}

function downloadBlob(blob,name){
  var url=URL.createObjectURL(blob);
  var a=document.createElement("a");
  a.href=url; a.download=name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){URL.revokeObjectURL(url);},1500);
}

function downloadOrderPdf(){
  if(Object.keys(CART).length===0){alert("Agrega al menos un producto.");return;}
  try{
    var doc=buildTicketPdf();
    downloadBlob(doc.output("blob"),"pedido-"+Date.now()+".pdf");
  }catch(e){alert(e.message || "No fue posible crear el PDF.");}
}

async function shareOrderPdf(){
  if(Object.keys(CART).length===0){alert("Agrega al menos un producto.");return;}
  try{
    var doc=buildTicketPdf();
    var file=new File([doc.output("blob")],"pedido-"+Date.now()+".pdf",{type:"application/pdf"});
    if(navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))){
      await navigator.share({title:"Pedido - "+BIZ_NAME,text:orderText(),files:[file]});
      return;
    }
    downloadBlob(file,file.name);
    alert("Tu navegador no permite adjuntar el PDF automáticamente. Se descargó el archivo para que puedas adjuntarlo.");
  }catch(e){
    if(e && e.name==="AbortError") return;
    alert(e.message || "No fue posible compartir el PDF.");
  }
}

function emailOrder(){
  if(Object.keys(CART).length===0){alert("Agrega al menos un producto.");return;}
  var subject=encodeURIComponent("Pedido - "+BIZ_NAME);
  var body=encodeURIComponent(orderText()+"\n\nSi deseas adjuntar el PDF, usa el botón Compartir PDF en un móvil compatible.");
  window.location.href="mailto:ventascruzleal@gmail.com?subject="+subject+"&body="+body;
}

function sendOrder(){
  if(Object.keys(CART).length===0){alert("Agrega al menos un producto.");return;}
  var text=orderText();
  if(ORDER_WA){
    window.location.href="https://wa.me/"+ORDER_WA+"?text="+encodeURIComponent(text);
  }
}
function updateOrderBar(){
  var count=0,total=0;
  var names=Object.keys(CART);
  names.forEach(function(n){ count+=CART[n].qty; total+=CART[n].qty*priceNum(CART[n].price); });
  var cl=document.getElementById('cartList');
  cl.innerHTML = names.map(function(n){ return '<div class="cartRow"><span>'+CART[n].qty+'x '+esc2(n)+'</span><button class="rm" data-n="'+esc2(n).replace(/"/g,'&quot;')+'">×</button></div>'; }).join('');
  Array.prototype.forEach.call(cl.querySelectorAll('.rm'), function(b){ b.onclick=function(){ removeFromCart(b.dataset.n); }; });
  document.getElementById('orderSummary').textContent = count ? (count+(count===1?' producto · Total $':' productos · Total $')+total.toFixed(2)) : '';
  document.getElementById('orderBar').classList.toggle('on', count>0);
}
document.getElementById('menuSearch').addEventListener('input', function(e){ MENU_STATE.q=e.target.value.trim(); renderMenuGrid(); });
renderMenuPage();
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
function selectGame(g){
  document.getElementById('memoGame').style.display = g==='memo' ? 'block':'none';
  document.getElementById('puzzleGame').style.display = g==='puzzle' ? 'block':'none';
  var tabs=document.querySelectorAll('.gtab');
  Array.prototype.forEach.call(tabs, function(b){ b.classList.toggle('active', b.dataset.g===g); });
  if(g==='puzzle' && !pState) startPuzzle();
}
var pState=null;
function pNeighbors(i){
  var r=Math.floor(i/4), c=i%4, n=[];
  if(r>0) n.push(i-4); if(r<3) n.push(i+4); if(c>0) n.push(i-1); if(c<3) n.push(i+1);
  return n;
}
function startPuzzle(){
  var arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0], empty=15;
  for(var i=0;i<200;i++){
    var ns=pNeighbors(empty); var n=ns[Math.floor(Math.random()*ns.length)];
    var t=arr[empty]; arr[empty]=arr[n]; arr[n]=t; empty=n;
  }
  pState={arr:arr,moves:0};
  renderPuzzle();
}
function renderPuzzle(){
  var grid=document.getElementById('pGrid'); grid.innerHTML='';
  pState.arr.forEach(function(v,i){
    var d=document.createElement('div');
    d.className='pTile'+(v===0?' empty':'');
    d.textContent = v===0?'':v;
    d.onclick=function(){ tapTile(i); };
    grid.appendChild(d);
  });
  document.getElementById('pMoves').textContent='Movimientos: '+pState.moves;
  var solved = pState.arr.every(function(v,i){ return i===15? v===0 : v===i+1; });
  document.getElementById('pWin').textContent = solved ? '¡Resuelto! 🎉' : '';
}
function tapTile(i){
  var empty=pState.arr.indexOf(0);
  if(pNeighbors(empty).indexOf(i)>-1){
    var t=pState.arr[empty]; pState.arr[empty]=pState.arr[i]; pState.arr[i]=t;
    pState.moves++;
    renderPuzzle();
  }
}
