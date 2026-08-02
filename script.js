/* ================== BASE DE PRODUCTOS Y CATÁLOGO ================== */
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
let resultadosBusqueda = [];
let indiceResultadoActual = -1;
let timeoutToast = null;

/* ================== UTILIDADES Y FORMATEO ================== */
function formatearMoneda(valor) {
  return "$" + valor.toLocaleString('es-CO');
}

/* ================== FUNCIONALIDAD DE FILTRADO ================== */
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
    const btnActivo = Array.from(botones).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(categoria));
    if (btnActivo) btnActivo.classList.add('activo');
  }
}

/* ================== BUSCADOR INTELIGENTE ================== */
function inicializarBuscadorInteligente() {
  const inputBuscador = document.getElementById('buscador');
  const contadorElem = document.getElementById('contador-busqueda');
  if (!inputBuscador) return;

  function limpiarResaltados() {
    document.querySelectorAll('.item-searchable').forEach(elem => {
      elem.classList.remove('resaltado-temporal', 'resaltado-activo');
    });
    resultadosBusqueda = [];
    indiceResultadoActual = -1;
    if (contadorElem) {
      contadorElem.classList.add('oculto');
      contadorElem.textContent = "0/0";
    }
  }

  function resaltarCoincidenciaActiva() {
    document.querySelectorAll('.resaltado-activo').forEach(el => el.classList.remove('resaltado-activo'));
    if (resultadosBusqueda.length > 0 && indiceResultadoActual >= 0) {
      const actual = resultadosBusqueda[indiceResultadoActual];
      actual.classList.add('resaltado-activo');
      actual.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (contadorElem) {
        contadorElem.classList.remove('oculto');
        contadorElem.textContent = `${indiceResultadoActual + 1}/${resultadosBusqueda.length}`;
      }
    }
  }

  inputBuscador.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    limpiarResaltados();

    if (!query) return;

    const elementos = document.querySelectorAll('.item-searchable');
    elementos.forEach(elem => {
      const textoInterno = elem.textContent.toLowerCase();
      const region = (elem.getAttribute('data-region') || '').toLowerCase();
      const categoria = (elem.getAttribute('data-categoria') || '').toLowerCase();

      if (textoInterno.includes(query) || region.includes(query) || categoria.includes(query)) {
        elem.classList.add('resaltado-temporal');
        resultadosBusqueda.push(elem);
      }
    });

    if (resultadosBusqueda.length > 0) {
      indiceResultadoActual = 0;
      resaltarCoincidenciaActiva();
    }
  });

  inputBuscador.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && resultadosBusqueda.length > 0) {
      e.preventDefault();
      indiceResultadoActual = (indiceResultadoActual + 1) % resultadosBusqueda.length;
      resaltarCoincidenciaActiva();
    } else if (e.key === 'Escape') {
      inputBuscador.value = '';
      limpiarResaltados();
      inputBuscador.blur();
    }
  });
}

/* ================== NAVEGACIÓN DESPLEGABLE (MENÚ HAMBURGUESA GENERAL) ================== */
function inicializarMenuHamburguesa() {
  const menuBtn = document.getElementById('menu-btn');
  const menuNav = document.getElementById('menu-nav');

  if (!menuBtn || !menuNav) return;

  function cerrarMenu() {
    menuNav.classList.remove('show');
    menuBtn.classList.remove('activo');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function abrirMenu() {
    menuNav.classList.add('show');
    menuBtn.classList.add('activo');
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const expandido = menuBtn.getAttribute('aria-expanded') === 'true';
    if (expandido) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  menuNav.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      cerrarMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuNav.contains(e.target) && !menuBtn.contains(e.target) && menuNav.classList.contains('show')) {
      cerrarMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuNav.classList.contains('show')) {
      cerrarMenu();
    }
  });
}

/* ================== CALCULADORA Y MODAL FLOTANTE ================== */
function inicializarModalCalculadora() {
  const btnFlotante = document.getElementById('btn-flotante-calculadora');
  const panel = document.getElementById('panel-calculadora');
  const backdrop = document.getElementById('backdrop-calculadora');
  const btnCerrar = document.getElementById('btn-cerrar-calculadora');

  if (!btnFlotante || !panel || !backdrop || !btnCerrar) return;

  function alternarModal(abrir) {
    if (abrir) {
      panel.classList.add('abierto');
      backdrop.classList.add('visible');
      panel.setAttribute('aria-hidden', 'false');
      backdrop.setAttribute('aria-hidden', 'false');
    } else {
      panel.classList.remove('abierto');
      backdrop.classList.remove('visible');
      panel.setAttribute('aria-hidden', 'true');
      backdrop.setAttribute('aria-hidden', 'true');
    }
  }

  btnFlotante.addEventListener('click', () => {
    const estaAbierto = panel.classList.contains('abierto');
    alternarModal(!estaAbierto);
  });

  btnCerrar.addEventListener('click', () => alternarModal(false));
  backdrop.addEventListener('click', () => alternarModal(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('abierto')) {
      alternarModal(false);
    }
  });
}

function mostrarFeedbackAgregado(nombreProducto) {
  const toast = document.getElementById('toast-notificacion');
  const msg = document.getElementById('toast-mensaje');
  const btnFlotante = document.getElementById('btn-flotante-calculadora');

  if (btnFlotante) {
    btnFlotante.classList.remove('animacion-pulso');
    void btnFlotante.offsetWidth;
    btnFlotante.classList.add('animacion-pulso');
  }

  if (toast && msg) {
    msg.textContent = `${nombreProducto} agregado a la calculadora`;
    toast.classList.remove('oculto');

    if (timeoutToast) clearTimeout(timeoutToast);
    timeoutToast = setTimeout(() => {
      toast.classList.add('oculto');
    }, 2500);
  }
}

function agregarAlCalculo(nombre, precio, cantidad = 1) {
  const itemExistente = listaCalculadora.find(item => item.nombre === nombre);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    listaCalculadora.push({
      nombre: nombre,
      precio: Number(precio),
      cantidad: Number(cantidad)
    });
  }

  actualizarTablaCalculadora();
  mostrarFeedbackAgregado(nombre);
}

function inicializarSelectorCalculadora() {
  const selectProducto = document.getElementById('select-producto');
  if (!selectProducto) return;

  selectProducto.innerHTML = '<option value="" disabled selected>-- Elige un producto --</option>';

  CATALOGO_PRODUCTOS.forEach((item, index) => {
    const opcion = document.createElement('option');
    opcion.value = index;
    opcion.textContent = `${item.nombre} - ${formatearMoneda(item.precio)}`;
    selectProducto.appendChild(opcion);
  });

  const btnAgregar = document.getElementById('btn-agregar-calculadora');
  const inputCantidad = document.getElementById('input-cantidad');

  if (btnAgregar && inputCantidad) {
    btnAgregar.addEventListener('click', () => {
      const indiceSeleccionado = selectProducto.value;
      const cantidad = parseInt(inputCantidad.value, 10);

      if (indiceSeleccionado === "" || isNaN(cantidad) || cantidad < 1) {
        alert("Por favor selecciona un producto y una cantidad válida.");
        return;
      }

      const producto = CATALOGO_PRODUCTOS[indiceSeleccionado];
      agregarAlCalculo(producto.nombre, producto.precio, cantidad);

      inputCantidad.value = 1;
      selectProducto.selectedIndex = 0;
    });
  }
}

function inicializarBotonesAgregarRapido() {
  document.addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-agregar-rapido');
    if (boton) {
      const nombre = boton.getAttribute('data-nombre');
      const precio = boton.getAttribute('data-precio');
      if (nombre && precio) {
        agregarAlCalculo(nombre, precio, 1);
      }
    }
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
        if (subtotalCelda) {
          subtotalCelda.textContent = formatearMoneda(listaCalculadora[idx].precio * listaCalculadora[idx].cantidad);
        }
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
  const badgeFichos = document.getElementById('badge-fichos');

  const totalCantidad = listaCalculadora.reduce((sum, item) => sum + item.cantidad, 0);
  const totalValor = listaCalculadora.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const fichosEstimados = Math.ceil(totalValor / 1000);

  if (totalCantidadElem) totalCantidadElem.textContent = totalCantidad;
  if (totalValorElem) totalValorElem.textContent = formatearMoneda(totalValor);
  if (totalFichosElem) totalFichosElem.textContent = `${fichosEstimados.toLocaleString('es-CO')} fichos`;

  if (badgeFichos) {
    if (fichosEstimados > 0) {
      badgeFichos.textContent = fichosEstimados;
      badgeFichos.classList.remove('oculto');
    } else {
      badgeFichos.classList.add('oculto');
    }
  }
}

/* ================== INICIALIZACIÓN GENERAL ================== */
document.addEventListener('DOMContentLoaded', () => {
  inicializarMenuHamburguesa();
  inicializarBuscadorInteligente();
  inicializarModalCalculadora();
  inicializarSelectorCalculadora();
  inicializarBotonesAgregarRapido();
  filtrar('todos');
});