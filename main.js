// Demo operadores

let edad = 19;
let peronchos = false;

if (edad >= 18 || peronchos){
    console.log("Podes entrar pibe");
} else {
    console.log("Anda a tu casa pendejo");
}

// AND (&&) = se tienen que cumplir ambas condiciones para que el resultado sea true.
// OR (||) = se tiene que cumplir al menos una de las condiciones.

// ejemplo usando for
for (let i = 1; i < 6; i++){
    console.log('Numero: ' + i);
}


// ejemplo usando while
let a = 1;
while (a <= 5){
    console.log('Numero: ' + a);
    a++;
}

// ejemplo do while
let i = 1;
do{
    console.log('Numero: ' +i);
    i++;
} while (i < 6);