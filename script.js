
class Billete {
    constructor(denominacion, cantidad) {
        this.denominacion = denominacion;
        this.cantidad = cantidad;
        this.total = 0;
    }

    total_actual(){
        this.total = this.denominacion * this.cantidad;
        return this.total;
    }
}



class Cajero {

    constructor() {
        this.billetes = [];
        this.billetes[0] = new Billete(100, 0);
        this.billetes[1] = new Billete(50, 0);
        this.billetes[2] = new Billete(20, 0);
        this.billetes[3] = new Billete(10, 0);
        this.caja = 0;
        this.retiro = 0;
        this.sin_dinero = false;
        this.mensaje = "";
    }
    //Realiza ingresos de Dinero.
    ingresarDinero(bill100, bill50, bill20, bill10){

        this.billetes[0].cantidad = this.billetes[0].cantidad + bill100;
        this.billetes[1].cantidad = this.billetes[1].cantidad + bill50;
        this.billetes[2].cantidad = this.billetes[2].cantidad + bill20;
        this.billetes[3].cantidad = this.billetes[3].cantidad + bill10;
        this.actualizar_caja();
        this.mensaje = "<p>Se Ingresó : </p>" + bill100 + " billetes de 100, <br />" +
                                               bill50 + " billetes de 50,  <br /> " +
                                       bill20 + " billetes de 20,  <br />" +
                                       bill10 + " billetes de 10,  <br />" +
                       "<strong>Total en Caja : " + this.caja.toString() + "</strong>";


        return this.mensaje;
    }
    //actualiza lo que hay en caja.
    actualizar_caja(){

        this.caja = this.billetes[0].total_actual() +
                    this.billetes[1].total_actual() +
                    this.billetes[2].total_actual() +
                    this.billetes[3].total_actual();
    }
    //Realiza el procedimiento de retiro de Dinero.
    retiro_dinero(cantidad){

        this.retiro = cantidad;
        this.billetes_retirados = [];
        var i = 0;

        //Comprobamos que haya dinero en caja;
        this.comprobar_caja();

        if (this.sin_dinero == true) {
            this.mensaje = "Dinero Isuficiente el cajero dispone de : " + this.caja.toString();
            return this.mensaje; //retorna el mensaje y ya no sigue con la aplicacion
        }
        else{

            this.mensaje = "Se retiraron : ";

            while (this.retiro > 0) {
                //comprobar si el monto ingresado es correcto.
                if (this.retiro % this.billetes[3].denominacion != 0) {

                    this.mensaje = "El valor Ingresado no es Correcto!"
                    return this.mensaje;//retorna el mensaje y ya no sigue con la aplicacion
                }
                else{

                    //Se actualiza la cantidad de billetes en el cajero y el total en caja
                    this.actualizar_caja();
                    this.billetes_retirados[i] = 0;
                    //Obtiene la cantidad de billetes a retirar
                    if (this.billetes[i].cantidad > 0) {
                        this.billetes_retirados[i] = Math.floor(this.retiro / this.billetes[i].denominacion);
                        this.retiro = this.retiro % this.billetes[i].denominacion;
                        this.billetes[i].cantidad = this.billetes[i].cantidad - this.billetes_retirados[i];
                    }
                    else if (this.billetes[3].cantidad == 0) {
                        this.mensaje = "No puedo entregarte esa Cantidad solo tengo : <br />";
                        for (var k in this.billetes) {
                            this.mensaje += this.billetes[k].cantidad.toString() + " billetes de " +
                                            this.billetes[k].denominacion.toString() + "<br />";
                        }

                            this.mensaje += this.comprobar_caja();
                        return this.mensaje;
                    }

                    i = i + 1;//pasa a la siguiente denominacion
                }

            }

            //Retorna array con billetes retirados.
            for(i in this.billetes_retirados){
                if (this.billetes_retirados[i] == 0) {  //No muestra los billete que son 0
                    continue;
                }
                this.mensaje += this.billetes_retirados[i].toString() + " de " + this.billetes[i].denominacion.toString() + " , ";
            }

            return this.mensaje;
        }

    }


    //Comprueba si hay dinero en Caja
    comprobar_caja(){

        this.actualizar_caja();
        if (this.retiro > this.caja) {
            this.sin_dinero = true;
        }
        else {
            this.sin_dinero = false;
        }

        return this.mensaje = "Actualmente hay en el Cajero : " + this.caja.toString();
    }

}

var operacion = new Cajero();

document.getElementById("retirar").addEventListener("click", retirar_dinero);

function retirar_dinero(evento) {

    var cantidad = parseInt(document.getElementById("retiro").value);
    var mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = operacion.retiro_dinero(cantidad);
}

document.getElementById("ingresar").addEventListener("click", ingresar_dinero);

function ingresar_dinero(evento) {

    var cantidad = [];
    cantidad[0] = parseInt(document.getElementById("cantidad_100").value);
    cantidad[1] = parseInt(document.getElementById("cantidad_50").value);
    cantidad[2] = parseInt(document.getElementById("cantidad_20").value);
    cantidad[3] = parseInt(document.getElementById("cantidad_10").value);

    for (i in cantidad) {
        if (isNaN(cantidad[i])) {
            cantidad[i] = 0;
        }
        console.log(cantidad[i]);
    }

    var mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = operacion.ingresarDinero(cantidad[0], cantidad[1], cantidad[2], cantidad[3]);
}
