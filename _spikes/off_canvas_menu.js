var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(mymap);

let menuOpen = document.getElementById('menu-toggle-open');
let menuClose = document.getElementById('menu-toggle-close');
let menuTop = document.getElementById('menu-top-close');
let offcanvasMenu = document.getElementById('offcanvas-menu');

menuOpen.addEventListener('click', toggleMenuOpen);
menuClose.addEventListener('click', toggleMenuClose);
menuTop.addEventListener('click', toggleMenuClose);

function toggleMenuClose(e) {
    e.preventDefault();
    offcanvasMenu.classList.toggle('show');
    menuOpen.style.display = 'block';
    menuClose.style.display = 'none';
}

function toggleMenuOpen(e) {
    e.preventDefault();
    offcanvasMenu.classList.toggle('show');
    menuOpen.style.display = 'none';
    menuClose.style.display = 'block';
}
