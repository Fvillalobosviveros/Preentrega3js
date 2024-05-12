let productos = []; // Variable global para los productos cargados desde JSON

let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Inicializa el carrito desde LocalStorage o como un array vacío.

 

document.addEventListener('DOMContentLoaded', () => {

    cargarProductos(); // Carga productos desde un JSON local al iniciar.

    cargarCarritoDesdeStorage(); // Carga el carrito desde LocalStorage al iniciar.

});

 

function cargarProductos() {

    fetch('productos.json')

    .then(response => response.json())

    .then(data => {

        productos = data;

        renderizarProductos(productos);

    })

    .catch(error => console.error('Error al cargar los productos:', error));

}

 

function renderizarProductos(listaProds) {

    const contenedorProds = document.getElementById('misprods');

    contenedorProds.innerHTML = '';

    listaProds.forEach(prod => {

        const htmlProd = `

            <div class="col-md-4 mb-4">

                <div class="card">

                    <img src="${prod.foto}" class="card-img-top" alt="${prod.nombre}">

                    <div class="card-body">

                        <h5 class="card-title">${prod.nombre}</h5>

                        <p class="card-text">${formatearPrecio(prod.precio)}</p>

                        <button class="btn btn-primary" onclick="agregarACarrito(${prod.id})">Agregar al Carrito</button>

                    </div>

                </div>

            </div>

        `;

        contenedorProds.innerHTML += htmlProd;

    });

}

 

function formatearPrecio(precio) {

    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(precio);

}

 

function agregarACarrito(idProd) {

    const producto = productos.find(p => p.id === idProd);

    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarCarrito();

}

 

function actualizarCarrito() {

    const tablaBody = document.getElementById('tablabody');

    tablaBody.innerHTML = '';

    carrito.forEach(prod => {

        tablaBody.innerHTML += `

            <tr>

                <td>${prod.id}</td>

                <td>${prod.nombre}</td>

                <td>${formatearPrecio(prod.precio)}</td>

            </tr>

        `;

    });

    calcularTotal();

}

 

function calcularTotal() {

    const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);

    document.getElementById('total').textContent = formatearPrecio(total);

}

 

function cargarCarritoDesdeStorage() {

    if (localStorage.getItem('carrito')) {

        carrito = JSON.parse(localStorage.getItem('carrito'));

        actualizarCarrito();

    }

}

 

function buscarProductos() {

    const searchText = document.getElementById('search-input').value.toLowerCase();

    const productosFiltrados = productos.filter(prod => prod.nombre.toLowerCase().includes(searchText));

    renderizarProductos(productosFiltrados);

}

 

document.getElementById('vaciarBtn').addEventListener('click', () => {

    carrito = [];

    localStorage.removeItem('carrito');

    actualizarCarrito();

    document.getElementById('total').textContent = '$0';

});

 

document.getElementById('finalizarBtn').addEventListener('click', finalizarCompra);

 

function finalizarCompra() {

    if (carrito.length === 0) {

        Swal.fire({

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