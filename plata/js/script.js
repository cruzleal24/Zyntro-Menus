const MENU = {
  comida: { label:"Comidas", icon:"i-comida", items:[
    {n:"Hamburguesa Especial", d:"Carne Angus, queso y salsa de la casa", p:189, i:"burger", bg:"#3a2217", top:true},
    {n:"Hamburguesa Clásica", d:"Carne, lechuga, jitomate y queso", p:149, i:"burger", bg:"#4a2c1c"},
    {n:"Tacos al pastor (3)", d:"Piña, cilantro y cebolla en tortilla de maíz", p:95, i:"taco", bg:"#2f3b1e"},
    {n:"Pizza Margarita", d:"Mozzarella fresca, albahaca y salsa de tomate", p:165, i:"pizza", bg:"#4d2a1a", top:true},
    {n:"Papas a la francesa", d:"Crujientes, con sal de mar y aderezo", p:59, i:"fries", bg:"#4a3a14"}
  ]},
  bebida: { label:"Bebidas", icon:"i-bebida", items:[
    {n:"Refresco de cola", d:"355 ml, bien frío", p:35, i:"soda", bg:"#3a1a1a"},
    {n:"Jugo de naranja", d:"Natural, recién exprimido", p:55, i:"juice", bg:"#4a2e12", top:true},
    {n:"Café americano", d:"Grano de la región, 12 oz", p:45, i:"coffee", bg:"#2d1f17"},
    {n:"Limonada mineral", d:"Con hielo y hierbabuena", p:50, i:"juice", bg:"#27381f"}
  ]},
  postre: { label:"Postres", icon:"i-postre", items:[
    {n:"Pastel de chocolate", d:"Tres capas con ganache oscuro", p:79, i:"cake", bg:"#3b2020", top:true},
    {n:"Helado artesanal", d:"Dos bolas a elegir: vainilla, fresa o chocolate", p:65, i:"icecream", bg:"#3a2433"},
    {n:"Flan napolitano", d:"Receta casera con caramelo", p:55, i:"flan", bg:"#473618"}
  ]}
};

const $ = s => document.querySelector(s);
const money = n => "$" + n.toFixed(2);
let cat = "comida", pedido = {};

const tabs = $("#tabs");
for (const k in MENU) {
  const b = document.createElement("button");
  b.className = "tab"; b.setAttribute("role","tab"); b.dataset.k = k;
  b.innerHTML = `<svg viewBox="0 0 100 100"><use href="#${MENU[k].icon}" style="color:currentColor"/></svg>${MENU[k].label}`;
  b.onclick = () => { cat = k; $("#q").value = ""; render(); };
  tabs.append(b);
}

function render() {
  const q = $("#q").value.trim().toLowerCase();
  tabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.k === cat));
  // Con búsqueda se revisan todas las categorías
  const lista = q
    ? Object.values(MENU).flatMap(c => c.items).filter(x => (x.n + " " + x.d).toLowerCase().includes(q))
    : MENU[cat].items;
  $("#grid").innerHTML = lista.length ? lista.map(x => `
    <article class="card">
      <div class="thumb" style="background:${x.bg}"><svg viewBox="0 0 100 100"><use href="#${x.i}"/></svg></div>
      <div class="info">
        ${x.top ? '<span class="badge">★ Destacado</span>' : ''}
        <h3>${x.n}</h3><p>${x.d}</p>
        <div class="row"><span class="price">${money(x.p)}</span>
        <button class="add" data-n="${x.n}" data-p="${x.p}">Agregar</button></div>
      </div>
    </article>`).join("") : '<p class="empty">No encontramos platillos con ese nombre.</p>';
}

$("#q").oninput = render;
$("#grid").onclick = e => {
  const b = e.target.closest(".add"); if (!b) return;
  pedido[b.dataset.n] = (pedido[b.dataset.n] || 0) + 1;
  b.textContent = "Agregado ✓"; setTimeout(() => b.textContent = "Agregar", 900);
  barra();
};
$("#vaciar").onclick = () => { pedido = {}; barra(); };

function barra() {
  const todos = Object.values(MENU).flatMap(c => c.items);
  let cant = 0, total = 0;
  for (const n in pedido) { cant += pedido[n]; total += pedido[n] * todos.find(x => x.n === n).p; }
  $("#resumen").textContent = `${cant} ${cant === 1 ? "producto" : "productos"} · Total ${money(total)}`;
  $("#bar").classList.toggle("on", cant > 0);
}
render();
