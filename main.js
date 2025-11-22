// aca van los datos de los juego y plataformas
const plataformas = ["PC", "PlayStation 5", "Xbox Series"];
const juegos = [

    { nombre: "Resident Evil Village", precio: 39.99 },
    { nombre: "Resident Evil Requiem", precio: 52.99 },
    { nombre: "FIFA 26", precio: 69.99 },
    { nombre: "Call of Duty: Black Ops 7", precio: 59.99 },
    { nombre: "Battlefield 6", precio: 69.99 },
    { nombre: "Hollow Knight: Silksong", precio: 6.99 },
];

function comprarJuego() {
    let nombre = prompt("Ingrese su nombre:");
    if (!nombre) {
        alert("No ingresaste un nombre. Saliendo del simulador.");
        return;
    }

    alert("Bienvenido " + nombre + " a la tienda GamerStore!");

    // seleccion de la plataforma
    let plataformasTexto = "";
    for (let i = 0; i < plataformas.length; i++) {
        plataformasTexto += `${i + 1}. ${plataformas[i]}\n`;
    }

    let opcionPlataforma = prompt(
        "Seleccione su plataforma:\n" + plataformasTexto
    );

    if (opcionPlataforma < 1 || opcionPlataforma > plataformas.length) {
        alert("Opción no válida. Saliendo...");
        return;
    }

    const plataformaElegida = plataformas[opcionPlataforma - 1];
    alert("Elegiste " + plataformaElegida);

    // un carrito para guardar las selecciones cuando finalice el proceso de compra
    const carrito = [];

    let seguirComprando = true;

    while (seguirComprando) {
        let textoJuegos = "Seleccione un juego:\n";
        for (let i = 0; i < juegos.length; i++) {
            textoJuegos += `${i + 1}. ${juegos[i].nombre} - $${juegos[i].precio}\n`;
        }

        let opcionJuego = prompt(textoJuegos);

        if (opcionJuego < 1 || opcionJuego > juegos.length) {
            alert("Opción no válida.");
        } else {
            const juegoSeleccionado = juegos[opcionJuego - 1];

            carrito.push(juegoSeleccionado);

            alert(
                `Agregaste: ${juegoSeleccionado.nombre}\n` +
                `Precio: $${juegoSeleccionado.precio} USD`
            );
        }

        // confirm para seguir comprando
        seguirComprando = confirm("¿Desea elegir otro juego?");
    }

    if (carrito.length === 0) {
        alert("No seleccionaste ningún juego. ¡Hasta la próxima!");
        return;
    }

    let resumen = "Resumen de compra:\n\n";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        resumen += `- ${carrito[i].nombre}: $${carrito[i].precio}\n`;
        total += carrito[i].precio;
    }

    resumen += `\nTOTAL: $${total.toFixed(2)} USD`;

    alert(resumen);
    alert("Gracias por su compra, " + nombre + "!");
}

comprarJuego();
