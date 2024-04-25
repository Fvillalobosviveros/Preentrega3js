// Productos disponibles en el e-commerce.
const productos = [
    { id: 1, foto: "https://media.spdigital.cl/thumbnails/products/9ro9phkb_24bc86fd_thumbnail_512.png", nombre: "Tarjeta de Video Zotac Nvidia", precio: 354.999 },

    { id: 2, foto: "https://media.spdigital.cl/thumbnails/products/ls1e_ja0_b8fb16f0_thumbnail_512.jpg", nombre: 
    "Mouse Logitech G Pro X ", precio: 89.999 },

    { id: 3, foto: "https://media.spdigital.cl/thumbnails/products/9w6nk0d8_f299489e_thumbnail_512.png", nombre: 
    "Unidad SSD XPG GAMMIX S70", precio: 81.990 },

    { id: 4, foto: "https://media.spdigital.cl/thumbnails/products/yw24xddb_5b4aa387_thumbnail_512.png", nombre: "Monitor Gamer Curvo Titan ", precio: 149.999 },

    { id: 5, foto: "https://media.spdigital.cl/thumbnails/products/jbbn8y73_4f2da3b3_thumbnail_512.png", nombre: "Audífonos Gamer HyperX Cloud", precio: 39.999 },

    { id: 6, foto: "https://media.spdigital.cl/thumbnails/products/9r9lsn9v_d64b6dd1_thumbnail_512.jpg", nombre: "Monitor Gamer LG UltraGear", precio: 240000 },

    { id: 7, foto: "https://media.spdigital.cl/thumbnails/products/ejtiw4l__06156171_thumbnail_512.jpg", nombre: "Disipador de Procesador", precio: 28.899 },

    { id: 8, foto: "https://media.spdigital.cl/thumbnails/products/mv0bgp9w_66699927_thumbnail_512.png", nombre: "Teclado Gamer Steelseries ", precio: 115.999 },

    { id: 9, foto: "https://media.spdigital.cl/thumbnails/products/8r7kh6dr_52912411_thumbnail_512.jpg", nombre: "Tarjeta de Video MSI Nvidia", precio: 349.999 },

    { id: 10, foto: "https://media.spdigital.cl/thumbnails/products/48xf3l6x_1ad37798_thumbnail_512.jpg", nombre: "Purificador de Aire TruSens", precio: 453.999 },

    { id: 11, foto: "https://media.spdigital.cl/thumbnails/products/92fxym75_478b0949_thumbnail_512.jpg", nombre: "Asistente Virtual Apple Homepod", precio: 53000 },

    { id: 12, foto: "https://media.spdigital.cl/thumbnails/products/7vyj_0f4_24da7c54_thumbnail_512.jpg", nombre: "Notebook ASUS ExpertBook B1", precio: 11200 },

    { id: 13, foto: "https://media.spdigital.cl/thumbnails/products/6nvxuchc_28feb3f5_thumbnail_512.png", nombre: "Volante Racing Universal", precio: 682.999 },
    
    { id: 14, foto: "https://media.spdigital.cl/thumbnails/products/a_buouco_08155769_thumbnail_512.png", nombre: 
    "Kit de Videoconferencia Logitech", precio: 999.999 },

    { id: 15, foto: "https://media.spdigital.cl/thumbnails/products/udt3fqxu_27f2e082_thumbnail_512.jpg", nombre: 
    "Placa Madre MSI A520M-A", precio:  61.999 }
];

// Carrito de compras, almacenando los productos que el usuario añade.
let carrito = [];

// Evento que se dispara al cargar completamente el DOM.
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos(productos); // Cargar y mostrar productos.
    cargarCarritoDesdeStorage(); // Cargar el carrito desde LocalStorage al iniciar.
});

// Función para mostrar los productos en la página.
function renderizarProductos(listaProds) {
    const contenedorProds = document.getElementById('misprods');
    contenedorProds.innerHTML = ''; // Limpia el contenedor antes de agregar contenido.
    listaProds.forEach(prod => {
        const htmlProd = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${prod.foto}" class="card-img-top" alt="${prod.nombre}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${prod.nombre}</h5>
                        <p class="card-text">$${prod.precio}</p>
                        <button class="btn btn-primary" onclick="agregarACarrito(${prod.id})">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
        contenedorProds.innerHTML += htmlProd; // Añade cada producto al contenedor.
    });
}

// Función para añadir un producto al carrito de compras.
function agregarACarrito(idProd) {
    const producto = productos.find(p => p.id === idProd); // Busca el producto por ID.
    carrito.push(producto); // Añade el producto al array del carrito.
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en LocalStorage.
    actualizarCarrito(); // Actualiza la visualización del carrito.
}

// Función para actualizar la visualización del carrito en la página.
function actualizarCarrito() {
    const tablaBody = document.getElementById('tablabody');
    tablaBody.innerHTML = ''; // Limpia el contenido actual del cuerpo de la tabla.
    carrito.forEach(prod => {
        tablaBody.innerHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>$${prod.precio}</td>
            </tr>
        `;
    });
    calcularTotal(); // Calcula y muestra el total del carrito.
}

// Función para calcular el total del carrito de compras.
function calcularTotal() {
    const total = carrito.reduce((sum, prod) => sum + prod.precio, 0); // Suma los precios de todos los productos en el carrito.
    document.getElementById('total').textContent = `$${total}`; // Muestra el total en la página.
}

// Función para cargar el carrito desde LocalStorage al cargar la página.
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); // Convierte el string guardado en un array.
        actualizarCarrito(); // Actualiza la visualización del carrito.
    }
}

// Evento para el botón de vaciar el carrito.
document.getElementById('vaciarBtn').addEventListener('click', () => {
    carrito = []; // Vacía el array del carrito.
    localStorage.removeItem('carrito'); // Elimina el carrito de LocalStorage.
    actualizarCarrito(); // Actualiza la visualización del carrito.
    document.getElementById('total').textContent = '$0'; // Restablece el total mostrado.
});

// Evento para el botón de finalizar compra.
document.getElementById('finalizarBtn').addEventListener('click', finalizarCompra);

// Función para gestionar la finalización de la compra.
function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({  // Muestra una alerta si el carrito está vacío.
            icon: 'error',
            title: 'Oops...',
            text: 'Tu carrito está vacío!',
            confirmButtonText: 'Entendido'
        });
        return;
    }
    Swal.fire({
        title: '¿Estás listo para finalizar la compra?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar compra!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Completado!',
                'Tu compra ha sido finalizada.',
                'success'
            );
            vaciarCarrito();
        }
    });
}

// Función para vaciar completamente el carrito.
function vaciarCarrito() {
    carrito = []; // Vacía el array del carrito.
    localStorage.removeItem('carrito'); // Elimina el carrito de LocalStorage.
    actualizarCarrito(); // Actualiza la visualización del carrito.
    document.getElementById('total').textContent = '$0'; // Restablece el total mostrado.
}
