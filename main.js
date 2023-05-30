const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Productos
const productos = [
  {id: 1, nombre: "Videojuego", precio: 15000, img: "https://i.postimg.cc/3x94ZdfY/videojuego.png", cantidad: 1},
  {id: 2, nombre: "Mando", precio: 40000, img: "https://i.postimg.cc/fTn9W40n/mando.png", cantidad: 1},
  {id: 3, nombre: "Funko pop", precio: 10000, img: "https://i.postimg.cc/BbDP5pkV/funko.png", cantidad: 1},
  {id: 4, nombre: "Mouse", precio: 20000, img: "https://i.postimg.cc/pXfnp0D9/mouse.png", cantidad: 1},
  {id: 5, nombre: "Teclado", precio: 15000, img: "https://i.postimg.cc/NjQ2T14d/teclado.png", cantidad: 1},
];


productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">Precio: $${product.precio.toLocaleString('es-CL')}</p>
  `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "Agregar al Carro";
  comprar.className = "Agregar al Carro";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    }
  });
});

const mostrarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Carro</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("div");
  modalbutton.innerHTML = '<div class="cerrar"><i class="fa-solid fa-rectangle-xmark fa-2xl"></i></div>';
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>$${product.precio.toLocaleString('es-CL')}</p>
        <span class="restar"><i class="fa-solid fa-minus"></i></span>
        <p>${product.cantidad}</p>
        <span class="sumar"><i class="fa-solid fa-plus"></i></span>
        <p>Total: $${product.precio.toLocaleString('es-CL')}</p>
        <span class="delete-product"><i class="fa-solid fa-trash"></i></span>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      mostrarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      mostrarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total: $${total.toLocaleString('es-CL')}`;
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", mostrarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);
  console.log(foundId);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  saveLocal();
  mostrarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";
  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
