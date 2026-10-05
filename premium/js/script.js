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

// ===== MENÚ DE RESTAURANTE =====
const RESTAURANT_MENU = {
  comida:{label:"Comidas",icon:"i-comida",items:[
    {n:"Hamburguesa Especial",d:"Carne Angus, queso y salsa de la casa",p:189,i:"burger",bg:"#3a2217",top:true},
    {n:"Hamburguesa Clásica",d:"Carne, lechuga, jitomate y queso",p:149,i:"burger",bg:"#4a2c1c"},
    {n:"Tacos al pastor (3)",d:"Piña, cilantro y cebolla en tortilla de maíz",p:95,i:"taco",bg:"#2f3b1e"},
    {n:"Pizza Margarita",d:"Mozzarella fresca, albahaca y salsa de tomate",p:165,i:"pizza",bg:"#4d2a1a",top:true},
    {n:"Papas a la francesa",d:"Crujientes, con sal de mar y aderezo",p:59,i:"fries",bg:"#4a3a14"}
  ]},
  bebida:{label:"Bebidas",icon:"i-bebida",items:[
    {n:"Refresco de cola",d:"355 ml, bien frío",p:35,i:"soda",bg:"#3a1a1a"},
    {n:"Jugo de naranja",d:"Natural, recién exprimido",p:55,i:"juice",bg:"#4a2e12",top:true},
    {n:"Café americano",d:"Grano de la región, 12 oz",p:45,i:"coffee",bg:"#2d1f17"},
    {n:"Limonada mineral",d:"Con hielo y hierbabuena",p:50,i:"juice",bg:"#27381f"}
  ]},
  postre:{label:"Postres",icon:"i-postre",items:[
    {n:"Pastel de chocolate",d:"Tres capas con ganache oscuro",p:79,i:"cake",bg:"#3b2020",top:true},
    {n:"Helado artesanal",d:"Dos bolas a elegir: vainilla, fresa o chocolate",p:65,i:"icecream",bg:"#3a2433"},
    {n:"Flan napolitano",d:"Receta casera con caramelo",p:55,i:"flan",bg:"#473618"}
  ]}
};

let menuCategory="comida";
let menuOrder={};

function money(n){return "$"+n.toFixed(2);}

function initRestaurantMenu(){
  const tabs=document.getElementById("menuTabs");
  if(!tabs || tabs.dataset.ready==="1") return;
  tabs.dataset.ready="1";

  Object.keys(RESTAURANT_MENU).forEach(function(k){
    const b=document.createElement("button");
    b.className="restaurantTab";
    b.setAttribute("role","tab");
    b.dataset.k=k;
    b.innerHTML='<svg viewBox="0 0 100 100"><use href="#'+RESTAURANT_MENU[k].icon+'"></use></svg>'+RESTAURANT_MENU[k].label;
    b.onclick=function(){
      menuCategory=k;
      document.getElementById("menuSearch").value="";
      renderRestaurantMenu();
    };
    tabs.appendChild(b);
  });

  document.getElementById("menuSearch").addEventListener("input",renderRestaurantMenu);
  document.getElementById("menuGrid").addEventListener("click",function(e){
    const b=e.target.closest(".foodAdd");
    if(!b)return;
    menuOrder[b.dataset.n]=(menuOrder[b.dataset.n]||0)+1;
    b.textContent="Agregado ✓";
    setTimeout(function(){b.textContent="Agregar";},900);
    updateOrderBar();
  });
  document.getElementById("clearOrder").onclick=function(){menuOrder={};updateOrderBar();};
  renderRestaurantMenu();
}

function renderRestaurantMenu(){
  const search=document.getElementById("menuSearch");
  if(!search)return;
  const q=search.value.trim().toLowerCase();
  document.querySelectorAll(".restaurantTab").forEach(function(t){
    t.setAttribute("aria-selected",t.dataset.k===menuCategory);
  });
  const list=q
    ? Object.values(RESTAURANT_MENU).flatMap(function(c){return c.items;}).filter(function(x){
        return (x.n+" "+x.d).toLowerCase().includes(q);
      })
    : RESTAURANT_MENU[menuCategory].items;

  document.getElementById("menuGrid").innerHTML=list.length?list.map(function(x){
    return '<article class="foodCard">'+
      '<div class="foodThumb" style="background:'+x.bg+'"><svg viewBox="0 0 100 100"><use href="#'+x.i+'"></use></svg></div>'+
      '<div class="foodInfo">'+
      (x.top?'<span class="foodBadge">★ Destacado</span>':'')+
      '<h3>'+x.n+'</h3><p>'+x.d+'</p>'+
      '<div class="foodRow"><span class="foodPrice">'+money(x.p)+'</span>'+
      '<button class="foodAdd" data-n="'+x.n+'">Agregar</button></div></div></article>';
  }).join(""):'<p class="menuEmpty">No encontramos platillos con ese nombre.</p>';
}

function updateOrderBar(){
  const all=Object.values(RESTAURANT_MENU).flatMap(function(c){return c.items;});
  let qty=0,total=0;
  Object.keys(menuOrder).forEach(function(n){
    const item=all.find(function(x){return x.n===n;});
    qty+=menuOrder[n];
    if(item)total+=menuOrder[n]*item.p;
  });
  document.getElementById("orderSummary").textContent=qty+" "+(qty===1?"producto":"productos")+" · Total "+money(total);
  document.getElementById("orderBar").classList.toggle("on",qty>0);
}

document.addEventListener("DOMContentLoaded",initRestaurantMenu);

