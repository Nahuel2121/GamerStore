document.addEventListener("DOMContentLoaded", () => {
  
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const carritoIcono = document.querySelector("a.carrito");

  const modal = document.getElementById("cart-modal");
  const closeBtn = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const toast = document.getElementById("toast");

  function actualizarContador() {
    if (carritoIcono) {
      carritoIcono.textContent = `🛒 ${carrito.length}`;
    }
  }

  actualizarContador();

  function mostrarNotificacion(mensaje) {
    toast.textContent = mensaje;
    toast.classList.remove("translate-y-24", "opacity-0");
    setTimeout(() => {
      toast.classList.add("translate-y-24", "opacity-0");
    }, 3000);
  }


  function agregarAlCarrito(e) {
    const boton = e.target;

    const card = boton.closest("article");

    const titulo = card.querySelector("h2, h3").innerText;
    const precioTexto = card.querySelector("p").innerText;
    const precio = parseFloat(precioTexto.replace("$", "")) || 0;

    const selectPlataforma = card.querySelector("select");
    const plataforma = selectPlataforma
      ? selectPlataforma.value.toUpperCase()
      : "PS5";

    const producto = {
      titulo: titulo,
      precio: precio,
      plataforma: plataforma,
    };

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    mostrarNotificacion(`¡${titulo} agregado!`);
  }

  function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    renderizarCarrito(); 
  }

  function renderizarCarrito() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="text-gray-500 text-center py-4">El carrito está vacío</p>';
    } else {
      carrito.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add(
          "flex", "justify-between", "items-center", "bg-white/5", "p-2", "rounded"
        );
        itemElement.innerHTML = `
                    <div class="flex flex-col">
                        <span class="font-medium text-sm">${item.titulo}</span>
                        <span class="text-xs text-gray-400">Plataforma: ${item.plataforma}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-bold text-emerald-400">$${item.precio}</span>
                        <button class="text-red-500 hover:text-red-400 font-bold text-xl leading-none btn-eliminar" data-index="${index}" title="Eliminar">&times;</button>
                    </div>
                `;
        cartItemsContainer.appendChild(itemElement);
        total += item.precio;
      });

      cartItemsContainer.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = parseInt(
            e.target.closest(".btn-eliminar").dataset.index
          );
          eliminarDelCarrito(index);
        });
      });
    }

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }

  function mostrarCarrito(e) {
    e.preventDefault();
    renderizarCarrito();
    modal.showModal();
  }

  const botones = document.querySelectorAll(".añadirAlCarrito");
  botones.forEach((btn) => btn.addEventListener("click", agregarAlCarrito));

  const selectoresPlataforma = document.querySelectorAll(".plataforma");
  selectoresPlataforma.forEach((select) => {
    select.addEventListener("change", (e) => {
      const plataforma = e.target.value; // ps5, xbox, pc
      const card = e.target.closest("article");
      const img = card.querySelector("img");

      if (img) {
        img.src = img.src.replace(/(ps5|xbox|pc)/gi, plataforma);
      }
    });
  });

  if (carritoIcono) {
    carritoIcono.addEventListener("click", mostrarCarrito);
  }

  closeBtn.addEventListener("click", () => modal.close());
});
