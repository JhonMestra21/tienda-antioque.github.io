/* ================== BASE DE PRODUCTOS Y CATALOGO ================== */
const CATALOGO_PRODUCTOS = [
  { nombre: "Limón", precio: 7000 },
  { nombre: "Maracuyá", precio: 7000 },
  { nombre: "Leche asada", precio: 7000 },
  { nombre: "Arroz con leche", precio: 7000 },
  { nombre: "Leche Klim", precio: 7000 },
  { nombre: "Agua 350ml", precio: 2000 },
  { nombre: "Avena", precio: 2500 },
  { nombre: "Granizados de tamarindo y bon bon bum", precio: 12000 },
  { nombre: "Tinto", precio: 2000 },
  { nombre: "Aromática", precio: 2000 },
  { nombre: "Café + Instacrem", precio: 2500 },
  { nombre: "Crispetas", precio: 3000 },
  { nombre: "Aritos de Limón", precio: 3000 },
  { nombre: "Churros de arequipe", precio: 2500 },
  { nombre: "Buñuelos", precio: 2000 },
  { nombre: "Palito Hojaldrado de Queso", precio: 3500 },
  { nombre: "Pastel Hawaiano", precio: 4500 },
  { nombre: "Pastel de Jamón y Queso", precio: 4500 },
  { nombre: "Pastel de Arequipe", precio: 3500 },
  { nombre: "Pastel de Guayaba", precio: 3500 },
  { nombre: "Pastel de Pollo Frito", precio: 3500 },
  { nombre: "Oka Loka", precio: 4000 },
  { nombre: "Barrilete con nanos", precio: 600 },
  { nombre: "Fini Roller", precio: 2500 },
  { nombre: "Bombón Barrilete", precio: 800 },
  { nombre: "Bon Bon Bum fresa y surtido", precio: 800 },
  { nombre: "Quipitos", precio: 1000 },
  { nombre: "Trululu Fresasitas", precio: 3500 },
  { nombre: "Trululu Oro", precio: 3500 },
  { nombre: "Trululu con Nanos", precio: 3500 },
  { nombre: "Candy Ring", precio: 3000 },
  { nombre: "Mara Mango", precio: 1000 },
  { nombre: "Barrilete Revolcón", precio: 600 },
  { nombre: "Choco Disk", precio: 2000 },
  { nombre: "Trolli Gusanos", precio: 3500 },
  { nombre: "Chocolatina Nikolo", precio: 2500 },
  { nombre: "Candyranch Mango Biggie", precio: 2000 },
  { nombre: "Mara Sandía", precio: 1000 },
  { nombre: "Trulli Moriscos", precio: 3500 },
  { nombre: "Gomitas Toy Story", precio: 3500 },
  { nombre: "Chocolatina Muu", precio: 1500 },
  { nombre: "Revolución Chique", precio: 500 },
  { nombre: "Cazuela de Frijoles con Guandolo", precio: 22000 },
  { nombre: "Perro Vegano", precio: 10000 },
  { nombre: "Perro Tradicional", precio: 14000 },
  { nombre: "Choriperro", precio: 16000 },
  { nombre: "Hamburguesa Vegana y Tradicional", precio: 18000 },
  { nombre: "Pincho de Chorizo de Ternera con Arepa", precio: 10000 },
  { nombre: "Salchipapa Mediana con Gaseosa", precio: 14000 },
  { nombre: "Salchipapa Grande con Gaseosa", precio: 20000 },
  { nombre: "Granizados de Café y Coco", precio: 12000 },
  { nombre: "Fiambre Antioqueño", precio: 22000 },
  { nombre: "Tamal", precio: 18000 },
  { nombre: "Cola y Pola", precio: 5000 },
  { nombre: "Patacón", precio: 16000 },
  { nombre: "Arepa", precio: 16000 },
  { nombre: "Sancocho Trifásico", precio: 25000 },
  { nombre: "Soda Saborizada", precio: 10000 },
  { nombre: "Inflables", precio: 6000 },
  { nombre: "Pintacaritas", precio: 6000 },
  { nombre: "Estación de Pinturas", precio: 6000 }
];

let listaCalculadora = [];

/* ================== FUNCIONALIDAD DE FILTRADO (CONSERVADA Y AMPLIADA) ================== */
function filtrar(categoria, botonClickeado = null) {
  const secciones = document.querySelectorAll('.seccion');
  
  secciones.forEach(sec => {
    if (categoria === 'todos') {
      sec.style.display = 'block';
    } else {
      sec.style.display = sec.classList.contains(categoria) ? 'block' : 'none';
    }
  });

  const botones = document.querySelectorAll('nav button');
  botones.forEach(btn => btn.classList.remove('activo'));

  if (botonClickeado) {
    botonClickeado.classList.add('activo');
  } else if (botones.length > 0) {
    const btnActivo = Array.from(botones).find(b => b.getAttribute('onclick').includes(categoria));
    if (btnActivo) btnActivo.classList.add('activo');
  }
}

/* ================== BUSCADOR MEJORADO (TABLAS + TARJETAS DE PRODUCTO) ================== */
document.getElementById('buscador').addEventListener('input', function(e) {
  const texto = e.target.value.toLowerCase().trim();
  
  // Filtrar en tablas (> 3 productos)
  const filas = document.querySelectorAll('.tabla-productos tbody tr:not(.fila-vacia)');
  filas.forEach(fila => {
    const contenidoFila = fila.textContent.toLowerCase();
    fila.style.display = contenidoFila.includes(texto) ? '' : 'none';
  });

  // Filtrar en tarjetas de producto (<= 3 productos)
  const tarjetasProducto = document.querySelectorAll('.tarjeta-producto.item-searchable');
  tarjetasProducto.forEach(tarjeta => {
    const contenidoTarjeta = tarjeta.textContent.toLowerCase();
    tarjeta.style.display = contenidoTarjeta.includes(texto) ? '' : 'none';
  });
});

/* ================== NAVEGACIÓN MÓVIL (MENÚ HAMBURGUESA) ================== */
const menuBtn = document.getElementById('menu-btn');
const menuNav = document.getElementById('menu-nav');

if (menuBtn && menuNav) {
  menuBtn.addEventListener('click', () => {
    const expandido = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expandido);
    menuNav.classList.toggle('show');
  });

  const menuButtons = menuNav.querySelectorAll('button');
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      menuNav.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ================== CALCULADORA DE FICHOS ================== */
function formatearMoneda(valor) {
  return "$" + valor.toLocaleString('es-CO');
}

function inicializarCalculadora() {
  const selectProducto = document.getElementById('select-producto');
  if (!selectProducto) return;

  CATALOGO_PRODUCTOS.forEach((item, index) => {
    const opcion = document.createElement('option');
    opcion.value = index;
    opcion.textContent = `${item.nombre} - ${formatearMoneda(item.precio)}`;
    selectProducto.appendChild(opcion);
  });

  const btnAgregar = document.getElementById('btn-agregar-calculadora');
  const inputCantidad = document.getElementById('input-cantidad');

  btnAgregar.addEventListener('click', () => {
    const indiceSeleccionado = selectProducto.value;
    const cantidad = parseInt(inputCantidad.value, 10);

    if (indiceSeleccionado === "" || isNaN(cantidad) || cantidad < 1) {
      alert("Por favor selecciona un producto y una cantidad válida.");
      return;
    }

    const producto = CATALOGO_PRODUCTOS[indiceSeleccionado];
    const itemExistente = listaCalculadora.find(item => item.nombre === producto.nombre);

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      listaCalculadora.push({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad
      });
    }

    inputCantidad.value = 1;
    selectProducto.selectedIndex = 0;
    actualizarTablaCalculadora();
  });
}

function actualizarTablaCalculadora() {
  const tbody = document.getElementById('tbody-calculadora');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (listaCalculadora.length === 0) {
    tbody.innerHTML = `
      <tr class="fila-vacia">
        <td colspan="5">Aún no has agregado productos a tu cálculo.</td>
      </tr>
    `;
    actualizarTotales();
    return;
  }

  listaCalculadora.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td class="precio">${formatearMoneda(item.precio)}</td>
      <td class="col-precio">
        <input type="number" min="1" value="${item.cantidad}" class="input-tabla-cant" data-index="${index}" aria-label="Cantidad para ${item.nombre}">
      </td>
      <td class="precio">${formatearMoneda(subtotal)}</td>
      <td>
        <button class="btn-eliminar" data-index="${index}" aria-label="Eliminar ${item.nombre}">Eliminar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });

  const inputsCantidad = tbody.querySelectorAll('.input-tabla-cant');
  inputsCantidad.forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      const nuevaCantidad = parseInt(e.target.value, 10);
      if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
        listaCalculadora[idx].cantidad = nuevaCantidad;
        actualizarTotales();
        const subtotalCelda = e.target.closest('tr').querySelectorAll('td')[3];
        subtotalCelda.textContent = formatearMoneda(listaCalculadora[idx].precio * listaCalculadora[idx].cantidad);
      }
    });
  });

  const botonesEliminar = tbody.querySelectorAll('.btn-eliminar');
  botonesEliminar.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      listaCalculadora.splice(idx, 1);
      actualizarTablaCalculadora();
    });
  });

  actualizarTotales();
}

function actualizarTotales() {
  const totalCantidadElem = document.getElementById('total-cantidad-items');
  const totalValorElem = document.getElementById('total-valor-estimado');
  const totalFichosElem = document.getElementById('total-fichos-estimados');

  if (!totalCantidadElem || !totalValorElem || !totalFichosElem) return;

  const totalCantidad = listaCalculadora.reduce((sum, item) => sum + item.cantidad, 0);
  const totalValor = listaCalculadora.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const fichosEstimados = Math.ceil(totalValor / 1000);

  totalCantidadElem.textContent = totalCantidad;
  totalValorElem.textContent = formatearMoneda(totalValor);
  totalFichosElem.textContent = `${fichosEstimados.toLocaleString('es-CO')} fichos`;
}

/* ================== INICIALIZACIÓN GENERAL ================== */
document.addEventListener('DOMContentLoaded', () => {
  inicializarCalculadora();
  filtrar('todos');
});