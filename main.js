alert("**                   Bienvenido al simulador de crédito                   **");

// esta es la funcion que calcula el valor de la cuota, en relacion al monto que se pidio, con los meses pedidos y una tasa de interes del 1.3 //
function calcularCuota(monto, cuota, interes) {

    let resultado = (monto / cuota)* interes;
    let montoPagar = monto * interes;
        
    alert("El monto solicitado es de: $" + monto + " CLP." + " El valor se ha simulado en " + cuota + " cuotas de: $" + resultado.toFixed(1) +" CLP. El costo total del credito es de $" + montoPagar + " CLP.");
}

let monto;

do {
    monto = Number(prompt("Ingresar el monto a simular (monto mínimo de $100.000 CLP)."));
    if (Number.isNaN(monto) || monto < 100000) {
        alert("El monto ingresado no es correcto o es inferior a $100.000 CLP.");
    }
} while (Number.isNaN(monto) || monto < 100000);

let cuota;

do{

    cuota = Number(prompt("Ingresar el número de cuotas (3 a 12 cuotas)."));

    switch (cuota) {

        case 1:
        case 2:
            alert("La cantidad de cuotas ingresadas es menor a la requerida.");
            break;
            
        case 3:
        case 4:
        case 5:{
            let interes = 1.3;
            calcularCuota(monto, cuota, interes);
            break;
        }
                    
        case 6:
        case 7:
        case 8:{
            let interes = 1.25;
            calcularCuota(monto, cuota, interes)
            break;
        }
            
        case 9:
        case 10:
        case 11:{
            let interes = 1.2;
            calcularCuota(monto, cuota, interes)
            break;
        }
            
        case 12:{
            let interes = 1.15;
            calcularCuota(monto, cuota, interes)
            break;
        }
                
        default:
            alert("Ingresar un número valido de cuotas.")
    }

} while (cuota < 3 || cuota > 12);
confirm("Muchas gracias por confiar en nosotros.")