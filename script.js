function filtrar(categoria, botonClickeado = null) {
  let secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => {
    if (categoria === 'todos') {
      sec.style.display = 'block';
    } else {
      sec.style.display = sec.classList.contains(categoria) ? 'block' : 'none';
    }
  });

  let botones = document.querySelectorAll('nav button');
  botones.forEach(btn => btn.classList.remove('activo'));

  if (botonClickeado) {
    botonClickeado.classList.add('activo');
  } else if (botones.length > 0) {
    botones[0].classList.add('activo');
  }
}

document.getElementById('buscador').addEventListener('input', function(e) {
  let texto = e.target.value.toLowerCase();
  let filas = document.querySelectorAll('.tabla-productos tbody tr');
  
  filas.forEach(fila => {
    let contenidoFila = fila.textContent.toLowerCase();
    fila.style.display = contenidoFila.includes(texto) ? '' : 'none';
  });
});

const menuBtn = document.getElementById('menu-btn');
const menuNav = document.getElementById('menu-nav');

menuBtn.addEventListener('click', () => {
  menuNav.classList.toggle('show');
});

const menuButtons = menuNav.querySelectorAll('button');
menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    menuNav.classList.remove('show');
  });
});

filtrar('todos');