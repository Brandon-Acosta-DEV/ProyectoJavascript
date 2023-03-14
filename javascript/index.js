const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const botonVaciar = document.getElementById("vaciar-carrito");
//MODIFICAR LOS CONTADORES
const contadorCarrito = document.getElementById("contadorCarrito");
//CALCULAR EL TOTAL
const cantidad = document.getElementById("cantidad");
const precioTotal = document.getElementById("precioTotal");
const cantidadTotal = document.getElementById("cantidadTotal");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});
//OPCION DE VACIAR CARRITO
botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
  document.querySelector("carrito");
  swal({
    title: "¿Estas seguro?",
    text: "Se eliminarán todos los productos del carrito",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("¡Se eliminaron todos los productos del carrito!", {
        icon: "success",
      });
    } else {
      swal("¡Sus productos siguen en el carrito!", {
        icon: "error",
      });
    }
  });
});

//INYECTO EL HTML
stockProductos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
    <img class="img__pto" src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="descProducto">${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <a class="boton-enlace" href="${producto.wapp}" target="_blank">Agendar por Whatsapp</a> <i class="bi bi-whatsapp"></i>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `;
  contenedorProductos.appendChild(div);

  //LUEGO DE QUE INSERTEMOS EL HTML EN EL DOM:
  const boton = document.getElementById(`agregar${producto.id}`);
  //Por cada elemento de mi array, creo un div, lo cuelgo, le pongo un id particular, una vez colgado
  //le hago un get element by id (el de agregar) Obtengo el elemento y a dicho elemento le agregamos
  //el add event listener

  boton.addEventListener("click", () => {
    //esta funcion ejecuta el agregar el carrito con la id del producto
    agregarAlCarrito(producto.id);
    // Toastify({
    //   text: "Usted a agregado a su carrito `${producto.nombre}`",
    //   duration: 2000,
    //   offset: {
    //     x: 600,
    //     y: 30,
    //   },
    //   style: {
    //     background: "linear-gradient(to right, rgb(255, 121, 135), rgb(222, 76, 138))",
    //   },
    // }).showToast();
    swal({
      title: "¡Excelente!",
      text: `¡Agregaste a tu carrito ${producto.nombre}!`,
      icon: "success",
    });
  });
});

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {
  //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
  const existe = carrito.some((prod) => prod.id === prodId); //comprobar si el elemento ya existe en el carro

  if (existe) {
    //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
    const prod = carrito.map((prod) => {
      //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
      // map encuentre cual es el igual al que está agregado, le suma la cantidad
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
    const item = stockProductos.find((prod) => prod.id === prodId); //Trabajamos con las ID
    //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
    carrito.push(item);
  }
  //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
  //el carrito y se ve.
  actualizarCarrito();
};
//agregarAlCarrito(1) //Le pasamos el ID por parametro. Tenemos que asigarle como evento esta funcion al boton
//con el id de su producto correspondiente

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item); //Busca el elemento q yo le pase y nos devuelve su indice.

  carrito.splice(indice, 1); //Le pasamos el indice de mi elemento ITEM y borramos un elemento
  actualizarCarrito();
  document.querySelector("carrito");
};

const actualizarCarrito = () => {
  //LOS APPENDS SE VAN ACUMULANDO CON LO QE HABIA ANTES
  contenedorCarrito.innerHTML = ""; //Cada vez que yo llame a actualizarCarrito, lo primero q hago
  //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info actualizado

  //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
  contadorCarrito.innerText = carrito.length; // actualizamos con la longitud del carrito.
  document.querySelector("carrito");
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
  //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
  //empezando en 0.
};

// Configuración de la clave pública de Stripe
const publicKey = "pk_test_51MlavdGtoLJ1IUb7T5ro46Otdjuo10tXtv5JdHweaHHkeNisK40dKBQJZaONety5xD4TzmXc2QmHWgVxgkEihTmv003TzDKr7I";
const stripe = Stripe(publicKey);
// Crea un elemento de tarjeta de crédito
var elements = stripe.elements();
var cardElement = elements.create("card");

// Monta el elemento de la tarjeta de crédito en el DOM
cardElement.mount("#card-element");

// Manejador de evento para el botón de pago
document.querySelector("#payment-button").addEventListener("click", async () => {
  // Creación del token de pago con Stripe
  const { token, error } = await stripe.createToken("card", cardElement);
  if (error) {
    // Manejo del error
    console.error(error.message);
  } else {
    // Envío del token de pago al servidor
    const response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.id,
        amount: 1000, // Monto en centavos
      }),
    });

    const data = await response.json();

    console.log(data);
  }
});
