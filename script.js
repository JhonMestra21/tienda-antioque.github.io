function filtrar(categoria){
  let secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => {
    if(categoria === 'todos'){
      sec.style.display = 'block';
    } else {
      sec.style.display = sec.classList.contains(categoria) ? 'block' : 'none';
    }
  });
}

// Mostrar todos al inicio
filtrar('todos');

// Botón menú hamburguesa
const menuBtn = document.getElementById('menu-btn');
const menuNav = document.getElementById('menu-nav');

menuBtn.addEventListener('click', () => {
  menuNav.classList.toggle('show');
});

const menuButtons = menuNav.querySelectorAll('button');
menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    menuNav.classList.remove('show'); // Oculta el menú
  });
});

