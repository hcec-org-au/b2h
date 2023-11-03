let menuOpen = document.getElementById('menu-toggle-open');
let menuClose = document.getElementById('menu-toggle-close');
// let menuTop = document.getElementById('menu-top-close');
let offcanvasMenu = document.getElementById('offcanvas-menu');

menuOpen.addEventListener('click', toggleMenuOpen);
menuClose.addEventListener('click', toggleMenuClose);
// menuTop.addEventListener('click', toggleMenuClose);

function toggleMenuClose(e) {
    e.preventDefault();
    offcanvasMenu.classList.toggle('show');
    menuOpen.style.display = 'block';
    menuClose.style.display = 'none';
}

function toggleMenuOpen(e) {
    if(e) {
      e.preventDefault();
    }
    offcanvasMenu.classList.toggle('show');
    menuOpen.style.display = 'none';
    menuClose.style.display = 'block';
}
